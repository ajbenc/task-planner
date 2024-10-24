import { saveTask, deleteTask, displayTasks, loadTasksFromStorage } from './taskManager';
import { createTaskForm } from './form';
import { getProjectsArray } from './projects';  


let todayTasks = loadTodayTasks();  // Load tasks from localStorage on startup

export function loadToday() {
    const content = document.querySelector("#content");
    content.textContent = '';   

    const heading = document.createElement('h1');
    heading.textContent = "Today's Tasks";

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = "New Task";
    addTaskButton.id = "new-task";

    const formElements = createTaskForm();
    const { taskForm, projectSelect } = formElements;

    const displayTaskSection = document.createElement('div');
    displayTaskSection.id = 'displayTask';

    content.appendChild(heading);
    content.appendChild(addTaskButton);
    content.appendChild(displayTaskSection);

    // Create and style the overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.display = 'none'; // Initially hidden

    // Append overlay and form to the body
    document.body.appendChild(overlay);
    document.body.appendChild(taskForm); // Append form to body so it layers correctly

    // Style the task form to make it look like a modal
    taskForm.className = 'modal-form';
    taskForm.style.display = 'none';  // Hide initially

    // Handle the "New Task" button click to display the task form
    addTaskButton.addEventListener('click', () => {
        taskForm.style.display = 'block';  
        overlay.style.display = 'block'; // Show overlay

        // Clear previous project options except the first one
        while (projectSelect.options.length > 1) {
            projectSelect.remove(1);
        }

        // Populate the project dropdown with the current projects
        const projectsArray = getProjectsArray();  
        projectsArray.forEach(project => {
            const projectOption = document.createElement('option');
            projectOption.value = project.name;
            projectOption.textContent = project.name;
            projectSelect.appendChild(projectOption);
        });
    });

    // Handle task form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get task data from the form
        const taskData = {
            name: formElements.taskNameInput.value,
            description: formElements.descriptionInput.value,
            project: formElements.projectSelect.value || "None",  // Assign to a project if selected, otherwise "None"
            dueDate: formElements.calendarInput.value,
            priority: formElements.prioritySelect.value
        };

        // Save the task to todayTasks and localStorage
        saveTodayTask(todayTasks, taskData);  // Save task in localStorage

        // Hide and reset the task form after submission
        taskForm.style.display = 'none';
        overlay.style.display = 'none'; // Hide overlay
        taskForm.reset();

        // Update the displayed task list
        displayTasks(displayTaskSection, todayTasks, (index) => {
            deleteTask(todayTasks, index);  // Handle task deletion
            displayTasks(displayTaskSection, todayTasks);  // Refresh task display
        });
    });

    // Initial display of tasks when loading the module
    displayTasks(displayTaskSection, todayTasks, (index) => {
        deleteTask(todayTasks, index);  // Handle task deletion
        displayTasks(displayTaskSection, todayTasks);  // Refresh task display
    });
}

// Function to load today's tasks from localStorage
export function loadTodayTasks() {
    const tasks = localStorage.getItem('todayTasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to save today's tasks to localStorage
export function saveTodayTask(todayTasks, taskData) {
    todayTasks.push(taskData);
    localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
}

function updateTodayTasks(todayTasks) {
    localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
}
