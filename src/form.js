export function createTaskForm() {
    const taskForm = document.createElement('form');
    taskForm.id = 'taskForm';
    taskForm.style.display = 'none';

    // Task name input
    const taskNameLabel = document.createElement('label');
    taskNameLabel.textContent = 'Task Name: ';
    const taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.required = true;

    // Description input
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description: ';
    const descriptionInput = document.createElement('textarea');

    // Project dropdown
    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Select project: ';
    const projectSelect = document.createElement('select');
    const noProjectOption = document.createElement('option');
    noProjectOption.value = '';
    noProjectOption.textContent = 'None';
    projectSelect.appendChild(noProjectOption);

    // Calendar input
    const calendarLabel = document.createElement('label');
    calendarLabel.textContent = 'Due Date: ';
    const calendarInput = document.createElement('input');
    calendarInput.type = 'date';
    calendarInput.required = true;

    // Priority levels
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority: ';
    const prioritySelect = document.createElement('select');
    prioritySelect.required = true;
    ['Low', 'Medium', 'High'].forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority;
        prioritySelect.appendChild(option);
    });

    // Save task button
    const saveTaskButton = document.createElement('button');
    saveTaskButton.type = 'submit';
    saveTaskButton.textContent = 'Save task';

    // Append form elements
    taskForm.appendChild(taskNameLabel);
    taskForm.appendChild(taskNameInput);
    taskForm.appendChild(descriptionLabel);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(projectLabel);
    taskForm.appendChild(projectSelect);
    taskForm.appendChild(calendarLabel);
    taskForm.appendChild(calendarInput);
    taskForm.appendChild(priorityLabel);
    taskForm.appendChild(prioritySelect);
    taskForm.appendChild(saveTaskButton);

    return { taskForm, taskNameInput, descriptionInput, projectSelect, calendarInput, prioritySelect };
}
