import React, { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import loadingImg from "../../assets/loading-gif-png-5.gif"

import { ApiLogin } from '../../Api';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)


  const location = useLocation()

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await ApiLogin(email, password);
      navigate('/contacts', { replace: true });
    } catch (error) {
      setError(error.response.data.message ?? error);

    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="login-container">
      <h1 className="login-title">Login</h1>
      {!loading && !error && location.state?.message &&
        <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '5px', marginBottom: '10px' }}>
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{location.state.message}</p>
        </div>}
      {loading && <img src={loadingImg} alt="" width={40} /> }
      {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="login-button" type="submit">Login</button>
        </form>
      </div>

  );
}

export default Login;
