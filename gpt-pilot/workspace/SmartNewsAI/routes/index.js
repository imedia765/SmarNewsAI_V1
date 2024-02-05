const express = require('express');
const { spawn } = require('child_process');
const EconomicEvent = require('../models/EconomicEvent');
const { saveEconomicEvent } = require('../controllers/economicEventController');

module.exports = (app) => {
  app.use('/api/economic-events', async (req, res) => {
    console.log(`Fetching economic events for the current day.`); // gpt_pilot_debugging_log

    let dataChunks = []; // Collect data chunks from Python script

    const pythonProcess = spawn('python', ['./python/fetch_financial_data.py']); // No date arguments passed

    pythonProcess.stdout.on('data', (data) => {
      dataChunks.push(data);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python script execution error: ${data.toString()}`, data.toString()); // gpt_pilot_debugging_log
    });

    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Python script exited with error code: ${code}`); // gpt_pilot_debugging_log
        return res.status(500).json({ message: "Error in Python script execution", error: `Exited with code ${code}` });
      }

      try {
        const eventsString = Buffer.concat(dataChunks).toString();
        const events = JSON.parse(eventsString);

        if(events.error){
          console.error(`Failed to fetch economic events: ${events.error}`); // gpt_pilot_debugging_log
          return res.status(500).json({ message: "Failed to fetch economic events", error: events.error });
        }

        console.log(`Successfully fetched economic events. Saving to DB.`); // gpt_pilot_debugging_log
        await Promise.all(events.map(event => saveEconomicEvent(event).catch(err => {
          console.error("Error in saving economic event to database: ", err); // gpt_pilot_debugging_log
        })));

        res.json(events);
      } catch (err) {
        console.error(`Error processing Python script output: ${err}`, err); // gpt_pilot_debugging_log
        res.status(500).json({ message: "Error processing Python script output", error: err.toString() });
      }
    });
  });
};