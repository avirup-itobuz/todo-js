export function addTasks(tasks, task_title) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title.toLowerCase() === task_title.trim().toLowerCase()) {
      alert("task already present!!");
      return;
    }
  }
  const task = {
    id: Math.round(Math.random() * 10000),
    title: task_title,
    status: "pending",
  };
  tasks.push(task);
  return tasks;
}

export function deleteTasks(tasks, id) {
  tasks = tasks.filter((task) => task.id !== Number(id));
  return tasks;
}

export function deleteCompleted(tasks) {
  tasks = tasks.filter((task) => task.status !== "completed");
  return tasks;
}
