//
var lowTasks=JSON.parse(localStorage.getItem("lowTasks")) || [] ; // Array to store low priority tasks
var mediumTasks=JSON.parse(localStorage.getItem("mediumTasks")) || []; // Array to store medium priority tasks
var highTasks=JSON.parse(localStorage.getItem("highTasks")) || []; // Array to store high priority tasks
// localStorage.clear(); // Clear localStorage for testing purposes
window.onload = function() {
    if(lowTasks.length > 0 || mediumTasks.length > 0 || highTasks.length > 0) {
        viewTasks(); // Call the function to view tasks on page load
    }
    else{
        const template=document.getElementById("main-template");
        template.style.display='flex'; 
        template.querySelector('.task-details').querySelector('.task-name').innerText='No tasks available';
        template.querySelector('.task-date').querySelector('.task-day').innerText='-';
        template.querySelector('.task-date').querySelector('.task-month').innerText='-';
        template.querySelector('.task-date').querySelector('.task-year').innerText='-';
        template.querySelector('.task-details').querySelector('.task-priority').innerText='-';
        template.querySelector('.task-details').querySelector('.task-priority').style.color='black';
    }
}


const addButton=document.getElementById('add-task');
addButton.addEventListener('click',()=>{
    const form=document.getElementById('overlay');
    const body=document.getElementById('body');
    const side=document.getElementById('side');
    body.style.filter='blur(5px)';
    side.style.filter='blur(5px)';
    form.style.zIndex='1000';
    form.style.display='block';
});
const cancelButton=document.getElementById('cancel');
cancelButton.addEventListener('click',()=>{
    const form=document.getElementById('overlay');
    const body=document.getElementById('body');
    const side=document.getElementById('side');
    body.style.filter='none';
    side.style.filter='none';
    form.style.zIndex='-1';
    form.style.display='none';
});
const menuButton=document.getElementById('side-icon');
menuButton.addEventListener('click',()=>{
   sideDisplay();
});
function sideDisplay() {
    const side = document.getElementById('side-main');
    const body = document.getElementById('task-container');

    const sideDisplay = window.getComputedStyle(side).display;
    if (sideDisplay === 'block') {
        side.style.display = 'none';
        body.style.display = 'flex';
        body.style.zIndex = '1';
        body.style.filter = 'none';
        body.style.pointerEvents = 'auto';
    } else {
        side.style.display = 'block';
        body.style.filter = "blur(7px)";
        body.style.pointerEvents = 'none';
        body.style.zIndex = '-1';
    }
}
const date_n=document.getElementById('date');
const month_n=document.getElementById('month');
const year_n=document.getElementById('year');
const today=new Date();
date_n.innerText=today.getDate();
month_n.innerText=today.toLocaleString('default', { month: 'long' });
year_n.innerText=today.getFullYear();

const addTaskButton=document.getElementById('add');
addTaskButton.addEventListener('click',()=>{
    const taskInput=document.getElementById('task-input');
    
    if(taskInput.value){
        const taskText=taskInput.value.trim();
        const priorityInput=document.getElementById('priority');
        
        priorityInput.addEventListener('change',()=>{
        priorityValue=priorityInput.value;
        });
        if(priorityInput.value){
            const dueDateInput=document.getElementById('due-date');
            var dueDateValue=dueDateInput.value;
            if(!dueDateValue){
                const today=new Date();
                date_n.innerText=today.getDate();
                month_n.innerText=today.toLocaleString('default', { month: 'long' });
                year_n.innerText=today.getFullYear();
                dueDateValue=today;
            }
        }
        else{
            priorityInput.value='low'; // Default priority if not set
        }
        if(priorityInput.value==='low'){
            lowTasks.push({"task": taskText, "dueDate": dueDateValue, "completed": false});
        }
        else if(priorityInput.value==='medium'){
            mediumTasks.push({"task": taskText, "dueDate": dueDateValue, "completed": false});
        }
        else if(priorityInput.value==='high'){
            highTasks.push({"task": taskText, "dueDate": dueDateValue, "completed": false});
        }
        localStorage.setItem('lowTasks', JSON.stringify(lowTasks));
        localStorage.setItem('mediumTasks', JSON.stringify(mediumTasks));
        localStorage.setItem('highTasks', JSON.stringify(highTasks));
        console.log('Task added:', taskText, 'Priority:', priorityInput.value, 'Due Date:', dueDateValue);
        taskInput.value = ''; // Clear the input field
        cancelButton.click(); // Close the form
        viewTasks(); // Call the function to view tasks after adding a new task
        
    } else {
        alert('Please enter a task.');
    }
});

