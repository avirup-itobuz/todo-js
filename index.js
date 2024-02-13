const input_div = document.getElementById("input-data");
const add_task = document.getElementById("add-task");
const tasks_container = document.getElementById("tasks-container");
let tasks_data = [];
// { id: 1, title: "Buy pen", status: "pending" },
// { id: 2, title: "Buy pen", status: "pending" },
// { id: 3, title: "Buy pen", status: "pending" },
// { id: 4, title: "Buy pen", status: "pending" },
// { id: 5, title: "Buy pen", status: "pending" },
// const tasks = tasks_data.map((task) => {
//   const container = document.createElement("div");
//   container.classList.add(
//     "w-100",
//     "d-flex",
//     "align-items-center",
//     "fs-5",
//     "py-1"
//   );
//   const taskTitle = document.createElement("div");
//   taskTitle.classList.add(
//     "d-flex",
//     "justify-content-center",
//     "align-items-center"
//   );
//   taskTitle.innerHTML = `<h4>${task.title}</h4>`;
//   container.appendChild(taskTitle);
//   const taskStatus = document.createElement("div");
//   taskStatus.classList.add(
//     "d-flex",
//     "justify-content-center",
//     "align-items-center"
//   );
//   const statusButton = document.createElement("button");
//   statusButton.classList.add(
//     "rounded",
//     "border-0",
//     "text-white",
//     "p-2",
//     "status-button"
//   );
//   statusButton.innerText = `${task.status}`;
//   statusButton.dataset.id = `${task.id}`;
//   taskStatus.appendChild(statusButton);
//   container.appendChild(taskStatus);
//   const closeButtonDiv = document.createElement("div");
//   closeButtonDiv.classList.add(
//     "d-flex",
//     "justify-content-center",
//     "align-items-center"
//   );
//   const closeButton = document.createElement("button");
//   closeButton.classList.add("close-button");
//   // closeButton.innerText = "delete";
//   closeButton.dataset.id = `${task.id}`;
//   closeButtonDiv.appendChild(closeButton);
//   container.appendChild(closeButtonDiv);
//   tasks_container.appendChild(container);
//   const horizontalbar = document.createElement("hr");
//   horizontalbar.classList.add("m-0");
//   tasks_container.appendChild(horizontalbar);
// });

function loadTasks() {
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
      "py-1"
    );
    const taskTitle = document.createElement("div");
    taskTitle.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    if (task.status === "completed")
      taskTitle.classList.add("text-decoration-line-through");
    taskTitle.innerHTML = `<h4>${task.title}</h4>`;
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
      "p-2",
      "status-button"
    );
    statusButton.innerText = `${task.status}`;
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
function addTasks(tasks, task_title) {
  const task = {
    id: Math.round(Math.random() * 10000),
    title: task_title,
    status: "pending",
  };
  tasks.push(task);
  return tasks;
}
function deleteTasks(tasks, id) {
  tasks = tasks.filter((task) => task.id != id);
  return tasks;
}
function changeStatus(e) {
  console.log(e.target.dataset.id);
  tasks_data = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks_data.length; i++) {
    if (tasks_data[i].id == e.target.dataset.id) {
      if (tasks_data[i].status === "pending")
        tasks_data[i].status = "completed";
      else tasks_data[i].status = "pending";
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks_data));
  loadTasks();
}
function deleteButtonClicked(e) {
  console.log(e.target.dataset.id);
  tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = deleteTasks(tasks_data, e.target.dataset.id);
  localStorage.setItem("tasks", JSON.stringify(data));
  loadTasks();
}
add_task.addEventListener("click", (e) => {
  console.log(e.target);
  if (input_div.value.trim().length == 0) {
    alert("empty task");
    return;
  }
  if (localStorage.getItem("tasks"))
    tasks_data = JSON.parse(localStorage.getItem("tasks"));
  const data = addTasks(tasks_data, input_div.value);
  localStorage.setItem("tasks", JSON.stringify(data));
  input_div.value = "";
  loadTasks();
});

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", []);
}
loadTasks();
