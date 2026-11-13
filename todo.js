const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const message = document.getElementById("todo-message");
const counter = document.getElementById("todo-count");
const clearButton = document.getElementById("clear-done");

const STORAGE_KEY = "christo-todo-tasks";

// Read saved tasks from the browser (or start with an empty list)
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// Write the current tasks into the browser
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.log("Could not save tasks:", error);
  }
}

let tasks = loadTasks();

function updateCount() {
  const total = list.children.length;
  const done = list.querySelectorAll("li.done").length;
  const remaining = total - done;

  if (total === 0) {
    counter.textContent = "No tasks yet. Add one above!";
  } else {
    let word = "tasks";
    if (total === 1) {
      word = "task";
    }
    counter.textContent = `${remaining} of ${total} ${word} left`;
  }
}

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

// Draw the whole list on the page from the tasks array
function render() {
  list.textContent = "";

  tasks.forEach(function (task, index) {
    const item = document.createElement("li");
    if (task.done) {
      item.classList.add("done");
    }

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      render();
    });

    text.addEventListener("click", function () {
      task.done = !task.done;
      saveTasks();
      render();
    });

    item.appendChild(text);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });

  updateCount();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText === "") {
    showMessage("Please type a task first.");
    input.focus();
    return;
  }

  hideMessage();

  tasks.push({ text: taskText, done: false });
  saveTasks();
  render();

  input.value = "";
  input.focus();
});

input.addEventListener("input", hideMessage);

// Remove every crossed-out task
clearButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.done;
  });
  saveTasks();
  render();
});

// Draw any saved tasks when the page first loads
render();