import investpy
import json
from datetime import datetime, timedelta
import sys

def fetch_economic_events():
    try:
        today_date = datetime.now()
        next_day_date = today_date + timedelta(days=1)
  
        formatted_today_date = today_date.strftime('%d/%m/%Y')
        formatted_next_day_date = next_day_date.strftime('%d/%m/%Y')
  
        print(f"Fetching economic events for today's date: {formatted_today_date} and to date: {formatted_next_day_date}.", file=sys.stderr)  # gpt_pilot_debugging_log

        economic_events = investpy.economic_calendar(from_date=formatted_today_date, to_date=formatted_next_day_date)

        print("Successfully fetched economic events.", file=sys.stderr)  # gpt_pilot_debugging_log
        return economic_events.to_json(orient='records')
    except Exception as e:
        print(f"Error fetching economic events: {str(e)}", file=sys.stderr)  # gpt_pilot_debugging_log
        sys.exit(1)

if __name__ == '__main__':
    try:
        fetched_data = fetch_economic_events()
        print(fetched_data)
    except Exception as e:
        print(f"Unexpected error occurred while executing the script: {str(e)}", file=sys.stderr)  # gpt_pilot_debugging_log
        sys.exit(1)