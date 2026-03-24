// Key variables
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const container = document.querySelector("#tasks-container");
const mustContainer = document.getElementById("must-container");
const shouldContainer = document.getElementById("should-container");
const couldContainer = document.getElementById("could-container");

loadData();

// Save current state to LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear containers and re-render all tasks
function loadData() {
  document.getElementById("must-container").innerHTML = "";
  document.getElementById("should-container").innerHTML = "";
  document.getElementById("could-container").innerHTML = "";

  tasks.forEach((task) => {
    renderingTask(task);
  });
}

// Render a single task to the DOM
function renderingTask(renderTask) {
  // Select Columns

  // Prepare HTML
  const isChecked = renderTask.completed ? "checked" : "";
  const taskHTML = `
    <input type="checkbox" class="check-box" ${isChecked}/>
    <span class="task-title"></span> <img src="res/delete.svg" alt="Delete" class="delete-button"/>
    `;

  // Create Element
  const task = document.createElement("div");
  task.classList.add("task-item");
  task.innerHTML = taskHTML;
  task.querySelector(".task-title").textContent = renderTask.title;

  if (renderTask.completed) {
    task.classList.add("finish");
  }
  task.dataset.id = renderTask.id;

  if (renderTask.state === "must") mustContainer.appendChild(task);
  else if (renderTask.state === "should") shouldContainer.appendChild(task);
  else couldContainer.appendChild(task);
}

// Event Listener
container.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("add-task")) {
    return;
  }

  const addTaskForm = e.target;

  const taskTitle = addTaskForm.querySelector(".title-input");
  const column = addTaskForm.closest(".column");

  // Validate
  if (taskTitle.value.trim() === "") {
    taskTitle.classList.add("error");
    setTimeout(() => {
      taskTitle.classList.remove("error");
    }, 1000);
    return;
  } else {
    taskTitle.classList.remove("error");
  }

  // Create Task Object
  const task = {
    title: taskTitle.value,
    state: "",
    completed: false,
    id: Date.now(),
  };

  // Detect Column (Must / Should / Could)
  if (column.classList.contains("must")) task.state = "must";
  else if (column.classList.contains("should")) task.state = "should";
  else task.state = "could";

  // Update State & UI
  tasks.push(task);
  saveTasks();
  renderingTask(task);
  taskTitle.value = "";
});

// Handle Clicks (Delete & Toggle Check)
container.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");

  // Ignore clicks outside tasks
  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  // A) Delete Action
  if (e.target.classList.contains("delete-button")) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    taskItem.remove();
  }

  // B) Checkbox Toggle Action
  if (e.target.classList.contains("check-box")) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      taskItem.classList.toggle("finish");
    }
  }
});
