import investpy
import json
from datetime import datetime

def fetch_filtered_economic_events(importance=None, countries=None):
    try:
        today_date = datetime.now().strftime("%d/%m/%Y")
        print(f"Fetching filtered economic events for the current day: {today_date}")
        
        filters = {
            'from_date': today_date,
            'to_date': today_date,
            'importance': importance if importance else ['all'],
            'countries': countries if countries else ['all']
        }
        
        economic_events = investpy.economic_calendar(**filters)
        return economic_events.to_json(orient='records')
    except Exception as e:
        print(f"An error occurred while fetching data: {str(e)}", exc_info=True)
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    importance = ['high', 'medium']
    countries = ['united states', 'germany']
    fetched_data = fetch_filtered_economic_events(importance=importance, countries=countries)
    print(fetched_data)