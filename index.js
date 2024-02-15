import { addTasks, deleteTasks, deleteCompleted } from "./helper.js";

const inputDiv = document.getElementById("input-data");
const addTask = document.getElementById("add-task");
const update_task = document.getElementById("update-task");
const tasksContainer = document.getElementById("tasks-container");
const allBtn = document.getElementById("all");
const pendingBtn = document.getElementById("pending");
const compeltedBtn = document.getElementById("completed");
const clearCompletedBtn = document.getElementById("clearCompleted");
let tasks_data = [];

function loadAllTasks() {
  tasksContainer.innerHTML = "";
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  tasks_data.map((task) => {
    const container = document.createElement("div");
    container.classList.add(
      "w-100",
      "d-flex",
      "align-items-center",
      "fs-5",
      "py-1",
      "ps-1"
    );
    const taskTitle = document.createElement("div");
    taskTitle.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    const taskTitleText = document.createElement("h4");
    taskTitleText.innerText = `${task.title}`;
    if (task.status === "completed")
      taskTitleText.classList.add("text-decoration-line-through", "grey");
    taskTitle.appendChild(taskTitleText);
    const editBtn = document.createElement("button");
    editBtn.dataset.id = `${task.id}`;
    editBtn.classList.add("border-0", "bg-white", "edit-btn");
    editBtn.addEventListener("click", editTaskInitiate);
    taskTitle.appendChild(editBtn);
    container.appendChild(taskTitle);
    const taskStatus = document.createElement("div");
    taskStatus.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    const statusButton = document.createElement("button");
    statusButton.classList.add(
      "rounded",
      "border-0",
      "text-white",
      "status-button",
      "fs-6",
      "p-2"
    );
    if (task.status === "completed")
      statusButton.classList.add("status-button-green");
    else statusButton.classList.add("status-button-red");
    if (screen.width > 470) statusButton.innerText = `${task.status}`;
    statusButton.addEventListener("click", changeStatus);
    statusButton.dataset.id = `${task.id}`;
    taskStatus.appendChild(statusButton);
    container.appendChild(taskStatus);
    const closeButtonDiv = document.createElement("div");
    closeButtonDiv.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.dataset.id = `${task.id}`;
    closeButton.addEventListener("click", deleteButtonClicked);
    closeButtonDiv.appendChild(closeButton);
    container.appendChild(closeButtonDiv);
    tasksContainer.appendChild(container);
    const horizontalbar = document.createElement("hr");
    horizontalbar.classList.add("m-0");
    tasksContainer.appendChild(horizontalbar);
  });
}
function getSelectedTasks(option) {
  tasksContainer.innerHTML = "";
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  tasks_data.map((task) => {
    if (task.status === option) {
      const container = document.createElement("div");
      container.classList.add(
        "w-100",
        "d-flex",
        "align-items-center",
        "fs-5",
        "py-1",
        "ps-1"
      );
      const taskTitle = document.createElement("div");
      taskTitle.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );
      const taskTitleText = document.createElement("h4");
      taskTitleText.innerText = `${task.title}`;
      if (task.status === "completed")
        taskTitleText.classList.add("text-decoration-line-through", "grey");
      taskTitle.appendChild(taskTitleText);

      const editBtn = document.createElement("button");
      editBtn.dataset.id = `${task.id}`;
      editBtn.classList.add("border-0", "bg-white", "edit-btn");
      editBtn.addEventListener("click", editTaskInitiate);
      taskTitle.appendChild(editBtn);
      container.appendChild(taskTitle);
      const taskStatus = document.createElement("div");

      taskStatus.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );

      const statusButton = document.createElement("button");

      statusButton.classList.add(
        "rounded",
        "border-0",
        "text-white",
        "status-button",
        "fs-6",
        "p-2"
      );
      if (task.status === "completed")
        statusButton.classList.add("status-button-green");
      else statusButton.classList.add("status-button-red");
      if (screen.width > 470) statusButton.innerText = `${task.status}`;

      statusButton.addEventListener("click", changeStatus);
      statusButton.dataset.id = `${task.id}`;
      taskStatus.appendChild(statusButton);
      container.appendChild(taskStatus);
      const closeButtonDiv = document.createElement("div");

      closeButtonDiv.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );

      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.dataset.id = `${task.id}`;
      closeButton.addEventListener("click", deleteButtonClicked);
      closeButtonDiv.appendChild(closeButton);
      container.appendChild(closeButtonDiv);
      tasksContainer.appendChild(container);
      const horizontalbar = document.createElement("hr");
      horizontalbar.classList.add("m-0");
      tasksContainer.appendChild(horizontalbar);
    }
  });
}
function changeStatus(e) {
  tasks_data = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks_data.length; i++) {
    if (String(tasks_data[i].id) === String(e.target.dataset.id)) {
      if (tasks_data[i].status === "pending")
        tasks_data[i].status = "completed";
      else tasks_data[i].status = "pending";
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks_data));
  loadAllTasks();
}
function deleteButtonClicked(e) {
  tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = deleteTasks(tasks_data, e.target.dataset.id);
  localStorage.setItem("tasks", JSON.stringify(data));
  loadAllTasks();
}
function editTaskInitiate(e) {
  tasks_data = JSON.parse(localStorage.getItem("tasks"));
  let task = tasks_data.find(
    (ele) => String(ele.id) === String(e.target.dataset.id)
  );
  inputDiv.value = task.title;
  addTask.innerText = "Edit";
  addTask.dataset.id = e.target.dataset.id;
}

