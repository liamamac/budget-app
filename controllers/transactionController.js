const Transaction = require('../models/Transactions');
const TransactionFactory = require('../factories/TransactionFactory');

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

module.exports = { 
    createTransaction, 
    getTransactions, 
    deleteTransaction, 
    updateTransaction 
};