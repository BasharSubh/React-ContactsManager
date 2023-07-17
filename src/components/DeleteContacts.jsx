import React, { useState } from 'react';
import { ApiDeleteContact } from '../Api';

function DeleteContacts({ contactId, setReload }) {
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setError('')
    try {
      await ApiDeleteContact(contactId)
      setReload((prev) => !prev);
    } catch (error) {
      setError(error.response.data.message ?? error);

    }

  };

  return (
  <div>
    <button className="delete-button" onClick={handleDelete}>Delete</button>
    {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
  </div>

  );
}

export default DeleteContacts;
