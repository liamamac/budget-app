const Transaction = require('./Transaction');

class IncomeTransaction extends Transaction {
    constructor(userId, amount, date, category, description) {
        super(userId, amount, date, category, 'income', description);
    } 

    applyIncomeRules() {

    }
}

module.exports = IncomeTransaction;