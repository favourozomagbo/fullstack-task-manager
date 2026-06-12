async function loadTasks(){

    const response = await fetch(
        "http://127.0.0.1:5000/tasks"
    )

    tasks = await response.json()

    renderTasks()

}

let tasks = []

loadTasks()

if(

localStorage.getItem(
"darkMode"
)

==="true"

){

document.body.classList
.add("dark")

}

function toggleDarkMode(){

document.body
.classList.toggle(
"dark"
)

localStorage.setItem(

"darkMode",

document.body.classList
.contains("dark")

)

}

function searchTasks(){

let searchValue =

document.getElementById(
"searchInput"
)
.value
.toLowerCase()


let allTasks =

document.querySelectorAll(
"#taskList li"
)


allTasks.forEach(function(task){

if(

task.innerText
.toLowerCase()
.includes(searchValue)

){

task.style.display =

"flex"

}

else{

task.style.display =

"none"

}

})

}

async function addTask(){

    let task =
    document.getElementById(
    "taskInput"
    ).value

    let category =
    document.getElementById(
    "category"
    ).value
  
    let dueDate =
    document.getElementById(
"dueDate"
    ).value

    if(task === ""){

        alert("Enter a task 😭")

        return

    }

    const response = await fetch(

        "http://127.0.0.1:5000/add-task",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

                text: task,
                category: category,
                dueDate: dueDate

            })

        }

    )

    const data =
    await response.json()

    console.log(data)

    await loadTasks()

    document.getElementById(
    "taskInput"
    ).value = ""

}


async function deleteTask(taskId){

    const response = await fetch(

        "http://127.0.0.1:5000/delete-task/" + taskId,

        {
            method: "DELETE"
        }

    )

    const data = await response.json()

    console.log(data)

    await loadTasks()

}

async function editTask(taskId){

    let newText = prompt("Enter new task:");

    if(newText === null || newText.trim() === ""){

        return;

    }

    let newCategory = prompt("Enter new category:");

    if(newCategory === null || newCategory.trim() === ""){

        return;

    }

    let newDueDate = prompt("Enter new due date (YYYY-MM-DD):");

    if(newDueDate === null || newDueDate.trim() === ""){

        return;

    }

    const response = await fetch(

        "http://127.0.0.1:5000/edit-task/" + taskId,

        {

            method: "PATCH",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                text: newText,

                category: newCategory,

                dueDate: newDueDate

            })

        }

    );

    const data = await response.json();

    console.log(data);

    await loadTasks();

}


async function completeTask(taskId){

    const response = await fetch(

        "http://127.0.0.1:5000/complete-task/" + taskId,

        {
            method: "PATCH"
        }

    )

    const data = await response.json()

    console.log(data)

    await loadTasks()

}

async function clearAllTasks(){

    let answer = confirm(
        "Delete all tasks?"
    );

    if(!answer){

        return;
    }

    const response = await fetch(

        "http://127.0.0.1:5000/clear-tasks",

        {
            method: "DELETE"
        }

    );

    const data = await response.json();

    console.log(data);

    await loadTasks();

}


function filterTasks(){

let selected =

document.getElementById(
"filterCategory"
).value

let allTasks =

document.querySelectorAll(
"#taskList li"
)

allTasks.forEach(function(task){

if(

selected === "All" ||

task.innerText.includes(
selected
)

){

task.style.display = "flex"

}

else{

task.style.display = "none"

}

})

}

document.getElementById(
"taskInput"
)

.addEventListener(
"keypress",

function(event){

if(event.key==="Enter"){

addTask()

}

}
)

function renderTasks(){

let list =
document.getElementById(
"taskList"
)

list.innerHTML = ""

document.getElementById(
"taskCount"
).innerHTML =

"Tasks: " +

tasks.length


let completedTasks =

tasks.filter(function(task){

return task.completed

}).length

document.getElementById(
"completedCount"
).innerHTML =

"Completed: " +

completedTasks


let percentage = 0

if(tasks.length > 0){

percentage =

(completedTasks /
tasks.length)

* 100

}

document.getElementById(
"progressText"
).innerHTML =

Math.round(
percentage
)

+ "% Complete"


document.getElementById(
"progressBar"
).style.width =

percentage + "%"

tasks.sort(function(a,b){

return new Date(a.dueDate)

-

new Date(b.dueDate)

})


tasks.forEach(function(task){

let newTask =
document.createElement(
"li"
)

newTask.innerHTML =

'<div class="task-info">' +

'<span class="task-text">' +

task.text +

'</span>' +

'<br>' +

'<span class="category">' +
task.category +
'</span>' +

'<span class="date">' +
'📅 Due: ' +
task.dueDate +
'</span>' +

'</div>' +

' <button onclick="completeTask(' + task.id + ')">✔</button> ' +

' <button onclick="editTask(' + task.id + ')">✏️</button> ' +

' <button onclick="deleteTask(' + task.id + ')">❌</button>';

let today =
new Date()

let dueDate =
new Date(task.dueDate)

if(

dueDate < today &&

!task.completed

){

newTask.querySelector(
".date"
).style.color = "red"

}

if(task.completed){

    newTask.querySelector("span")
    .style.textDecoration =

    "line-through"

}

list.appendChild(
    
newTask
)

})

}