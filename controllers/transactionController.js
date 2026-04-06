const Transaction = require('../models/Transactions');
const TransactionFactory = require('../factories/TransactionFactory');
const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');

async function createTransaction(req, res) {
    try {
        const { userId, amount, date, category, type, description } = req.body;

        const transaction = TransactionFactory.create(type, userId, amount, date, category, description);
        transaction.validate();
        await transaction.save();

        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getTransactions(req, res) {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.findByUser(userId);
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        await Transaction.delete(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateTransaction(req, res) {
    try {
        const { id } = req.params;
        await Transaction.update(id, req.body);
        res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSummary(req, res) {
    try {
        const { userId } = req.params;
        const { startDate, endDate } = req.query;

        const db = await connectDB();
        const transactions = await db.collection('transactions').find({
        userId: new ObjectId(userId),
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
        }).toArray();

        const summary = transactions.reduce((acc, t) => {
        if (t.type === 'income') {
            acc.totalIncome += t.amount;
        } else {
            acc.totalExpenses += t.amount;
        }
        return acc;
        }, { totalIncome: 0, totalExpenses: 0 });

        summary.net = summary.totalIncome - summary.totalExpenses;
        summary.byCategory = transactions.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
        }, {});

        res.status(200).json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { 
    createTransaction, 
    getTransactions, 
    deleteTransaction, 
    updateTransaction,
    getSummary
};