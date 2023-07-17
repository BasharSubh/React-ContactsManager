import React, { useState } from 'react';
import { ApiUpdateContact } from '../Api';

function UpdateContact(props) {
  const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [error, setError] = useState();

  const handleUpdate = async () => {
    setError('');
    try {
      await ApiUpdateContact(props.contactId, name, email, phone)
      props.setReload(prevReload => !prevReload);
      props.setShowUpdate(prev => !prev);
    } catch (error) {
      setError(error.response.data.message ?? error);

    }


  };

  return (
    <div className="update-contact-container">
    <h2 className="update-contact-title">Update Contact</h2>
    {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
    <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="update-contact-input"
    />
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="update-contact-input"
    />
    <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="update-contact-input"
    />
    <button className="update-contact-button" onClick={handleUpdate}>Update</button>
    </div>

  );
}

export default UpdateContact;
