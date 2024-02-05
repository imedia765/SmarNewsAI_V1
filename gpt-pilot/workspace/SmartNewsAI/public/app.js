document.getElementById('fetchData').addEventListener('click', function() {
    const timeRange = document.getElementById('time_range').value;
    console.log(`Fetching economic events for time range: ${timeRange}`); // Logging the operation
    const apiURL = `/api/economic-events?time_range=${timeRange}`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('eventsBody');
            tableBody.innerHTML = ''; // Clear previous results
            data.forEach(event => {
                const row = `<tr>
                                <td>${event.date}</td>
                                <td>${event.time}</td>
                                <td>${event.country}</td>
                                <td>${event.event}</td>
                                <td>${event.importance}</td>
                                <td>${event.actual ?? ''}</td>
                                <td>${event.forecast ?? ''}</td>
                                <td>${event.previous ?? ''}</td>
                             </tr>`;
                tableBody.innerHTML += row;
            });
            console.log(`Successfully fetched and displayed economic events for time range: ${timeRange}`); // Logging the success operation
        })
        .catch(error => {
            console.error('Error fetching data:', error, error.message); // gpt_pilot_debugging_log
            // Display a user-friendly error message on the frontend, e.g., "Failed to fetch economic events data."
            document.getElementById('eventsBody').innerHTML = '<tr><td colspan="8">Failed to fetch economic events data. Please try again later.</td></tr>';
        });
});