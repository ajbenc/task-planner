import { createTaskForm } from "./form";
import { saveTask, deleteTask, displayTasks, loadTasksFromStorage } from "./taskManager";
import { getProjectsArray } from "./projects";   

let upcomingTasks = loadUpcomingTasks();   

export function loadComing() {
    const content = document.querySelector("#content");
    content.textContent = '';  

    const heading = document.createElement('h1');
    heading.textContent = "Upcoming Tasks";

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

    taskForm.className = 'modal-form';
    taskForm.style.display = 'none';

    addTaskButton.addEventListener('click', () => {
        taskForm.style.display = 'block';  
        overlay.style.display = 'block'; // Show overlay (blurry effect)

        while (projectSelect.options.length > 1) {
            projectSelect.remove(1);
        }

        const projectsArray = getProjectsArray();
        projectsArray.forEach(project => {
            const projectOption = document.createElement('option');
            projectOption.value = project.name;
            projectOption.textContent = project.name;
            projectSelect.appendChild(projectOption);
        });
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const taskData = {
            name: formElements.taskNameInput.value,
            description: formElements.descriptionInput.value,
            project: formElements.projectSelect.value || "None",  
            dueDate: formElements.calendarInput.value,
            priority: formElements.prioritySelect.value
        };
    
        console.log("Upcoming Tasks before save:", upcomingTasks);
        saveTask(upcomingTasks, taskData, 'upcoming');  // Save as 'upcomingTasks'
    
        console.log("Upcoming Tasks after save:", upcomingTasks);
        taskForm.style.display = 'none';
        overlay.style.display = 'none'; // Hide overlay (remove blurry effect)
        taskForm.reset();

        displayTasks(displayTaskSection, upcomingTasks, (index) => {
            deleteTask(upcomingTasks, index);  
            displayTasks(displayTaskSection, upcomingTasks);  
        });
    });

    // Display tasks when the upcoming module loads
    displayTasks(displayTaskSection, upcomingTasks, (index) => {
        deleteTask(upcomingTasks, index);
        displayTasks(displayTaskSection, upcomingTasks);
    });
}

export function loadUpcomingTasks() {
    const tasks = loadTasksFromStorage();   
    const today = new Date();

    return tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate > today;  
    });
}

function updateUpcomingTasks(upcomingTasks) {
    localStorage.setItem('upcomingTasks', JSON.stringify(upcomingTasks));
}
