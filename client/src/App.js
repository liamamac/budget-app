import { useEffect, useState } from 'react';
import API_URL from './config';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const endpoint = isLogin ? 'api/auth/login' : 'api/auth/register';
    const body = isLogin ? {email, password} : {name, email, password};

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div>
      <h1>Budgeteer</h1>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      {!isLogin && (
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
        {isLogin ? 'No account? Register' : 'Have an account? Login'}
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;