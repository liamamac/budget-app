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
        console.log('import body:', req.body);
        const { publicToken, userId } = req.body;

        const accessToken = await PlaidService.exchangePublicToken(publicToken);
        console.log('access token:', accessToken);
        const plaidTransactions = await PlaidService.fetchTransactions(accessToken);
        console.log('transactions:', plaidTransactions.length);
        
        for (const t of plaidTransactions) {
            const type = t.amount < 0 ? 'income' : 'expense';
            const transaction = TransactionFactory.create(
                type,
                userId,
                Math.abs(t.amount),
                t.date,
                t.personal_finance_category?.primary || 'Uncategorized',
                t.merchant_name || t.name
            );
            await transaction.save();
        }

        res.status(200).json({message: `${plaidTransactions.length} transaction imported`});
    } catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {getLinkToken, importTransactions};


