const { MongoClient } = require('mongodb');
// Singleton pattern - maintains a single MongoDB connection throughout the app lifecycle
// if db already exists, return the existing connection instead of creating a new one
let db = null;

async function connectDB() {
  if (db) return db; // Singleton check - prevents multiple connections

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB Atlas');

  db = client.db('budgettracker');
  return db;
}

module.exports = connectDB;
