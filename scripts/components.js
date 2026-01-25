const taskContainer = document.getElementById("tasks-container");

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    e.target.closest(".task-item").remove();
  }

  if (e.target.classList.contains("check-box")) {
    e.target.closest(".task-item").classList.toggle("finish");
  }
});
