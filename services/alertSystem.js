const alertThresholds = {
    temp: 35,  // Celsius
    condition: 'Rain'
};

function checkAlerts(weatherData) {
    if (weatherData.temp > alertThresholds.temp || weatherData.weather_condition === alertThresholds.condition) {
        console.log(`ALERT: Weather exceeded threshold in ${weatherData.city}!`);
        console.log(`Condition: ${weatherData.weather_condition}, Temp: ${weatherData.temp}°C`);
    }
}

module.exports = { checkAlerts };
