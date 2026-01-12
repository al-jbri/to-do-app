const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("tasks-container");
const mustContainer = document.getElementById("must-container");
const shouldContainer = document.getElementById("should-container");
const couldContainer = document.getElementById("could-container");

addTask.onsubmit = (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("title-input");
  const taskStatus = document.getElementById("status-select");
  const taskHTML = `
  	<input type="checkbox" class="check-box" />
    <span class="task-title">${taskTitle.value}</span>
    <span class="material-symbols-outlined delete-button" aria-hidden="true">Delete</span>
	`;

  if (taskTitle.value.trim() === "") {
    taskTitle.classList.add("error");
    return;
  } else {
    taskTitle.classList.remove("error");
  }

  const task = document.createElement("div");
  task.classList.add("task-item");
  task.innerHTML = taskHTML;

  if (taskStatus.value === "must") {
    mustContainer.appendChild(task);
  } else if (taskStatus.value === "should") {
    shouldContainer.appendChild(task);
  } else {
    couldContainer.appendChild(task);
  }

  taskTitle.value = "";
};

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("check-box")) {
    e.target.parentElement.classList.toggle("finish");
  }
});
