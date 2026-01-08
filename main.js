const addTask = document.getElementById("add-task");

addTask.onsubmit = (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("title-input");
  const taskStatus = document.getElementById("status-select");
  const taskContainer = document.getElementById("tasks-container");
  const taskHTML = `
  	<input type="checkbox" class="check-box" />
    <span class="task-title">${taskTitle.value}</span>
    <span>${taskStatus.value}</span>
    <span class="material-symbols-outlined delete-button" aria-hidden="true">Delete</span>
	`;

  if (taskTitle.value.trim() === "") {
    addTask.classList.add("error");
    return;
  } else {
    addTask.classList.remove("error");
  }

  const task = document.createElement("div");
  task.classList.add("task-item", taskStatus.value);
  task.innerHTML = taskHTML;
  taskContainer.appendChild(task);
  taskTitle.value = "";
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("check-box")) {
    e.target.parentElement.classList.toggle("finish");
  }
});
