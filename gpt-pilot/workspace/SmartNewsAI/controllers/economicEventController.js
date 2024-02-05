const EconomicEvent = require('../models/EconomicEvent');

async function saveEconomicEvent(event) {
    try {
        console.log(`Attempting to save event: ${event.event}`); // gpt_pilot_debugging_log
        const startTime = Date.now(); // gpt_pilot_debugging_log

        const updatedEvent = await EconomicEvent.findOneAndUpdate(
            { date: event.date, event: event.event }, 
            event, 
            { 
              upsert: true, 
              new: true,
              useNewUrlParser: true, 
              useUnifiedTopology: true 
            }
        );
        const endTime = Date.now(); // gpt_pilot_debugging_log
        console.log(`Event saved or updated: ${updatedEvent.event}. Time taken: ${endTime - startTime}ms`); // gpt_pilot_debugging_log
    } catch (error) {
        console.error(`Error saving event to database: ${error}`, error); // gpt_pilot_debugging_log
    }
}

module.exports = {
    saveEconomicEvent,
};