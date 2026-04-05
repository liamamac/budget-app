const express = require('express');
const router = express.Router();
const { 
    createTransaction, 
    getTransactions, 
    deleteTransaction, 
    updateTransaction 
} = require('../controllers/transactionController');

router.post('/', createTransaction);
router.get('/:userId', getTransactions);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);

module.exports = router;