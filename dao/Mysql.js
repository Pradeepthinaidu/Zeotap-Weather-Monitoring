let Client = require('mysql2');
let config =  require('config');

const dbConfig = config.dbConfig;

var connection = Client.createConnection({
    host:dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.database,
    port:dbConfig.port
})
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', connection.threadId);
});
// Save daily weather summary to MySQL
async function saveDailySummary(city, summary) {
    const query = `INSERT INTO weather_summaries (city, date, average_temp, max_temp, min_temp, dominant_condition)
                   VALUES (?, CURDATE(), ?, ?, ?, ?)`;

    const values = [
        city,
        summary.average_temp,
        summary.max_temp,
        summary.min_temp,
        summary.dominant_condition
    ];

    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
                return reject(error);
            }
            console.log(`Daily summary saved for ${city}.`);
            resolve(results);
        });
    });
}

module.exports = { saveDailySummary };



