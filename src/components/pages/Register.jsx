import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRegister } from '../../Api';

function RegisterComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    let pass;
    if (password === repeatPassword) {
        pass = password
    }
    else {
    setError('Passwords do not match');
    return; 
  }
    
    try {
      await ApiRegister(username, email, pass);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message ?? error);

    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
      <form className="register-form" onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
         <div>
          <label>Repeat Password:</label>
          <input className="register-input" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
        </div>
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterComponent;
