import express from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
const PRODUCTS_CSV = path.resolve('../walmart-products.csv');

let products = [];

// Load products from CSV on startup
function loadProducts() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(PRODUCTS_CSV)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        products = results;
        resolve();
      })
      .on('error', reject);
  });
}

// Helper: normalize string for search
function normalize(str) {
  return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

// Search endpoint
app.get('/search', (req, res) => {
  const q = normalize(req.query.q || '');
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  let filtered = products;
  if (q) {
    filtered = products.filter(p =>
      normalize(p.product_name).includes(q) ||
      normalize(p.description).includes(q) ||
      normalize(p.brand).includes(q) ||
      normalize(p.category_name).includes(q) ||
      normalize(p.breadcrumbs).includes(q)
    );
  }
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const results = filtered.slice(start, end);
  res.json({
    total,
    page,
    limit,
    results
  });
});

// Product details endpoint
app.get('/product/:id', (req, res) => {
  const id = req.params.id;
  const product = products.find(
    p => String(p.product_id) === String(id) || String(p.sku) === String(id)
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start server after loading products
loadProducts().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to load products:', err);
  process.exit(1);
}); 