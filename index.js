const tasks_container = document.getElementById("tasks-container");
const tasks_data = [
  { title: "Buy pen", status: "pending", close: true },
  { title: "Buy pen", status: "pending", close: true },
  { title: "Buy pen", status: "pending", close: true },
];

const tasks = tasks_data.map((task) => {
  const container = document.createElement("div");
  container.classList.add("w-100", "d-flex", "align-items-center", "fs-5");
  const taskTitle = document.createElement("div");
  taskTitle.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  taskTitle.innerHTML = `<h4>${task.title}</h4>`;
  container.appendChild(taskTitle);
  const horizontalbar = document.createElement("hr");
  tasks_container.appendChild(container);
  tasks_container.appendChild(horizontalbar);
});
