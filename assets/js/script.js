var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskToDoEl =  document.querySelector("#tasks-to-do");
var tasksInProgress =  document.querySelector("#tasks-in-progress");
var tasksCompleted = document.querySelector("#tasks-completed");
 
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

    var isEdit = formEl.hasAttribute("data-task-id");

    // gas data attribute, so get task id call function to complete edit process 
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeInput,taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function

    else{
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }

}

var createTaskEl = function(taskDataObj){
    // create list Element
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute 

    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML to the div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3> <span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    taskToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id 

    taskIdCounter++;
}

var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button 
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent ="Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button 

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create select drop down 
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i=0 ; i<statusChoices.length; i++){
        // create option element 
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        // append to Select 
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}

var completeEditTask = function(taskName, taskType, taskId){
    console.log(taskName, taskType, taskId);

    // find the matching task list item 
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    // set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated")

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task"
};

var taskButtonHandler = function(event){
    console.log(event.target);

    // get target element from even 

    var targetEl = event.target

    // edit button was clicked 

    if(targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked 

    else if(event.target.matches(".delete-btn")){
        // get elements task-id 
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

var editTask = function(taskId){
    console.log("editing task #" + taskId);

    // gettask list item element 
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value =taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function(taskId){
   console.log(taskId);
   var taskSelected =document.querySelector(".task-item[data-task-id='" + taskId +"']");
   console.log(taskSelected);
   taskSelected.remove();
}

var taskStatusChangeHandler = function(event){
    console.log(event.target)
    // get the task items id 
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected options value and convert it to lowercase 

    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id 

    var taskSelected = document.querySelector(".task-item[data-task-id='" +taskId+ "']");

    if (statusValue === "to do"){
        taskToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgress.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompleted.appendChild(taskSelected);
    }

}


pageContentEl.addEventListener("click",taskButtonHandler)
formEl.addEventListener("submit", taskFormHandler)
pageContentEl.addEventListener("change", taskStatusChangeHandler)