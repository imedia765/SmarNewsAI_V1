const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB...'); // gpt_pilot_debugging_log
    const mongoUri = process.env.MONGO_URI;
    console.log(`Using MongoDB URI: ${mongoUri}`); // gpt_pilot_debugging_log

    try {
        await mongoose.connect(mongoUri, { 
            serverSelectionTimeoutMS: 5000 
        });
        console.log('MongoDB connected'); // gpt_pilot_debugging_log
    } catch (error) {
        console.error('MongoDB connection error:', error.stack); // gpt_pilot_debugging_log
        console.error(`Check if MongoDB is running and accessible at the specified URI. URI Format: mongodb://<user>:<password>@<host>:<port>/<database>`, error); // gpt_pilot_debugging_log
        process.exit(1);
    }
}

module.exports = connectDB;