// Variables & Setup
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const container = document.querySelector("#tasks-container");
const mustContainer = document.getElementById("must-container");
const shouldContainer = document.getElementById("should-container");
const couldContainer = document.getElementById("could-container");

refreshData();

// State Management & Rendering
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function refreshData() {
  document.getElementById("must-container").innerHTML = "";
  document.getElementById("should-container").innerHTML = "";
  document.getElementById("could-container").innerHTML = "";

  tasks.forEach((task) => {
    renderingTask(task);
  });
}

function renderingTask(renderTask) {
  const isChecked = renderTask.completed ? "checked" : "";
  const taskHTML = `
    <input type="checkbox" class="check-box" title="toogle task" ${isChecked} />
    <span class="task-title"></span> <img src="res/delete.svg" role="button" tabindex="0" alt="Delete" title="delete this task" class="delete-button"/>
    `;

  const task = document.createElement("div");
  task.classList.add("task-item");
  task.innerHTML = taskHTML;
  task.querySelector(".task-title").textContent = renderTask.title;

  if (renderTask.completed) {
    task.classList.add("finish");
  }
  task.dataset.id = renderTask.id;

  switch (renderTask.state) {
    case "must":
      mustContainer.appendChild(task);
      break;
    case "should":
      shouldContainer.appendChild(task);
      break;
    case "could":
      couldContainer.appendChild(task);
      break;
  }
}

// Add New Task
container.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("add-task")) {
    return;
  }

  const addTaskForm = e.target;
  const taskTitle = addTaskForm.querySelector(".title-input");
  const column = addTaskForm.closest(".column");

  if (taskTitle.value.trim() === "") {
    taskTitle.classList.add("error");
    setTimeout(() => {
      taskTitle.classList.remove("error");
    }, 1000);
    return;
  } else {
    taskTitle.classList.remove("error");
  }

  const task = {
    title: taskTitle.value,
    state: "",
    completed: false,
    id: Date.now(),
  };

  if (column.classList.contains("must")) task.state = "must";
  else if (column.classList.contains("should")) task.state = "should";
  else task.state = "could";

  tasks.push(task);
  saveTasks();
  refreshData();
  taskTitle.value = "";
});

// Task Actions (Delete & Toggle)
container.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");

  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);

  if (e.target.classList.contains("delete-button")) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    refreshData();
  }

  if (e.target.classList.contains("check-box")) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      refreshData();
    }
  }
});

// Clear Column Tasks
function clearTasks(type) {
  tasks = tasks.filter((task) => task.state !== type);
  saveTasks();
  refreshData();
}

container.addEventListener("click", (e) => {
  if (!e.target.classList.contains("clear-tasks")) return;

  switch (e.target.id) {
    case "must-clear-task":
      clearTasks("must");
      break;
    case "should-clear-task":
      clearTasks("should");
      break;
    case "could-clear-task":
      clearTasks("could");
      break;
  }
});
