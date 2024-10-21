import { createTaskForm } from './form';
import { saveTask, deleteTask, displayTasks, loadTasksFromStorage } from './taskManager';

let todayTasks = loadTasksFromStorage();   


export function loadToday() {
    const content = document.querySelector("#content");
    content.textContent = '';  

    
    const heading = document.createElement('h1');
    heading.textContent = "Today's Tasks";

    
    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = "New Task";

    // Task form and display section
    const formElements = createTaskForm();
    const { taskForm } = formElements;

    const displayTaskSection = document.createElement('div');
    displayTaskSection.id = 'displayTask';

   
    content.appendChild(heading);
    content.appendChild(addTaskButton);
    content.appendChild(taskForm);
    content.appendChild(displayTaskSection);

 
    addTaskButton.addEventListener('click', () => {
        taskForm.style.display = 'block';
    });

    // Handle task saving
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        // Gather form data
        const taskData = {
            name: formElements.taskNameInput.value,
            description: formElements.descriptionInput.value,
            project: formElements.projectSelect.value,
            dueDate: formElements.calendarInput.value,
            priority: formElements.prioritySelect.value
        };

        // **CONSOLE LOGS FOR DEBUGGING**

        // Log before saving task
        console.log("Today Tasks before save:", todayTasks);

        // Save task in array and localStorage
        saveTask(todayTasks, taskData);  

        // Log after saving task
        console.log("Today Tasks after save:", todayTasks);

        // Hide the task form after saving
        taskForm.style.display = 'none';

        // Optionally reset the form fields after saving
        taskForm.reset();

   
        displayTasks(displayTaskSection, todayTasks, (index) => {
            deleteTask(todayTasks, index);  
            displayTasks(displayTaskSection, todayTasks, deleteTask);
        });
    });

    // Initially display saved tasks
    displayTasks(displayTaskSection, todayTasks, (index) => {
        deleteTask(todayTasks, index);  
        displayTasks(displayTaskSection, todayTasks, deleteTask);
    });
}

export function loadTodayTasks() {
    const tasks = localStorage.getItem('todayTasks');
    return tasks ? JSON.parse(tasks) : [];
}


 