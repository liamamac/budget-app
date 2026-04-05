const IncomeTransaction = require('../models/IncomeTransaction');
const ExpenseTransaction = require('../models/ExpenseTransaction');

class TransactionFactory {
  static create(type, userId, amount, date, category, description) {
    if (type === 'income') {
      return new IncomeTransaction(userId, amount, date, category, description);
    } else if (type === 'expense') {
      return new ExpenseTransaction(userId, amount, date, category, description);
    } else {
      throw new Error(`Invalid transaction type: ${type}`);
    }
  }
}

module.exports = TransactionFactory;