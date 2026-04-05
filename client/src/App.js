import { useEffect, useState } from 'react';
import API_URL from './config';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Budget Tracker</h1>
    </div>
  );
}

export default App;