
let tasks =
JSON.parse(
localStorage.getItem("tasks")
)
|| []

renderTasks()

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

function addTask(){

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


tasks.push({

    text: task,

    category: category,

    dueDate: dueDate,

    completed: false

})

saveTasks()

renderTasks()


document.getElementById(
"taskInput"
).value = ""

}


function saveTasks(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

)

}


function deleteTask(button){

    let text =

    button.parentElement
   .querySelector(".task-text")
    .innerText


    tasks =

    tasks.filter(function(task){

        return task.text !== text

    })


    saveTasks()

    renderTasks()

}

function editTask(button){

let oldText =

button.parentElement
.querySelector(
".task-text"
)
.innerText

let newText =

prompt(
"Edit task:",
oldText
)

if(newText){

tasks.forEach(function(task){

if(task.text === oldText){

task.text = newText

}

})

saveTasks()

renderTasks()

}

}



function completeTask(button){

    let text =

    button.parentElement
    .querySelector(".task-text")
    .innerText


    tasks.forEach(function(task){

        if(task.text === text){

            task.completed =
            !task.completed

        }

    })


    saveTasks()

    renderTasks()

}

function clearAllTasks(){

let answer =

confirm(
"Delete all tasks?"
)


if(answer){

tasks = []

saveTasks()

renderTasks()

}

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

' <button onclick="completeTask(this)">✔</button> ' +

' <button onclick="editTask(this)">✏️</button> ' +

' <button onclick="deleteTask(this)">❌</button>'

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