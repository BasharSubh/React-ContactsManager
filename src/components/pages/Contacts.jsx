import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate, useLocation , useNavigate } from 'react-router-dom';
import CreateContacts from '../CreateContacts';
import { IoPersonSharp } from "react-icons/io5"
import { ApiGetContacts } from '../../Api';


function Contacts() {
  const [reload, setReload] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState();
  const [showAddcontacts, setShowAddcontacts] = useState(false)
  const [hasCheckedContacts, setHasCheckedContacts] = useState(false);

  const [sortOption, setSortOption] = useState(""); 
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");


  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setError('');
    const fetchData = async () => {
      try {
        const res = await ApiGetContacts()
        setContacts(res.data);
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login', { 
            state: {
              message: "Please log in first.",
              prevLocation: location.pathname
            },
            replace: true
          });
        }
        
        setError(error.response.data.message ?? error);
      } finally {
        setTimeout(() => {
          setHasCheckedContacts(true);
        }, 1000);
      }
    }

    fetchData()

  }, [reload]);


  let filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()));

  let sortedContacts = [...filteredContacts];
  if (sortOption === "name") {
    sortedContacts.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } else if (sortOption === "date") {
    sortedContacts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  if (sortDirection === "desc") {
    sortedContacts.reverse();
  }

    // // Group contacts by letters
    // const groupedContacts = {};
    // sortedContacts.forEach((contact) => {
    //   const firstLetter = contact.name.charAt(0).toUpperCase();
    //   if (!groupedContacts[firstLetter]) {
    //     groupedContacts[firstLetter] = [];
    //   }
    //   groupedContacts[firstLetter].push(contact);
    // });

  return (
    <div className="contacts-container">
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name" />

      <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort By</option>
        <option value="name">Name (A-Z)</option>
        <option value="date">Date</option>
      </select>

      <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <h1 className="contacts-title">Contacts</h1>
      {error && (
          <div style={{ backgroundColor: '#f8d7da', border: '1px solid #dc3545', padding: '10px', marginBottom: '10px' }}>
            <p style={{fontWeight: 'bold', color: '#dc3545' }}>{error}</p>
          </div>
        )}

      {hasCheckedContacts && sortedContacts.length === 0 ? <p>No contact found</p> : null}
      
      {sortedContacts.map((contact) => (
        <div key={contact._id}>
          {contact.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
            <Link className="contact-link" to={`/contacts/${contact._id}`}>
              <div className="contact-card" >
                <h3 className="contact-name">{contact.name}</h3>
                <IoPersonSharp />
              </div>
            </Link>
          )}
        </div>
      ))}

      {!showAddcontacts && <button className="add-contacts-button" onClick={() => setShowAddcontacts(true)}>Add Contacts</button>}
      {showAddcontacts && <CreateContacts setReload={setReload} setShowAddcontacts={setShowAddcontacts} />}
    </div>
  );
}

export default Contacts;
