const Transaction = require('./Transactions');
// Extends Transaction - represents an expense entry
// TransactionFactory instantiates this when type is 'expense'
class ExpenseTransaction extends Transaction {
    constructor(userId, amount, date, category, description) {
        super(userId, amount, date, category, 'expense', description);
    } 

    applyExpenseRules() {
        
    }
}

module.exports = ExpenseTransaction;