const all= document.getElementById('all');
all.addEventListener('click', () => {
    viewTasks('all'); // View all tasks
    sideDisplay(); // Close the side menu
    
});
const completed= document.getElementById('completed');
completed.addEventListener('click', () => {
    
    viewTasks('completed'); // View all tasks
    sideDisplay(); // Close the side menu
});
const overdue = document.getElementById('overdue');
overdue.addEventListener('click', () => {
    viewTasks('overdue'); // View overdue tasks
    sideDisplay(); // Close the side menu
});
const upcoming = document.getElementById('upcoming');
upcoming.addEventListener('click', () => {
    viewTasks('upcoming'); // View upcoming tasks
    sideDisplay(); // Close the side menu
});
const todayTasks = document.getElementById('today');
todayTasks.addEventListener('click', () => {
    viewTasks('today'); // View tasks due today
    sideDisplay(); // Close the side menu
});
const deleteAll = document.getElementById('delete');
deleteAll.addEventListener('click', () => {
    let ans=confirm("Are you sure you want to delete all tasks?");
    if(ans) {
        localStorage.removeItem('lowTasks'); // Clear low priority tasks
        localStorage.removeItem('mediumTasks'); // Clear medium priority tasks
        localStorage.removeItem('highTasks'); // Clear high priority tasks
        lowTasks = []; // Reset low priority tasks array
        mediumTasks = []; // Reset medium priority tasks array
        highTasks = []; // Reset high priority tasks array
        console.log('All tasks deleted');
        window.location.reload(); // Reload the page to reflect changes
    } else {
        console.log('Deletion cancelled');
    }
});

