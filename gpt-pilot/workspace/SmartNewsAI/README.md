# SmartNewsAI

SmartNewsAI is a futuristic web application that enhances your financial insights by leveraging the investpy library to fetch and analyze economic calendar data. This project aims to deliver timely and accurate economic events information to users.

## Installation

Before running SmartNewsAI, ensure you have investpy installed. Use pip for installation:

```
pip install investpy
```

## Usage

SmartNewsAI allows users to fetch economic calendar data over a specified date range. The following example demonstrates how to retrieve economic events using the `investpy.economic_calendar()` function:

```python
import investpy

economic_events = investpy.economic_calendar(from_date='01/01/2021', to_date='31/01/2021')
print(economic_events)
```

This function returns a pandas DataFrame with details about the economic events, including date, time, country, event name, its importance, and actual, forecast, and previous values when available.

### Note
- The `from_date` and `to_date` parameters must be in the format dd/mm/yyyy.
- The data is sourced from Investing.com; hence, availability and specifics depend on their website listings.

## Current Project Structure

SmartNewsAI's current project structure includes implementation for setting up the web server using Express, connecting to MongoDB with Mongoose, and a starter file for fetching financial data using investpy.

- **package.json**: Lists project dependencies.
- **.env**: Contains environment variables for server configuration.
- **index.js**: Initializes and runs the Express server.
- **models/placeholder.js**: Placeholder for future data models.
- **routes/index.js**: Placeholder for future API routes.
- **utils/db.js**: Utility for MongoDB connection.
- **mongo_setup.sh**: Script to setup MongoDB credentials.
- **python/fetch_financial_data.py**: Python script to fetch economic events data.

## Running the Application

To launch SmartNewsAI, run the server:

```
node index.js
```

Ensure MongoDB is set up and running as per the `mongo_setup.sh` instructions before starting the server.

## Contributing

Contributors are welcome to enhance the functionality of SmartNewsAI, such as the development of additional features, improving data fetching efficiency, and expanding the application's scope to cover more financial insights.

Before contributing, please ensure you follow the project's code standards and contribution guidelines.