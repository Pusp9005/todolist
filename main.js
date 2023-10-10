
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        updateLocalStorage();
    }
}


function updateLocalStorage() {
    const tasks = [];
    const taskElements = taskList.getElementsByTagName("li");
    for (const taskElement of taskElements) {
        const taskText = taskElement.querySelector("span").textContent;
        tasks.push(taskText);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", function () {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        for (const taskText of storedTasks) {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox">
                <span>${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(li);
        }
    }
});
