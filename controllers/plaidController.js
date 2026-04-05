const PlaidService = require('../services/PlaidService');
const TransactionFactory = require('../factories/TransactionFactory');

async function getLinkToken(req, res) {
    try{
        const { userId } = req.params;
        const linkToken = await PlaidService.createLinkToken(userId);
        res.status(200).json({link_token: linkToken});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function importTransactions(req, res) {    
    try {
        const { publicToken, userId } = req.body;

        const accessToken = await PlaidService.exchangePublicToken(publicToken);
        const plaidTransactions = await PlaidService.fetchTransactions(accessToken);

        for (const t of plaidTransactions) {
            const type = t.amount < 0 ? 'income' : 'expense';
            const transaction = TransactionFactory.create(
                type,
                userId,
                Math.abs(t.amount),
                t.date,
                t.category?.[0] || 'Uncategorized',
                t.name
            );
            await transaction.save();
        }

        res.status(200).json({message: `${plaidTransactions.length} transaction imported`});
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {getLinkToken, importTransactions};


