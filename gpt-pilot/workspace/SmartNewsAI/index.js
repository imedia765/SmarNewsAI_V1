require('dotenv').config();
const express = require('express');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const connectDB = require('./utils/db');
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
// Serving static files from public directory
app.use(express.static('public'));
console.log("Static files now served from the /public directory.");

// Use routes
app.use('/api/economic-events', async (req, res) => {
    try {
        const { stdout, stderr } = await exec('python ./python/fetch_financial_data.py');

        console.log(`Raw Python script output: ${stdout}`); // gpt_pilot_debugging_log

        if (stderr) {
            console.error(`Python script execution error: ${stderr}`);  // gpt_pilot_debugging_log
            return res.status(500).json({ message: "Python script execution error", error: stderr });
        }

        console.log(`Raw Python script output, which should be JSON: ${stdout}`); // gpt_pilot_debugging_log

        try {
            const events = JSON.parse(stdout);
            res.json(events);
        } catch (parseError) {
            console.error(`Error parsing JSON from Python script: ${parseError}`, parseError);  // gpt_pilot_debugging_log
            res.status(500).json({ message: "Error parsing JSON from Python script", error: parseError.toString() });
        }
    } catch (err) {
        console.error(`Error calling Python script: ${err}`, err);  // gpt_pilot_debugging_log
        res.status(500).json({ message: "Error calling Python script", error: err.toString() });
    }
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('SmartNewsAI Server is running...');
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

process.on('uncaughtException', (error) => {
    console.error(`Uncaught Exception: ${error.message}
`, error);
    // Consider gracefully shutting down the server in a production environment
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

app.use((err, req, res, next) => {
    console.error(`Internal server error: ${err.message}
`, err);
    res.status(500).send('Internal Server Error');
});