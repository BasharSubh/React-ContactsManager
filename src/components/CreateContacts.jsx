import React, { useState } from 'react';
import { ApiCreateContact } from '../Api';

function CreateContacts(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState();

  const handleCreateContact = async () => {
    setError('')
    try {
      await ApiCreateContact(name, email, phone)
      props.setReload((prev) => !prev); 
        props.setShowAddcontacts(false)
    } catch (error) {
      setError(error.response.data.message ?? error);

    }

  };

  return (
    <div className="create-contact-container">
    <h1 className="create-contact-title">Create Contact</h1>
    {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
    <div className="create-contact-input">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    </div>
    <div className="create-contact-input">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div className="create-contact-input">
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
    </div>
    <button className="create-contact-button" onClick={handleCreateContact}>Create</button>
    </div>
  );
}

export default CreateContacts;
