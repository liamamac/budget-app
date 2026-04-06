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
// Retries fetching transactions until Plaid sandbox has them ready
static async fetchTransactions(accessToken, retries = 5, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: '2020-01-01',
        end_date: new Date().toISOString().split('T')[0],
      });
      return response.data.transactions;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
}
module.exports = PlaidService;