addTask = document.getElementById("add-task");

addTask.onsubmit = (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById("title-input").value;
  const taskStatus = document.getElementById("status-select").value;
  const taskContainer = document.getElementById("tasks-container");
  const taskHTML = `
  	<input type="checkbox" />
    <span class="task-title">${taskTitle}</span>
    <span>${taskStatus}</span>
	`;

  if (taskTitle.trim() === "") {
    addTask.classList.add("error");
    return;
  } else {
    addTask.classList.remove("error");
  }

  const task = document.createElement("div");
  task.classList.add("task-item", taskStatus);
  task.innerHTML = taskHTML;
  taskContainer.appendChild(task);
};
