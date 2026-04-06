const express = require('express');
const router = express.Router();
const { 
    createTransaction, 
    getTransactions, 
    deleteTransaction, 
    updateTransaction,
    getSummary
} = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/:userId', getTransactions);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);
router.get('/:userId/summary', getSummary);

module.exports = router;