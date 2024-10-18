export function saveTask(tasksArray, taskData) {
    tasksArray.push(taskData);   
    updateLocalStorage(tasksArray);   
}

export function deleteTask(tasksArray, index) {
    tasksArray.splice(index, 1);   
    updateLocalStorage(tasksArray);   
}

export function displayTasks(tasksDisplay, tasksArray, deleteTaskCallback) {
    tasksDisplay.textContent = ''; 

    tasksArray.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');

        
        const taskName = document.createElement('h3');
        taskName.textContent = task.name;

         
        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description: ${task.description}`;

       
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = `Due Date: ${task.dueDate}`;

       
        const taskPriority = document.createElement('p');
        taskPriority.textContent = `Priority: ${task.priority}`;

        // "Complete" button
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            deleteTaskCallback(index);  
        });

        // Append task info to taskDiv
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDueDate);
        taskDiv.appendChild(taskPriority);
        taskDiv.appendChild(completeButton);

        tasksDisplay.appendChild(taskDiv);
    });
}

function updateLocalStorage(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray)); // Save tasks to localStorage
}

export function loadTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    const parsedTasks = tasks ? JSON.parse(tasks) : [];
    console.log("Loaded tasks:", parsedTasks);  
    return parsedTasks; 
}

