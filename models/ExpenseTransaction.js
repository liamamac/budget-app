const Transaction = require('./Transactions');

class ExpenseTransaction extends Transaction {
    constructor(userId, amount, date, category, description) {
        super(userId, amount, date, category, 'expense', description);
    } 

    applyExpenseRules() {
        
    }
}

module.exports = ExpenseTransaction;