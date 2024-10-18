import { createTaskForm } from "./form";
import { saveTask, deleteTask, displayTasks, loadTasksFromStorage } from "./taskManager";

let upcomingTasks = loadTasksFromStorage().filter(task => new Date(task.dueDate) > new Date());

export function loadComing() {

    const content = document.querySelector("#content");
    content.textContent = '';

    const heading = document.createElement('h1');
    heading.textContent = "Upcoming Tasks";

    const addTaskButton = document.createElement('button');
    addTaskButton.textContent = "New Task";

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

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
    

     const taskData = {
        name: formElements.taskNameInput.value,
        description: formElements.descriptionInput.value,
        project: formElements.projectSelect.value,
        dueDate: formElements.calendarInput.value,
        priority: formElements.prioritySelect.value
    };

    console.log("Upcoming Tasks before save:", upcomingTasks);

    saveTask(upcomingTasks, taskData);

    console.log("Upcoming Tasks after save:", upcomingTasks);
    taskForm.style.display = 'none';
    taskForm.reset();

    displayTasks(displayTaskSection, upcomingTasks, (index) => {
        deleteTask(upcomingTasks, index);
        displayTasks(displayTaskSection, upcomingTasks, deleteTask);
    });
});  

displayTasks(displayTaskSection, upcomingTasks, (index) => {
deleteTask(upcomingTasks, index);
displayTasks(displayTaskSection, upcomingTasks, deleteTask);
});

}