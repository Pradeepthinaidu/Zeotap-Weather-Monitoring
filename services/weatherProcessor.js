const kelvinToCelsius = (tempK) => (tempK - 273.15).toFixed(2);

function processWeatherData(data) {
    return {
        city: data.name,
        temp: kelvinToCelsius(data.main.temp),
        feels_like: kelvinToCelsius(data.main.feels_like),
        weather_condition: data.weather[0].main,
        timestamp: data.dt
    };
}

module.exports = { processWeatherData };
