const eventList = document.getElementById('event-list');
const addEventButton = document.getElementById('add-event');

let events = [];

// Function to add an event
addEventButton.addEventListener('click', () => {
    const dateInput = document.getElementById('event-date').value;
    const titleInput = document.getElementById('event-title').value;

    if (dateInput && titleInput) {
        events.push({ date: dateInput, title: titleInput });
        displayEvents(events);
        document.getElementById('event-title').value = ''; // Clear input
    } else {
        alert('Please enter both date and event title.');
    }
});

// Function to display events
function displayEvents(eventsToDisplay) {
    eventList.innerHTML = ''; // Clear the current list
    eventsToDisplay.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.date}: ${event.title}`;
        eventList.appendChild(li);
    });
}