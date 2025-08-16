import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ngo-with-gitbash.onrender.com/api/donors";

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(API_URL);
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const updateDonor = async (id, updatedDonor) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedDonor);
      setDonors((prev) =>
        prev.map((donor) => (donor._id === id ? response.data : donor))
      );
    } catch (error) {
      console.error("Error updating donor:", error);
    }
  };

  const updateDonorById = async (donorId, updatedData) => {
    try {
      const response = await axios.put(
        `https://ngo-with-gitbash.onrender.com/api/donors/${donorId}`,
        updatedData
      );
      setDonors((prev) =>
        prev.map((donor) => (donor._id === donorId ? response.data : donor))
      );
    } catch (error) {
      console.error("Error updating donor by ID:", error);
    }
  };

  if (loading) return <p>Loading donors...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {donors.map((donor) => (
          <li key={donor._id}>
            {donor.name} - {donor.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
