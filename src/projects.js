import { saveTask, deleteTask, displayTasks, loadTasksFromStorage } from './taskManager';
import { createTaskForm } from './form';

let projectsArray = [];   

 
loadProjectsFromStorage();

export function getProjectsArray() {
    return projectsArray;
}

export function loadProjects() {
    const content = document.querySelector("#content");
    content.textContent = '';   

    const heading = document.createElement('h1');
    heading.textContent = "Projects";

    const createProjectButton = document.createElement('button');
    createProjectButton.textContent = "Create Project";
    createProjectButton.id = "create-project";

    // Project display section
    const projectDisplaySection = document.createElement('div');
    projectDisplaySection.id = 'projectDisplay';

    content.appendChild(heading);
    content.appendChild(createProjectButton);
    content.appendChild(projectDisplaySection);

 
    createProjectButton.addEventListener('click', () => {
        const projectForm = document.createElement('form');
        const projectNameInput = document.createElement('input');
        projectNameInput.type = 'text';
        projectNameInput.placeholder = 'Project Name';
        projectNameInput.required = true;
        const addProjectButton = document.createElement('button');
        addProjectButton.textContent = 'Add';
        addProjectButton.id = "add-project";

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

    // Display saved projects
    projectsArray.forEach((project, index) => {
        displayProject(projectDisplaySection, project, index);
    });
}

function createProject(projectName) {
    const newProject = { name: projectName, tasks: [] };
    projectsArray.push(newProject);  
    updateProjectStorage();   
    displayProject(document.getElementById('projectDisplay'), newProject, projectsArray.length - 1);
}

function saveTaskToProject(projectName, taskData) {
    const project = projectsArray.find(proj => proj.name === projectName);
    if (project) {
        project.tasks.push(taskData);   
        updateProjectStorage();
    }
}


function displayProject(container, project, index) {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-item');

    const projectNameHeading = document.createElement('h2');
    projectNameHeading.textContent = project.name;

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task';
    addTaskButton.id = "add-task"

    const taskDisplaySection = document.createElement('div');
    taskDisplaySection.classList.add('task-display');

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.textContent = 'Delete Project';
    deleteProjectButton.id ="delete-project"

    projectDiv.appendChild(projectNameHeading);
    projectDiv.appendChild(addTaskButton);
    projectDiv.appendChild(taskDisplaySection);
    projectDiv.appendChild(deleteProjectButton);
    container.appendChild(projectDiv);

   
    const formElements = createTaskForm();
    const { taskForm } = formElements;
    taskForm.style.display = 'none';  
    projectDiv.insertBefore(taskForm, taskDisplaySection);   

 
    addTaskButton.addEventListener('click', () => {
        taskForm.style.display = taskForm.style.display === 'none' ? 'block' : 'none';   
    });

    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const taskData = {
            name: formElements.taskNameInput.value,
            description: formElements.descriptionInput.value,
            project: project.name,  
            dueDate: formElements.calendarInput.value,
            priority: formElements.prioritySelect.value
        };
    
        // Save the task specifically to the selected project
        saveTaskToProject(project.name, taskData);
    
        // Display updated tasks for this project only
        displayTasks(taskDisplaySection, project.tasks, (taskIndex) => {
            deleteTask(project.tasks, taskIndex);
            displayTasks(taskDisplaySection, project.tasks);
        });
    
        taskForm.reset();
        taskForm.style.display = 'none';
    });
    

    
    displayTasks(taskDisplaySection, project.tasks, (taskIndex) => {
        deleteTask(project.tasks, taskIndex);
        displayTasks(taskDisplaySection, project.tasks);
    });

     
    deleteProjectButton.addEventListener('click', () => {
        projectsArray.splice(index, 1);   
        updateProjectStorage();
        projectDiv.remove();   
    });
}

 
function updateProjectStorage() {
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

 
export function loadProjectsFromStorage() {
    const storedProjects = localStorage.getItem('projects');
    projectsArray = storedProjects ? JSON.parse(storedProjects) : [];
}

export function loadProjectTasks(projectName) {
    const allTasks = loadTasksFromStorage();   
    return allTasks.filter(task => task.project === projectName);   
}
