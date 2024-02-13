const tasks_container = document.getElementById("tasks-container");
const tasks_data = [
  { title: "Buy pen", status: "pending", close: true },
  { title: "Buy pen", status: "pending", close: true },
  { title: "Buy pen", status: "pending", close: true },
];

const tasks = tasks_data.map((task) => {
  const container = document.createElement("div");
  container.classList.add("w-100", "d-flex");
  const taskTitle = document.createElement("div");
  taskTitle.innerHTML = `<h3>${task.title}</h3>`;
  container.appendChild(taskTitle);
  tasks_container.appendChild(container);
});
