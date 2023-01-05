var formEl = document.querySelector("#task-form");
var taskToDoEl =  document.querySelector("#tasks-to-do");

var createTaskHandler = function (event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);
    
    // create list Element
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML to the div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3> <span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);
    console.dir(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler)