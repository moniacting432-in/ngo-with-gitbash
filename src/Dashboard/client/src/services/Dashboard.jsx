import React, { useState, useEffect } from 'react';
import { FaRegUser, FaUserAlt, FaUsers } from 'react-icons/fa'; // Icons
import '../css/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLogin, setSelectedLogin] = useState(null);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPassword, setDonorPassword] = useState('');
  const [donorLoggedIn, setDonorLoggedIn] = useState(false);
  const [donorFoodSelection, setDonorFoodSelection] = useState({ foodType: '', quantity: 0 });
  const [donorsList, setDonorsList] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [showDonorDetails, setShowDonorDetails] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [editFoodType, setEditFoodType] = useState('');
  const [editQuantity, setEditQuantity] = useState(0);
  const [donorMoneyDonation, setDonorMoneyDonation] = useState(0);
  const [editMoneyDonation, setEditMoneyDonation] = useState(0);

const API_URL = import.meta.env.VITE_API_URL;


  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAdminLoggedIn(true);
    alert('Admin logged in successfully!');
  };

  const handleDonorLogin = (e) => {
    e.preventDefault();
    if (donorEmail && donorPassword) {
      setDonorLoggedIn(true);
      alert('Donor logged in successfully!');
    } else {
      alert('Please provide email and password.');
    }
  };

  const handleFoodChange = (e) => {
    const { name, value } = e.target;
    setDonorFoodSelection({ ...donorFoodSelection, [name]: value });
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();

    if (donorFoodSelection.quantity <= 0 && donorMoneyDonation <= 0) {
      alert('Please donate either food or money.');
      return;
    }

    const donor = {
      name: donorName,
      email: donorEmail,
      foodType: donorFoodSelection.foodType,
      quantity: parseInt(donorFoodSelection.quantity),
      moneyDonation: parseInt(donorMoneyDonation),
    };

    try {
      const response = await axios.post(API_URL, donor, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 201) {
        alert(`Thank you ${donorName} for your donation!`);
        setDonorFoodSelection({ foodType: '', quantity: 0 });
        setDonorMoneyDonation(0);
        setDonorLoggedIn(false);
        setDonorName('');
        setDonorEmail('');
        setDonorPassword('');
        fetchDonors();
      }
    } catch (error) {
      console.error('Error submitting donation:', error.response?.data || error.message);
      alert('Failed to submit donation. Please try again.');
    }
  };

  const fetchDonors = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.status === 200) {
        setDonorsList(response.data);
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleEditClick = (donor) => {
    setEditingDonor(donor._id);
    setEditFoodType(donor.foodType);
    setEditQuantity(donor.quantity);
    setEditMoneyDonation(donor.moneyDonation || 0);
  };

  const handleSaveEdit = async (id) => {
    const updatedDonor = {
      foodType: editFoodType,
      quantity: Number(editQuantity),
      moneyDonation: Number(editMoneyDonation),
    };

    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedDonor);
      if (response.status === 200) {
        alert("Donor details updated successfully!");
        fetchDonors();
        setEditingDonor(null);
      } else {
        alert("Failed to update donor details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating donor:", error.response?.data || error.message);
      alert("An error occurred while updating the donor.");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const renderDonorDetailsTable = () => {
    if (donorsList.length === 0) {
      return <p>No donations yet.</p>;
    }

    return (
      <table border="1" style={{ width: '100%', padding: '10px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Food Type</th>
            <th>Quantity (kg)</th>
            <th>Money (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donorsList.map((donor) => (
            <tr key={donor._id}>
              <td>{donor.name}</td>
              <td>{donor.email}</td>
              <td>
                {editingDonor === donor._id ? (
                  <select value={editFoodType} onChange={(e) => setEditFoodType(e.target.value)}>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  donor.foodType
                )}
              </td>
              <td>
                {editingDonor === donor._id ? (
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    min="1"
                  />
                ) : (
                  donor.quantity
                )}
              </td>
              <td>
                {editingDonor === donor._id ? (
                  <input
                    type="number"
                    value={editMoneyDonation}
                    onChange={(e) => setEditMoneyDonation(Number(e.target.value))}
                    min="0"
                  />
                ) : (
                  donor.moneyDonation || 0
                )}
              </td>
              <td>
                {editingDonor === donor._id ? (
                  <>
                    <button onClick={() => handleSaveEdit(donor._id)}>Save</button>
                    <button onClick={() => setEditingDonor(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(donor)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? '250px' : '60px',
          backgroundColor: '#2C3E50',
          height: '100vh',
          color: '#fff',
          transition: '0.3s',
        }}
      >
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          {isSidebarOpen ? 'Close' : 'Open'} Sidebar
        </div>

        <ul style={{ padding: 0, listStyleType: 'none' }}>
          <li
            onClick={() => setSelectedLogin('admin')}
            style={{
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: selectedLogin === 'admin' ? '#34495E' : 'transparent',
            }}
          >
            <FaRegUser style={{ marginRight: '10px' }} /> Admin Login
          </li>
          <li
            onClick={() => setSelectedLogin('donor')}
            style={{
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: selectedLogin === 'donor' ? '#34495E' : 'transparent',
            }}
          >
            <FaUserAlt style={{ marginRight: '10px' }} /> Donor Login
          </li>
          <li
            style={{
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setShowDonorDetails(true)}
          >
            <FaUsers style={{ marginRight: '10px' }} /> Donor List
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>NGO Waste Food Management Dashboard</h1>

        {selectedLogin === 'admin' && !adminLoggedIn && (
          <div>
            <h3>Admin Login</h3>
            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: '10px' }}>
                <label>Username:</label>
                <input type="text" placeholder="Enter admin username" style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Password:</label>
                <input type="password" placeholder="Enter admin password" style={{ width: '100%' }} />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}

        {selectedLogin === 'donor' && !donorLoggedIn && (
          <div>
            <h3>Donor Login</h3>
            <form onSubmit={handleDonorLogin}>
              <div style={{ marginBottom: '10px' }}>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  style={{ width: '100%' }}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter donor email"
                  style={{ width: '100%' }}
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter donor password"
                  style={{ width: '100%' }}
                  value={donorPassword}
                  onChange={(e) => setDonorPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        )}

        {selectedLogin === 'donor' && donorLoggedIn && (
          <div>
            <h3>Food & Money Donation</h3>
            <form onSubmit={handleSubmitDonation}>
              <div style={{ marginBottom: '10px' }}>
                <label>Food Type:</label>
                <select
                  name="foodType"
                  value={donorFoodSelection.foodType}
                  onChange={handleFoodChange}
                  style={{ width: '100%' }}
                  required
                >
                  <option value="">Select Food Type</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains">Grains</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Quantity (kg):</label>
                <input
                  type="number"
                  name="quantity"
                  value={donorFoodSelection.quantity}
                  onChange={handleFoodChange}
                  min="0"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Money Donation (₹):</label>
                <input
                  type="number"
                  value={donorMoneyDonation}
                  onChange={(e) => setDonorMoneyDonation(Number(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <button type="submit">Donate</button>
            </form>
          </div>
        )}

        {(adminLoggedIn || showDonorDetails) && (
          <div>
            <h3>Donor Details</h3>
            {renderDonorDetailsTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
