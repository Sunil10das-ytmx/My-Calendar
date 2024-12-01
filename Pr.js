// DOM Elements
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const prevMonth = document.getElementById('prev-month');
const nextMonth = document.getElementById('next-month');
const themeToggle = document.getElementById('theme-toggle');
const notes = document.getElementById('notes');
const selectedDate = document.getElementById('selected-date');

let currentDate = new Date();
let selectedDay = null;
let notesData = {}; // Object to store notes for each date

// Render Calendar
function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Clear previous calendar
  calendar.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill empty cells
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    calendar.appendChild(cell);
  }

  // Fill days
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.textContent = day;
    cell.addEventListener('click', () => {
      selectedDay = day;
      selectedDate.textContent = `${day}/${month + 1}/${year}`;
      notes.value = notesData[`${year}-${month + 1}-${day}`] || ''; // Load existing notes
    });
    calendar.appendChild(cell);
  }

  monthYear.textContent = `${date.toLocaleString('default', {
    month: 'long',
  })} ${year}`;
}

// Save notes for the selected date
notes.addEventListener('input', () => {
  if (selectedDay !== null) {
    const noteKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
    notesData[noteKey] = notes.value; // Save notes in the notesData object
  }
});

// Event Listeners
prevMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Initialize Calendar
renderCalendar(currentDate);