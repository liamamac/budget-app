const connectDB = require("../config/db");
const { ObjectId } = require('mongodb');

class Transaction {
    constructor(userId, amount, date, category, type, description) {
        this.userId = new ObjectId(userId);
        this.amount = amount;
        this.date = date ? new Date(date) : new Date();
        this.category = category;
        this.type = type;
        this.description = description;
        this.createdAt = new Date();
    }

    validate() {
        if (!this.amount || this.amount <= 0) throw new Error('Amount must be greater than 0');
        if (!this.category) throw new Error('Category is required');
        if (!this.type) throw new Error('Type is required');
    }

    calculate() {
        return this.type === 'income' ? this.amount : -this.amount;
    }

    async save() {
        const db = await connectDB();
        return db.collection('transactions').insertOne({ ...this });
    }

    static async findByUser(userId) {
        const db = await connectDB();
        return db.collection('transactions').find({ userId: new ObjectId(userId) }).toArray();
    }

    static async findById(id) {
        const db = await connectDB();
        return db.collection('transactions').findOne({ _id: new ObjectId(id) });
    }

    static async update(id, updates) {
        const db = await connectDB();
        return db.collection('transactions').updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );
    }

    static async delete(id) {
        const db = await connectDB();
        return db.collection('transactions').deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = Transaction;