const { MongoClient } = require('mongodb');

let db = null;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log('Connected to MongoDB Atlas');

  db = client.db('budgettracker');
  return db;
}

module.exports = connectDB;
