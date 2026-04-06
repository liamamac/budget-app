const Transaction = require('./Transactions');

// Extends Transaction - represents an income entry
// TransactionFactory instantiates this when type is 'income
class IncomeTransaction extends Transaction {
    constructor(userId, amount, date, category, description) {
        super(userId, amount, date, category, 'income', description);
    } 

    applyIncomeRules() {

    }
}

module.exports = IncomeTransaction;