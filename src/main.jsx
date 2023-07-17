import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import Utils from './Utils';

// Set the base URL for API requests
axios.defaults.baseURL = 'https://nodejs-api-contactsmaneger-server.onrender.com/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Utils>
        <App />
      </Utils>
    </Router>
  </React.StrictMode>,
)
