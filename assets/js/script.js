var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskToDoEl =  document.querySelector("#tasks-to-do");
var tasksInProgress =  document.querySelector("#tasks-in-progress");
var tasksCompleted = document.querySelector("#tasks-completed");
var tasks = [];

 
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
            type: taskTypeInput, 
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }

}

var createTaskEl = function(taskDataObj){
    console.log(taskDataObj);
    console.log(taskDataObj.status);

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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();

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

    // loop through task array and task object with new content

    for (var i = 0; i<tasks.length; i++){
        if(tasks[i].id === parseInt(taskID)){
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    saveTasks();

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
    // create an updated task array 
    var updatedTaskArr = [];

    // loop through current tasks

    for (var i = 0 ; i <tasks.length ; i++){
        // if tasks[i].id doesnt match the value of taskId, lets keep that task and push into the new array
        if(task[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;

    saveTasks();

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

    // update tasks in task arrays 

    for(var i = 0; i<tasks.length; i++){
        if(tasks[i].id === parseInt (taskId)){
            tasks[i].status = statusValue
        }
    }
    console.log(tasks);

    saveTasks();

}

var saveTasks = function(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


var loadTasks = function(){
    // load the array and convert to objects
    var storedTasks = localStorage.getItem("tasks" ,tasks)
    console.log(storedTasks);
    //  input the objects on the DOM

    tasks =  JSON.parse(storedTasks);
    console.log(tasks)
    console.log(tasks[0].name)

    for(i=0; i<tasks.length ; i++){
        console.log(tasks[i]);
        console.log(tasks[i].id)
        taskIdCounter = tasks[i].id

        var listItemEl = document.createElement("li");
        listItemEl.setAttribute("data-task-id", taskIdCounter);
        listItemEl.className="task-item";
        console.log(listItemEl);

        var taskInfoEl =  document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML =  "<h3 class='task-name'>" + tasks[i].name + "</h3> <span class='task-type'>" + tasks[i].type + "</span>";
        
        listItemEl.appendChild(taskInfoEl);


        taskActionsEl = createTaskActions(tasks[i].id);

        listItemEl.appendChild(taskActionsEl);
        console.log(listItemEl);

        if (tasks[i].status === "to do"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            taskToDoEl.appendChild(listItemEl);
            console.log(listItemEl);
        }
        else if(tasks[i].status === "in progress"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgress.appendChild(listItemEl);
        }
        else if(tasks[i].status === "completed"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompleted.appendChild(listItemEl);
        }
        console.log(listItemEl)
    }
    taskIdCounter++
    console.log(taskIdCounter)
}

loadTasks();

pageContentEl.addEventListener("click",taskButtonHandler)
formEl.addEventListener("submit", taskFormHandler)
pageContentEl.addEventListener("change", taskStatusChangeHandler)