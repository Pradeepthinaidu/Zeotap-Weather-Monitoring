const dailyData = {};  // Store data for each city in memory

function updateDailyData(city, weatherData) {
    if (!dailyData[city]) {
        dailyData[city] = [];
    }
    dailyData[city].push(weatherData);
}

function calculateDailySummary(city) {
    const temps = dailyData[city].map(entry => parseFloat(entry.temp));
    const conditions = dailyData[city].map(entry => entry.weather_condition);

    const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(2);
    const maxTemp = Math.max(...temps).toFixed(2);
    const minTemp = Math.min(...temps).toFixed(2);
    const dominantCondition = conditions.sort((a, b) =>
        conditions.filter(c => c === a).length - conditions.filter(c => c === b).length
    ).pop();

    return {
        average_temp: avgTemp,
        max_temp: maxTemp,
        min_temp: minTemp,
        dominant_condition: dominantCondition
    };
}

module.exports = { updateDailyData, calculateDailySummary };
