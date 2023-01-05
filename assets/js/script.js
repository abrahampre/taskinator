var formEl = document.querySelector("#task-form");
var taskToDoEl =  document.querySelector("#tasks-to-do");

var taskFormHandler = function (event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // package up data as an object 

    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out task form!");
        return false;
    }

    formEl.reset()

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl 

    createTaskEl(taskDataObj)

}

var createTaskEl = function(taskDataObj){
    // create list Element
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML to the div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler)