const { PlaidApi, PlaidEnvironments, Configuration } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

class PlaidService {
    static async createLinkToken(userId) {
        const response = await plaidClient.linkTokenCreate({
            user: { client_user_id: userId },
            client_name: 'Budgeteer',
            products: ['transactions'],
            country_codes: ['US', 'CA'],
            language: 'en',
        });
        return response.data.link_token;
    }

    static async exchangePublicToken(publicToken) {
        const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
    });
    return response.data.access_token;
    }

    static async fetchTransactions(accessToken) {
        const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: '2024-01-01',
        end_date: new Date().toISOString().split('T')[0],
    });
    return response.data.transactions;
    }
}
module.exports = PlaidService;