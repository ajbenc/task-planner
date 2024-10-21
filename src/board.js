import { loadTasksFromStorage } from './taskManager';
import { loadTodayTasks } from './today';               
import { loadUpcomingTasks } from './upcoming';         
import { loadProjectTasks } from './projects';         
import { createTaskForm } from './form';  // Import the form module

export function loadBoard() {
    const content = document.querySelector("#content");
    if (!content) {
        console.error("#content element is missing from the DOM");
        return;
    }

    content.textContent = '';  // Clear the content

    const headingHome = document.createElement('h1');
    headingHome.textContent = 'Board'; 
    content.appendChild(headingHome);

    const taskCounter = document.createElement('p');
    taskCounter.id = 'taskCounter';
    taskCounter.textContent = '0 tasks'; 
    content.appendChild(taskCounter);

    const taskDisplaySection = document.createElement('div');
    taskDisplaySection.id = 'taskDisplaySection'; 
    content.appendChild(taskDisplaySection);

    const newTaskButton = document.createElement('button');
    newTaskButton.textContent = 'New Task';  
    content.appendChild(newTaskButton);

    
    const { taskForm } = createTaskForm();
    content.appendChild(taskForm);
    taskForm.style.display = 'none';

    const todayTasks = loadTodayTasks() || [];   
    const upcomingTasks = loadUpcomingTasks() || [];
    const projectTasks = loadProjectTasks() || [];

    const allTasks = [...todayTasks, ...upcomingTasks, ...projectTasks];  // Merge all tasks safely

    displayTasksOnBoard(allTasks, taskDisplaySection);
    updateTaskCounter(allTasks.length);

      newTaskButton.addEventListener('click', () => {
        if (taskForm.style.display === 'none') {
            taskForm.style.display = 'block';   
        } else {
            taskForm.style.display = 'none';   
        }
    });
}

function displayTasksOnBoard(tasksArray, taskDisplaySection) {
    taskDisplaySection.textContent = '';

    tasksArray.forEach(task => {
        if (task && task.name && task.dueDate) {  
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');

            const taskName = document.createElement('h3');
            taskName.textContent = task.name;

            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = `Due: ${task.dueDate}`;

            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDueDate);
            taskDisplaySection.appendChild(taskDiv);
        } else {
            console.error("Task data is invalid:", task);   
        }
    });
}

function updateTaskCounter(count) {
    const taskCounter = document.querySelector('#taskCounter');
    taskCounter.textContent = `${count} tasks`;
}
