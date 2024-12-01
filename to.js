// Existing To-Do List Code
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");

function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (!task) return; // Ignore empty tasks
  if (todoList.children.length >= 10) {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";

  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  });

  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(" " + task));
  todoList.appendChild(li);

  input.value = ""; // Clear the input field
}

// New Code to Link To-Do List with Dates
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoListContainer = document.getElementById('todo-list');
let todoData = {}; // Object to store todos for each date
let currentDate = new Date(); // Current date
let selectedDay = null; // Placeholder for the selected day

// Function to render the todo list for the selected day
function renderTodoList() {
  todoListContainer.innerHTML = ''; // Clear previous todos
  const todoKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
  const todos = todoData[todoKey] || []; // Get existing todos for the selected date

  todos.forEach((todo, index) => {
    const todoItem = document.createElement('div');
    todoItem.textContent = todo;
    todoItem.classList.add('todo-item');
    todoItem.addEventListener('click', () => {
      // Remove todo on click
      todos.splice(index, 1);
      todoData[todoKey] = todos; // Update the todos in the data object
      renderTodoList(); // Re-render the list
    });
    todoListContainer.appendChild(todoItem);
  });
}

// Add To-Do Item
addTodoButton.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText && selectedDay !== null) {
    const todoKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
    if (!todoData[todoKey]) {
      todoData[todoKey] = []; // Initialize array if it doesn't exist
    }
    todoData[todoKey].push(todoText); // Add new todo to the array
    todoInput.value = ''; // Clear input
    renderTodoList(); // Re-render the list
  }
});

// Example function to handle day selection in the calendar
function onDaySelected(day) {
  selectedDay = day; // Update selected day
  renderTodoList(); // Render the todo list for the selected day
}

// Call this function when a date is clicked in the calendar
// You would need to integrate this with your existing calendar event handlers