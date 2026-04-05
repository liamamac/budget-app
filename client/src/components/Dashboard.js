import { useState, useEffect } from 'react';
import API_URL from '../config';

function Dashboard({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions/${userId}`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: parseFloat(amount), category, type, description })
      });
      const data = await res.json();
      setMessage(data.message);
      fetchTransactions();
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/transactions/${id}`, { method: 'DELETE' });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Add Transaction</h2>
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      {message && <p>{message}</p>}

      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map(t => (
          <div key={t._id}>
            <span>{t.type} — {t.category} — ${t.amount} — {t.description}</span>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;