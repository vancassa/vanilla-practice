const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

// Load all event listener
function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear task event
    clearBtn.addEventListener("click", clearTasks);
    // Filter task
    filter.addEventListener("keyup", filterTask);
}

function getTasks() {
    let tasks,
        localStorageTasks = localStorage.getItem("tasks");

    if (localStorageTasks === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorageTasks);
    }

    tasks.forEach(task => {
        // Create li element
        const li = document.createElement("li");
        li.className = "collection-item";

        // Create text node and append to li
        li.innerText = task;

        // Create new link element
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks,
        localStorageTasks = localStorage.getItem("tasks");

    if (localStorageTasks === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorageTasks);
    }

    tasks.forEach((task, index) => {
        if (taskItem.innerText === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === "") {
        alert("Add a task");
    }

    // Create li element
    const li = document.createElement("li");
    li.className = "collection-item";

    // Create text node and append to li
    li.innerText = taskInput.value;

    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
    let tasks,
        localStorageTasks = localStorage.getItem("tasks");

    if (localStorageTasks === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorageTasks);
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
    console.log(e.target);
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks(e) {
    // taskList.innerHTML = '';

    // Faster - loop and remove child
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
