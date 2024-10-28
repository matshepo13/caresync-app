const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/nearby-clinics', async (req, res) => {
  const { location } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=hospital&key=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching nearby clinics:', error);
    res.status(500).json({ error: 'An error occurred while fetching nearby clinics' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});