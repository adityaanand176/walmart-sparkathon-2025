import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
let collection;

// Helper: normalize string for search
function normalize(str) {
  return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

// Search endpoint
app.get('/search', async (req, res) => {
  const q = normalize(req.query.q || '');
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = q
    ? {
        $or: [
          { product_name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { brand: { $regex: q, $options: 'i' } },
          { category_name: { $regex: q, $options: 'i' } },
          { breadcrumbs: { $regex: q, $options: 'i' } }
        ]
      }
    : {};

  try {
    const total = await collection.countDocuments(query);
    const results = await collection.find(query).skip(skip).limit(limit).toArray();
    res.json({ total, page, limit, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

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