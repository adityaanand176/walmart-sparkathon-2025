import fs from 'fs';
import csv from 'csvtojson';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

// Fix __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the CSV file (one level above backend/)
const csvFilePath = path.join(__dirname, '../walmart-products.csv');

async function run() {
  try {
    await client.connect();
    const db = client.db("walmart");
    const collection = db.collection("products");

    const jsonArray = await csv().fromFile(csvFilePath);

    await collection.deleteMany({});
    const result = await collection.insertMany(jsonArray);

    console.log(`✅ Inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

run();