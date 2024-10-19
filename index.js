const cron = require('node-cron');
const { getWeatherData } = require('./services/weatherService');
const { processWeatherData } = require('./services/weatherProcessor');
const { updateDailyData, calculateDailySummary } = require('./services/aggregator');
const { checkAlerts } = require('./services/alertSystem');
const { saveDailySummary } = require('./dao/Mysql');



async function trackWeather() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    for (const city of cities) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            const processedData = processWeatherData(weatherData);
            updateDailyData(city, processedData);
            checkAlerts(processedData);

            // Log processed data for debugging
            console.log(`Processed data for ${city}:`, processedData);
        }
    }
}

// Schedule the task to run every 5 minutes using node-cron
cron.schedule('* * * * * *', async () => {
    console.log('Running weather tracking job...');

    await trackWeather();

    // At the end of each day, save summaries
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    for (const city of cities) {
        const dailySummary = calculateDailySummary(city);
        console.log(`Daily summary for ${city}:`, dailySummary);
        await saveDailySummary(city, dailySummary);
    }
});