function viewTasks(viewBy) {
    
    lowTasks = JSON.parse(localStorage.getItem('lowTasks')) || [];
    mediumTasks = JSON.parse(localStorage.getItem('mediumTasks')) || [];
    highTasks = JSON.parse(localStorage.getItem('highTasks')) || [];
    console.log('Low Tasks:', lowTasks);
    console.log('Medium Tasks:', mediumTasks);  
    console.log('High Tasks:', highTasks);
    lowTask_sorted = lowTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    highTask_sorted = highTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    mediumTask_sorted = mediumTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    switch(viewBy) {
        case 'all':
            //everything equal to itself
            lowTask_sorted = lowTasks; // No filtering, show all low priority tasks
            mediumTask_sorted = mediumTasks; // No filtering, show all medium priority tasks
            highTask_sorted = highTasks; // No filtering, show all high priority tasks
            break;
        case 'completed':
            lowTask_sorted = lowTask_sorted.filter(task => task.completed); // Filter completed tasks
            mediumTask_sorted = mediumTask_sorted.filter(task => task.completed); // Filter completed tasks
            highTask_sorted = highTask_sorted.filter(task => task.completed); // Filter completed tasks
            break;
        case 'overdue':
            const today2 = new Date();
            lowTask_sorted=lowTasks.filter(task => new Date(task.dueDate) < today2 && !task.completed); // Filter overdue tasks
            mediumTask_sorted=mediumTasks.filter(task => new Date(task.dueDate) < today2 && !task.completed); // Filter overdue tasks
            highTask_sorted=highTasks.filter(task => new Date(task.dueDate) < today2 && !task.completed); // Filter overdue tasks
            break;
        case 'upcoming':
            const today = new Date();
            lowTask_sorted=lowTasks.filter(task => new Date(task.dueDate) > today && !task.completed); // Filter overdue tasks
            mediumTask_sorted=mediumTasks.filter(task => new Date(task.dueDate)> today && !task.completed); // Filter overdue tasks
            highTask_sorted=highTasks.filter(task => new Date(task.dueDate)> today && !task.completed); // Filter overdue tasks
            break;
        case 'today':
            let todayDate = new Date();
            lowTask_sorted = lowTasks.filter(task => new Date(task.dueDate).toDateString()=== todayDate.toDateString() && !task.completed); // Filter tasks due today
            mediumTask_sorted = mediumTasks.filter(task => new Date(task.dueDate).toDateString() === todayDate.toDateString() && !task.completed); // Filter tasks due today
            highTask_sorted = highTasks.filter(task => new Date(task.dueDate).toDateString() === todayDate.toDateString() && !task.completed); // Filter tasks due today
            break;
        default:
            lowTask_sorted=lowTask_sorted.filter(task => !task.completed); // Filter out completed tasks
            mediumTask_sorted=mediumTask_sorted.filter(task => !task.completed); // Filter out completed tasks
            highTask_sorted=highTask_sorted.filter(task => !task.completed); // Filter out completed tasks
            break;
    }
            //
    const template=document.getElementById("main-template");
    const taskContainer=document.getElementById("task-container");
    taskContainer.querySelectorAll('.added-task').forEach(task => {
        task.remove(); // Remove all previously added tasks
    });
    //if there are no tasks, display a message
    if(lowTask_sorted.length > 0 || mediumTask_sorted.length > 0 || highTask_sorted.length > 0) {
       template.style.display='none'; // Hide the template if there are tasks
    }
    else{
        const template=document.getElementById("main-template");
        template.style.display='flex'; 
        template.querySelector('.task-details').querySelector('.task-name').innerText='No tasks available';
        template.querySelector('.task-date').querySelector('.task-day').innerText='-';
        template.querySelector('.task-date').querySelector('.task-month').innerText='-';
        template.querySelector('.task-date').querySelector('.task-year').innerText='-';
        template.querySelector('.task-details').querySelector('.task-priority').innerText='-';
        template.querySelector('.task-details').querySelector('.task-priority').style.color='black';
       
    }
   
    
    highTask_sorted.forEach(element => {
        let taskElement = template.cloneNode(true);
        taskElement.classList.add("added-task"); // Add a class to the cloned element
        taskContainer.appendChild(taskElement); // Append the cloned element to the template
        taskElement.id = ''; // Clear the id to avoid duplicates
        let taskDetails = taskElement.querySelector('.task-details');
        let taskDate = taskElement.querySelector('.task-date');
        let taskText = taskDetails.querySelector('.task-name');
        let taskPriority = taskDetails.querySelector('.task-priority');
        let taskDay= taskDate.querySelector('.task-day');
        let taskMonth = taskDate.querySelector('.task-month');
        let taskYear = taskDate.querySelector('.task-year');
        taskText.innerText = element.task;
        taskPriority.innerText = 'High';        
        taskPriority.style.color= 'red';
        taskDay.innerText = new Date(element.dueDate).getDate();
        taskMonth.innerText = new Date(element.dueDate).toLocaleString('default', { month: 'long' });
        taskYear.innerText = new Date(element.dueDate).getFullYear();
        taskElement.style.display= 'flex';
        taskElement.style.border= '1.2px solid red';
        let completeButton = taskElement.querySelector('.status'); 
        completeButton.addEventListener('change', () => {
            let ans=confirm("Are you sure you want to mark this task as complete?");
            if(ans) {
                element.completed = true; // Mark the task as completed
                localStorage.setItem('highTasks', JSON.stringify(highTasks)); // Update localStorage
                taskElement.style.display = 'none'; // Hide the task element 
                window.location.reload(); // Reload the page to view the updated tasks         
            } else {
                completeButton.checked = false; // Reset the checkbox if not confirmed
            }            
        });
        if (element.completed) {
            completeButton.checked = true; // Check the checkbox if the task is completed
           completeButton.disabled = true; // Disable the checkbox to prevent further changes
        }
    });
    mediumTask_sorted.forEach(element => {
        let taskElement = template.cloneNode(true); 
        taskElement.classList.add("added-task"); // Add a class to the cloned element
        taskContainer.appendChild(taskElement); // Append the cloned element to the template       
        taskElement.id = ''; // Clear the id to avoid duplicates
        let taskDetails = taskElement.querySelector('.task-details');
        let taskDate = taskElement.querySelector('.task-date');
        let taskText = taskDetails.querySelector('.task-name');
        let taskPriority = taskDetails.querySelector('.task-priority');
        let taskDay= taskDate.querySelector('.task-day');
        let taskMonth = taskDate.querySelector('.task-month');
        let taskYear = taskDate.querySelector('.task-year');
        taskText.innerText = element.task;
        taskPriority.innerText = 'Medium';        
        taskPriority.style.color= 'yellow';
        taskDay.innerText = new Date(element.dueDate).getDate();
        taskMonth.innerText = new Date(element.dueDate).toLocaleString('default', { month: 'long' });
        taskYear.innerText = new Date(element.dueDate).getFullYear();
        taskElement.style.display= 'flex';
        taskElement.style.border= '1px solid yellow';     
        let completeButton = taskElement.querySelector('.status'); 
        completeButton.addEventListener('change', () => {
            let ans=confirm("Are you sure you want to mark this task as complete?");
            if(ans) {
                element.completed = true; // Mark the task as completed
                localStorage.setItem('mediumTasks', JSON.stringify(mediumTasks)); // Update localStorage
                taskElement.style.display = 'none'; // Hide the task element
                window.location.reload(); // Reload the page to view the updated tasks
            } else {
                completeButton.checked = false; // Reset the checkbox if not confirmed
            }            
        });
        if (element.completed) {
            completeButton.checked = true; // Check the checkbox if the task is completed
           completeButton.disabled = true; // Disable the checkbox to prevent further changes
        }
    });
    lowTask_sorted.forEach(element => {
        let taskElement = template.cloneNode(true);   
        taskElement.classList.add("added-task"); // Add a class to the cloned element
        taskContainer.appendChild(taskElement); // Append the cloned element to the template     
        taskElement.id = ''; // Clear the id to avoid duplicates
        let taskDetails = taskElement.querySelector('.task-details');
        let taskDate = taskElement.querySelector('.task-date');
        let taskText = taskDetails.querySelector('.task-name');
        let taskPriority = taskDetails.querySelector('.task-priority');
        let taskDay= taskDate.querySelector('.task-day');
        let taskMonth = taskDate.querySelector('.task-month');
        let taskYear = taskDate.querySelector('.task-year');
        taskText.innerText = element.task;
        taskPriority.innerText = 'Low';        
        taskPriority.style.color= 'green';
        taskDay.innerText = new Date(element.dueDate).getDate();
        taskMonth.innerText = new Date(element.dueDate).toLocaleString('default', { month: 'long' });
        taskYear.innerText = new Date(element.dueDate).getFullYear();
        taskElement.style.display= 'flex';
        let completeButton = taskElement.querySelector('.status'); 
        completeButton.addEventListener('change', () => {
            let ans=confirm("Are you sure you want to mark this task as complete?");
            if(ans) {
                    element.completed = true; // Mark the task as completed
                localStorage.setItem('lowTasks', JSON.stringify(lowTasks)); // Update localStorage
                taskElement.style.display = 'none'; // Hide the task element       
                window.location.reload(); // Reload the page to view the updated tasks
            } else {
                completeButton.checked = false; // Reset the checkbox if not confirmed
            }            
        });
        if (element.completed) {
            completeButton.checked = true; // Check the checkbox if the task is completed
           completeButton.disabled = true; // Disable the checkbox to prevent further changes
        }
    });
}