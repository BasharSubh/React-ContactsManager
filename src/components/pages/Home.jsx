import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Contact Management System!</h1>
        <p className="home-description">Manage your contacts with ease.</p>
        <p className="home-features">
          This app is the React version of the previous Node.js project. You can find the project Server on GitHub: <a href="https://github.com/BasharSubh/NodeJs-API-ContactsManager">GitHub Repository</a>
        </p>
        <p className="home-features">With my Contact Management System, you can:</p>
        <ul className="home-feature-list">
          <li>Create and manage your contact list</li>
          <li>View contact details and update information</li>
          <li>Delete unwanted contacts</li>
          <li>Organize contacts with ease</li>
          <li>Securely store and access your contacts</li>
          <li>
            Demo information:
            <br />- Email: demo@example.com
            <br />- Password: 1234
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
