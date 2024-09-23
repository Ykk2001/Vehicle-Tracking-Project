// import logo from './logo.svg';
// import './App.css';

// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';

const App = () => {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehicle');
        setVehicleData(prevData => [...prevData.slice(-50), response.data]);// Append new data
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData(); // Fetch immediately on component mount
    const intervalId = setInterval(fetchVehicleData, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div>
      <h1>Vehicle Movement Tracker</h1>
      <Map vehicleData={vehicleData} />
    </div>
  );
};

export default App;
