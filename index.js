import { addTasks, deleteTasks, deleteCompleted } from "./helper.js";

const input_div = document.getElementById("input-data");
const add_task = document.getElementById("add-task");
const update_task = document.getElementById("update-task");
const tasks_container = document.getElementById("tasks-container");
const all_btn = document.getElementById("all");
const pending_btn = document.getElementById("pending");
const completed_btn = document.getElementById("completed");
const clear_completed_btn = document.getElementById("clearCompleted");
let tasks_data = [];

function loadAllTasks() {
  tasks_container.innerHTML = "";
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
    tasks_container.appendChild(container);
    const horizontalbar = document.createElement("hr");
    horizontalbar.classList.add("m-0");
    tasks_container.appendChild(horizontalbar);
  });
}
function getSelectedTasks(option) {
  tasks_container.innerHTML = "";
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
      tasks_container.appendChild(container);
      const horizontalbar = document.createElement("hr");
      horizontalbar.classList.add("m-0");
      tasks_container.appendChild(horizontalbar);
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
  input_div.value = task.title;
  add_task.innerText = "Edit";
  add_task.dataset.id = e.target.dataset.id;
}

input_div.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    if (add_task.innerText == "Edit") {
      tasks_data = JSON.parse(localStorage.getItem("tasks"));
      for (let i = 0; i < tasks_data.length; i++) {
        if (tasks_data[i].id == add_task.dataset.id) {
          if (input_div.value.trim().length == 0) {
            alert("empty task");
            return;
          } else {
            tasks_data[i].title = input_div.value.trim();
          }
        }
      }
      localStorage.setItem("tasks", JSON.stringify(tasks_data));
      add_task.innerText = "Add";
      input_div.value = "";
      loadAllTasks();
      return;
    }
    if (!input_div.value.trim().length) {
      alert("empty task");
      return;
    }
    if (localStorage.getItem("tasks"))
      tasks_data = JSON.parse(localStorage.getItem("tasks"));
    const data = addTasks(tasks_data, input_div.value);
    if (data === undefined) return;
    localStorage.setItem("tasks", JSON.stringify(data));
    input_div.value = "";
    loadAllTasks();
  }
});
add_task.addEventListener("click", (e) => {
  if (add_task.innerText === "Edit") {
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < tasks_data.length; i++) {
      if (String(tasks_data[i].id) === String(e.target.dataset.id)) {
        if (!input_div.value.trim().length) {
          alert("empty task");
          return;
        } else {
          tasks_data[i].title = input_div.value.trim();
        }
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks_data));
    add_task.innerText = "Add";
    input_div.value = "";
    loadAllTasks();
    return;
  }
  if (!input_div.value.trim().length) {
    alert("empty task");
    return;
  }
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = addTasks(tasks_data, input_div.value);
  if (data === undefined) return;
  localStorage.setItem("tasks", JSON.stringify(data));
  input_div.value = "";
  loadAllTasks();
});
all_btn.addEventListener("click", loadAllTasks);
pending_btn.addEventListener("click", () => {
  getSelectedTasks("pending");
});
completed_btn.addEventListener("click", () => {
  getSelectedTasks("completed");
});
clear_completed_btn.addEventListener("click", () => {
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
