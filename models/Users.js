const connectDB = require("../config/db");
const { ObjectId } = require('mongodb');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date()
    }

async save() {
    const db = await connectDB();
    return db.collection('users').insertOne({ ...this });
  }

  static async findByEmail(email) {
    const db = await connectDB();
    return db.collection('users').findOne({ email });
  }

  static async findById(id) {
    const db = await connectDB();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  }
}

module.exports = User;