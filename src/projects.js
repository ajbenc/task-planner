import { saveTask, deleteTask, displayTasks } from './taskManager';
import { loadTasksFromStorage } from './taskManager';
import { createTaskForm } from './form';

let projectsArray = [];   

 
export function loadProjects() {
    const content = document.querySelector("#content");
    content.textContent = '';  

    const heading = document.createElement('h1');
    heading.textContent = "Projects";

    const createProjectButton = document.createElement('button');
    createProjectButton.textContent = "Create Project";

    // Project display section
    const projectDisplaySection = document.createElement('div');
    projectDisplaySection.id = 'projectDisplay';

    content.appendChild(heading);
    content.appendChild(createProjectButton);
    content.appendChild(projectDisplaySection);

    // Handle project creation
    createProjectButton.addEventListener('click', () => {
        const projectForm = document.createElement('form');
        const projectNameInput = document.createElement('input');
        projectNameInput.type = 'text';
        projectNameInput.placeholder = 'Project Name';
        projectNameInput.required = true;
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add';

        projectForm.appendChild(projectNameInput);
        projectForm.appendChild(addProjectButton);
        content.insertBefore(projectForm, projectDisplaySection);

        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const projectName = projectNameInput.value.trim();
            if (projectName) {
                createProject(projectName);
                projectForm.remove();  
            }
        });
    });

    // Display any saved projects
    projectsArray.forEach((project, index) => {
        displayProject(projectDisplaySection, project, index);
    });
}

function createProject(projectName) {
    const newProject = { name: projectName, tasks: [] };
    projectsArray.push(newProject);
    updateProjectStorage();
    loadProjects();   
}

function displayProject(container, project, index) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-item');

    const projectNameHeading = document.createElement('h2');
    projectNameHeading.textContent = project.name;

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';

    const taskDisplaySection = document.createElement('div');
    taskDisplaySection.classList.add('task-display');

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.textContent = 'Delete Project';

    projectDiv.appendChild(projectNameHeading);
    projectDiv.appendChild(addTaskButton);
    projectDiv.appendChild(taskDisplaySection);
    projectDiv.appendChild(deleteProjectButton);
    container.appendChild(projectDiv);

    // Task form from form.js
    const formElements = createTaskForm();
    const { taskForm } = formElements;
    taskForm.style.display = 'none';   
    projectDiv.insertBefore(taskForm, taskDisplaySection);   

    // Show task form when "Add Task" is clicked
    addTaskButton.addEventListener('click', () => {
        taskForm.style.display = 'block';  // Display the form
    });

    // Handle task addition for each project
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskData = {
            name: formElements.taskNameInput.value,
            description: formElements.descriptionInput.value,
            project: project.name,  
            dueDate: formElements.calendarInput.value,
            priority: formElements.prioritySelect.value
        };

        saveTask(project.tasks, taskData);   
        displayTasks(taskDisplaySection, project.tasks, (taskIndex) => {
            deleteTask(project.tasks, taskIndex);
            displayTasks(taskDisplaySection, project.tasks, deleteTask);
        });

        taskForm.reset();  
        taskForm.style.display = 'none';  
    });

    // Display tasks for this project
    displayTasks(taskDisplaySection, project.tasks, (taskIndex) => {
        deleteTask(project.tasks, taskIndex);
        displayTasks(taskDisplaySection, project.tasks, deleteTask);
    });

    // Handle project deletion
    deleteProjectButton.addEventListener('click', () => {
        projectsArray.splice(index, 1);   
        updateProjectStorage();
        loadProjects();  
    });
}

// Save projects to localStorage
function updateProjectStorage() {
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

// Load projects from localStorage
export function loadProjectsFromStorage() {
    const storedProjects = localStorage.getItem('projects');
    projectsArray = storedProjects ? JSON.parse(storedProjects) : [];
}

 

export function loadProjectTasks() {
    const allTasks = loadTasksFromStorage();   

    const projectTasks = allTasks.filter(task => task.project === 'ProjectName'); 
    return projectTasks;  
}