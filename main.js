const input = document.querySelector(".input");
const submit = document.querySelector(".add");
const tasks = document.querySelector(".tasks");

// Empty array to push the tasks it it
let arrayOfTasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

// treger localstoreage function
getData();

// when click on submit button
submit.onclick = function () {
  if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
};

// addTask function
function addTask(taskText) {
  // Task data
  let task = {
    id: Date.now(),
    title: taskText,
    complete: false,
  };
  // push the task to an array
  arrayOfTasks.push(task);
  //   add tasks to page
  addTasksToPage(arrayOfTasks);
  // add tasks local storage
  addTasksToLocalstorage(arrayOfTasks);
}

// function to add tasks to page
function addTasksToPage(arrayOfTasks) {
  // cleare tasks container with each task
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    // create task div
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    if (task.complete) {
      taskDiv.className = "task done";
    }
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.appendChild(document.createTextNode(task.title));

    // craete delete button
    const del = document.createElement("span");
    del.appendChild(document.createTextNode("Delete"));
    del.className = "del";
    taskDiv.appendChild(del);

    // append the task in tasks container
    tasks.appendChild(taskDiv);
  });
}

// function to add tasks to local storage
function addTasksToLocalstorage(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

// function to get data from localStorage
function getData() {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    addTasksToPage(data);
  }
}

// delete task from ui & confirm tasks
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    delteFromStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    confirmTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function delteFromStorage(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addTasksToLocalstorage(arrayOfTasks);
}

function confirmTask(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].complete = !arrayOfTasks[i].complete;
    }
  }
  addTasksToLocalstorage(arrayOfTasks);
}
