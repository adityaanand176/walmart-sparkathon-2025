import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;
const QUERY_URL = process.env.QUERY_URL;

const client = new MongoClient(MONGO_URL);
let collection;

// Helper: normalize string for search
function normalize(str) {
  return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

// // Search endpoint
// app.get('/search', async (req, res) => {
//   const q = normalize(req.query.q || '');
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 20;
//   const skip = (page - 1) * limit;

//   const query = q
//     ? {
//         $or: [
//           { product_name: { $regex: q, $options: 'i' } },
//           { description: { $regex: q, $options: 'i' } },
//           { brand: { $regex: q, $options: 'i' } },
//           { category_name: { $regex: q, $options: 'i' } },
//           { breadcrumbs: { $regex: q, $options: 'i' } }
//         ]
//       }
//     : {};

//   try {
//     const total = await collection.countDocuments(query);
//     const results = await collection.find(query).skip(skip).limit(limit).toArray();
//     res.json({ total, page, limit, results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query failed' });
//   }
// });

// Product details endpoint
app.get('/product/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await collection.findOne({
      $or: [
        { product_id: id },
        { sku: id }
      ]
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Proxy endpoint for getting product ids
app.post('/api/embed', express.json(), async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    // 1. Get ALL relevant product IDs from the embedding service
    const response = await axios.post(`${QUERY_URL}/embed-text`, { query });
    const allProductIds = response.data.products;

    if (!allProductIds || allProductIds.length === 0) {
      return res.json({
        total: 0,
        page,
        limit,
        results: []
      });
    }

    const total = allProductIds.length;

    // 2. Apply pagination to the array of IDs BEFORE hitting the database

    // 3. Fetch only the documents for the current page in a SINGLE database query
    // This uses the $in operator to find all documents where product_id or sku is in our paginated list.
    const results = await collection.find({
      $or: [
        { product_id: { $in: allProductIds } },
        { sku: { $in: allProductIds } }
      ]
    }).toArray();
    
    // (Optional but Recommended) 4. Preserve the order from the embedding service.
    // The `$in` operator does not guarantee order. We re-sort the results to match the ML service's ranking.
    const resultsById = new Map(results.map(doc => [doc.product_id || doc.sku, doc]));
    const orderedResults = allProductIds.map(id => resultsById.get(id)).filter(Boolean);

    res.json({
      total,
      results: orderedResults // Send the correctly ordered results
    });

  } catch (err) {
    // Check if the error is from Axios or our own logic
    if (err.response) {
      console.error("Error from FastAPI service:", err.response.data);
      res.status(err.response.status || 500).json({ error: "Failed to get embeddings from service" });
    } else {
      console.error("Error processing request:", err.message);
      res.status(500).json({ error: "Failed to process query" });
    }
  }
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await client.connect();
    const db = client.db("walmart");
    collection = db.collection("products");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();