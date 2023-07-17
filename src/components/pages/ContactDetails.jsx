import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UpdateContact from '../UpdateContacts';

import { ApiGetContact, ApiDeleteContact } from '../../Api';

import { AuthContext } from '../../Utils';
import { useContext } from 'react';

function ContactDetails() {

  const {logOut} = useContext(AuthContext)

  const { id } = useParams();
  const navigate = useNavigate()
  const [contact, setContact] = useState(null);
  const [error, setError] = useState();
  const [reload, setReload] = useState(true);
  const[showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    setError('')

    const fetchData = async () => {
      try {
        const res = await ApiGetContact(id);
        setContact(res.data.contact);
      } catch (error) {
        setError(error.response.data.message ?? error);

      }
    };

    fetchData();


  }, [id, reload]);

  const handleDelete = async (contactId) => {
    try {
      await ApiDeleteContact(contactId)
      setError('')
      navigate("/contacts")
    } catch (error) {
      setError(error.response.data.message ?? error);

    }
    };

  const handleUpdate = () => {
    setShowUpdate(true)
  };
  
  if (!localStorage.getItem('accessToken')) {
    logOut
    return (
      <div className="centered-message">
        <h2 className="message-heading">You must log in first.</h2>
      </div>
    );
        }
  
  return (
    <div className="contact-details-container">
    <h1 className="contact-details-title">Contact Details</h1>
    <div className="contact-details-back">
        <Link
          to=".."
          relative='path'
        >Back 🔙
        </Link>
    </div>
    {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}
    {contact && (
        <div className="contact-details-card">
        <div className="avatar">{contact.name.split(" ").map(name => name[0]).join("")}</div>
        <h3 className="contact-details-name">{contact.name}</h3>
        <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>Created at: {new Date(contact.createdAt).toLocaleString()}</p>
          <p>Updated at: {new Date(contact.updatedAt).toLocaleString()}</p>

          <hr />
          <button className="contact-button" onClick={() => handleDelete(contact._id)}>Delete</button>

        {!showUpdate && <button className="contact-details-button" onClick={() => handleUpdate(contact._id)}>Update</button>}
        </div>
    )}
    {contact && showUpdate && (
        <UpdateContact
        contactId={contact._id}
        setReload={setReload}
        name={contact.name}
        email={contact.email}
        phone={contact.phone}
        setShowUpdate={setShowUpdate}
        />
    )}
    </div>

  );
}

export default ContactDetails;
