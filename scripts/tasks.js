// ==========================================
// 1. INITIALIZATION & STATE
// ==========================================

// Retrieve data from LocalStorage or start empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const container = document.querySelector("#tasks-container");

// Initial Render
loadData();

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

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
  const mustContainer = document.getElementById("must-container");
  const shouldContainer = document.getElementById("should-container");
  const couldContainer = document.getElementById("could-container");

  // Prepare HTML
  const isChecked = renderTask.completed ? "checked" : "";
  const taskHTML = `
    <input type="checkbox" class="check-box" ${isChecked}/>
    <span class="task-title"></span> <span class="material-symbols-outlined delete-button" aria-hidden="true">Delete</span>
  `;

  // Create Element
  const task = document.createElement("div");
  task.classList.add("task-item");
  task.innerHTML = taskHTML;

  // Security: Inject text safely (Prevents XSS)
  task.querySelector(".task-title").textContent = renderTask.title;

  // Add styles & ID
  if (renderTask.completed) {
    task.classList.add("finish");
  }
  task.dataset.id = renderTask.id;

  // Append to correct column
  if (renderTask.state === "must") {
    mustContainer.appendChild(task);
  } else if (renderTask.state === "should") {
    shouldContainer.appendChild(task);
  } else {
    couldContainer.appendChild(task);
  }
}

// ==========================================
// 3. EVENT LISTENERS
// ==========================================

// Handle Form Submit (Add New Task)
container.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate: Ensure it's the correct form
  if (!e.target.classList.contains("add-task")) {
    return;
  }

  // Get Input & Validate
  const taskTitle = e.target.querySelector(".title-input");

  if (taskTitle.value.trim() === "") {
    taskTitle.classList.add("error");
    return;
  } else {
    taskTitle.classList.remove("error");
  }

  // Create Task Object
  const task = {
    title: taskTitle.value,
    state: "", // Will be set below
    completed: false,
    id: Date.now(),
  };

  // Detect Column (Must / Should / Could)
  const column = e.target.closest(".column");
  if (column.classList.contains("must")) {
    task.state = "must";
  } else if (column.classList.contains("should")) {
    task.state = "should";
  } else {
    task.state = "could";
  }

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
