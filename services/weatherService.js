require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Define the cities with their latitudes and longitudes
const cities = {
    Delhi: { lat: 28.6139, lon: 77.2090 },
    Mumbai: { lat: 19.0760, lon: 72.8777 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Bangalore: { lat: 12.9716, lon: 77.5946 },
    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Hyderabad: { lat: 17.3850, lon: 78.4867 }
};

// Fetch weather data for a city
async function getWeatherData(city) {
    const { lat, lon } = cities[city];
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                lat,
                lon,
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return null;
    }
}

// Export the function for use in other modules
module.exports = { getWeatherData };
