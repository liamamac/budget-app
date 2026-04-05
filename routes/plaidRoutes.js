const express = require('express');
const router = express.Router();
const { getLinkToken, importTransactions } = require('../controllers/plaidController');

router.get('/link-token/:userId', getLinkToken);
router.post('/import', importTransactions);

module.exports = router;