inputDiv.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (addTask.innerText === "Edit") {
      tasks_data = JSON.parse(localStorage.getItem("tasks"));
      for (let i = 0; i < tasks_data.length; i++) {
        if (tasks_data[i].id === addTask.dataset.id) {
          if (inputDiv.value.trim().length == 0) {
            alert("empty task");
            return;
          } else {
            tasks_data[i].title = inputDiv.value.trim();
          }
        }
      }
      localStorage.setItem("tasks", JSON.stringify(tasks_data));
      addTask.innerText = "Add";
      inputDiv.value = "";
      loadAllTasks();
      return;
    }
    if (!inputDiv.value.trim().length) {
      alert("empty task");
      return;
    }
    if (localStorage.getItem("tasks"))
      tasks_data = JSON.parse(localStorage.getItem("tasks"));
    const data = addTasks(tasks_data, inputDiv.value);
    if (data === undefined) return;
    localStorage.setItem("tasks", JSON.stringify(data));
    inputDiv.value = "";
    loadAllTasks();
  }
});
addTask.addEventListener("click", (e) => {
  if (addTask.innerText === "Edit") {
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks_data.length; i++) {
      if (String(tasks_data[i].id) === String(e.target.dataset.id)) {
        if (!inputDiv.value.trim().length) {
          alert("empty task");
          return;
        } else {
          tasks_data[i].title = inputDiv.value.trim();
        }
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks_data));
    addTask.innerText = "Add";
    inputDiv.value = "";
    loadAllTasks();
    return;
  }
  if (!inputDiv.value.trim().length) {
    alert("empty task");
    return;
  }
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = addTasks(tasks_data, inputDiv.value);
  if (data === undefined) return;
  localStorage.setItem("tasks", JSON.stringify(data));
  inputDiv.value = "";
  loadAllTasks();
});
allBtn.addEventListener("click", loadAllTasks);
pendingBtn.addEventListener("click", () => {
  getSelectedTasks("pending");
});
compeltedBtn.addEventListener("click", () => {
  getSelectedTasks("completed");
});
clearCompletedBtn.addEventListener("click", () => {
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = deleteCompleted(tasks_data);
  localStorage.setItem("tasks", JSON.stringify(data));
  loadAllTasks();
});

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", []);
}

loadAllTasks();
