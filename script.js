const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

let currentEditIndex = -1;
let tasks = [];

addBtn.addEventListener("click", addTask);

searchInput.addEventListener("keyup", displayTasks);

function addTask(){

    const text = taskInput.value.trim();

    if(text===""){

        alert("Please enter a task");
        return;

    }

    tasks.push({

        name:text,
        completed:false

    });

    taskInput.value="";

    displayTasks();

}

function displayTasks(){

    taskList.innerHTML="";

    const search = searchInput.value.toLowerCase();

    tasks.forEach((task,index)=>{

        if(!task.name.toLowerCase().includes(search))
        return;

        const li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

        <input type="checkbox"
        ${task.completed ? "checked":""}
        onchange="toggleTask(${index})">

        <span class="task-text">${task.name}</span>

        <div class="actions">

            <button class="edit"
            onclick="editTask(${index})">
            Edit
            </button>

            <button class="delete"
            onclick="deleteTask(${index})">
            Delete
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateCounter();

}

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    displayTasks();

}

function editTask(index){

     currentEditIndex = index;

    editInput.value = tasks[index].name;

    editModal.style.display = "flex";

    editInput.focus();

}
saveEdit.addEventListener("click", () => {

    const newTask = editInput.value.trim();

    if(newTask !== ""){

        tasks[currentEditIndex].name = newTask;

        displayTasks();
    }

    editModal.style.display = "none";

});

cancelEdit.addEventListener("click", () => {

    editModal.style.display = "none";

});

function deleteTask(index){

    tasks.splice(index,1);

    displayTasks();

}

function updateCounter(){

    let total=tasks.length;

    let completed=tasks.filter(task=>task.completed).length;

    totalTasks.innerText=total;

    completedTasks.innerText=completed;

    pendingTasks.innerText=total-completed;

}