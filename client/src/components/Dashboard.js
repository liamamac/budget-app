import { useState, useEffect } from 'react';
import API_URL from '../config';

function Dashboard({ userId }) {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const [goals, setGoals] = useState([]);
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [progressAmount, setProgressAmount] = useState('');
  const [goalMessage, setGoalMessage] = useState('');

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/transactions/${userId}`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${API_URL}/api/goals/${userId}`);
      const data = await res.json();
      setGoals(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchGoals();
  }, []);

  const handleAddTransaction = async () => {
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

  const handleDeleteTransaction = async (id) => {
    try {
      await fetch(`${API_URL}/api/transactions/${id}`, { method: 'DELETE' });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGoal = async () => {
    try {
      const res = await fetch(`${API_URL}/api/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, targetAmount: parseFloat(targetAmount), deadline })
      });
      const data = await res.json();
      setGoalMessage(data.message);
      fetchGoals();
    } catch (err) {
      setGoalMessage('Something went wrong');
    }
  };

  const handleUpdateProgress = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/goals/${id}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(progressAmount) })
      });
      const data = await res.json();
      setGoalMessage(`${data.message} — status: ${data.status}`);
      fetchGoals();
    } catch (err) {
      setGoalMessage('Something went wrong');
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await fetch(`${API_URL}/api/goals/${id}`, { method: 'DELETE' });
      fetchGoals();
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
      <button onClick={handleAddTransaction}>Add</button>
      {message && <p>{message}</p>}

      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map(t => (
          <div key={t._id}>
            <span>{t.type} — {t.category} — ${t.amount} — {t.description}</span>
            <button onClick={() => handleDeleteTransaction(t._id)}>Delete</button>
          </div>
        ))
      )}

      <h2>Add Goal</h2>
      <input placeholder="Target Amount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} />
      <input placeholder="Deadline" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <button onClick={handleAddGoal}>Add Goal</button>
      {goalMessage && <p>{goalMessage}</p>}

      <h2>Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet</p>
      ) : (
        goals.map(g => (
          <div key={g._id}>
            <span>Target: ${g.targetAmount} — Current: ${g.currentAmount} — Status: {g.status} — Deadline: {new Date(g.deadline).toLocaleDateString()}</span>
            <input placeholder="Add progress" value={progressAmount} onChange={e => setProgressAmount(e.target.value)} />
            <button onClick={() => handleUpdateProgress(g._id)}>Update Progress</button>
            <button onClick={() => handleDeleteGoal(g._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;