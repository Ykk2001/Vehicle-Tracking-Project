const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Load the dummy data from a JSON file
let vehicleRoute = JSON.parse(fs.readFileSync('vehicleData.json', 'utf-8'));

app.use(cors());
app.use(express.json());

let index = 0;

// API endpoint to get vehicle location and route
app.get('/api/vehicle', (req, res) => {
  res.json(vehicleRoute[index]);
});

setInterval(() => {
  index = (index + 1) % vehicleRoute.length;
  // Introduce slight variations to simulate realistic movement
  vehicleRoute[index].latitude += (Math.random() - 0.5) * 0.0001;
  vehicleRoute[index].longitude += (Math.random() - 0.5) * 0.0001;
  console.log('Current vehicle location:', vehicleRoute[index]);
}, 5000);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
