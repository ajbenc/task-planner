import { loadTodayTasks } from './today';  // Load today's tasks from localStorage
import { loadUpcomingTasks } from './upcoming';  // Load upcoming tasks
import { getProjectsArray, loadProjectTasks } from './projects';  // Load project tasks

export function loadBoard() {
    const content = document.querySelector("#content");
    content.textContent = '';  

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

    // Load tasks from different modules
    const todayTasks = loadTodayTasks().map(task => ({ ...task, source: 'today' }));  // Load today's tasks with source property
    const upcomingTasks = loadUpcomingTasks().map(task => ({ ...task, source: 'upcoming' }));  // Load upcoming tasks with source property
    const projectTasks = getAllProjectTasks().map(task => ({ ...task, source: 'project', projectName: task.projectName }));  // Load project tasks with source property

    // Combine all tasks into one array
    const allTasks = [...todayTasks, ...upcomingTasks, ...projectTasks];

    // Display all tasks on the board
    displayTasksOnBoard(allTasks, taskDisplaySection);

    // Update the task counter
    updateTaskCounter(allTasks.length);
}

// Function to get tasks from all projects
function getAllProjectTasks() {
    const projects = getProjectsArray();
    let projectTasks = [];

    projects.forEach(project => {
        const tasks = loadProjectTasks(project.name);  // Load tasks per project
        projectTasks = [...projectTasks, ...tasks];    // Append tasks to the projectTasks array
    });

    return projectTasks;
}

// Function to display tasks on the board
function displayTasksOnBoard(tasksArray, taskDisplaySection) {
    taskDisplaySection.textContent = '';  // Clear previous task display

    tasksArray.forEach((task, index) => {
        if (task && task.name && task.dueDate) {  // Ensure task has essential details
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');

            const taskName = document.createElement('h3');
            taskName.textContent = task.name;

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.description ? `Description: ${task.description}` : '';

            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = `Due Date: ${task.dueDate}`;

            const taskPriority = document.createElement('p');
            taskPriority.textContent = task.priority ? `Priority: ${task.priority}` : 'Priority: None';

            // Add a Complete Button
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.id = "complete-button";
            completeButton.classList.add('complete-task-btn');

            // Complete button functionality
            completeButton.addEventListener('click', () => {
                completeTask(index, tasksArray, task, taskDisplaySection);  // Mark task as complete
            });

            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDescription);
            taskDiv.appendChild(taskDueDate);
            taskDiv.appendChild(taskPriority);
            taskDiv.appendChild(completeButton);

            taskDisplaySection.appendChild(taskDiv);
        }
    });
}

// Function to handle task completion
function completeTask(index, tasksArray, task, taskDisplaySection) {
    // Remove task from the tasks array
    tasksArray.splice(index, 1);

    // Update the relevant source based on the task's origin
    if (task.source === 'today') {
        updateTodayTasks(tasksArray);  // Update today tasks
    } else if (task.source === 'upcoming') {
        updateUpcomingTasks(tasksArray);  // Update upcoming tasks
    } else if (task.source === 'project') {
        updateProjectTasks(task.projectName, tasksArray);  // Update project tasks
    }

    // Re-display the remaining tasks
    displayTasksOnBoard(tasksArray, taskDisplaySection);

    // Update the task counter after deletion
    updateTaskCounter(tasksArray.length);
}

// Helper function to update today's tasks in localStorage
function updateTodayTasks(todayTasks) {
    localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
}

// Helper function to update upcoming tasks in localStorage
function updateUpcomingTasks(upcomingTasks) {
    localStorage.setItem('upcomingTasks', JSON.stringify(upcomingTasks));
}

// Helper function to update project tasks in localStorage
function updateProjectTasks(projectName, tasksArray) {
    const projects = getProjectsArray();
    const project = projects.find(p => p.name === projectName);
    
    if (project) {
        project.tasks = tasksArray;   
        localStorage.setItem('projects', JSON.stringify(projects));   
    }
}

// Function to update the task counter
function updateTaskCounter(count) {
    const taskCounter = document.querySelector('#taskCounter');
    taskCounter.textContent = `${count} task${count === 1 ? '' : 's'}`;  // Correct pluralization
}
