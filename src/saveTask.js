export function saveTask(formElements, taskForm, displayTask) {
    const { taskNameInput, descriptionInput, projectSelect, calendarInput, prioritySelect } = formElements;

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskData = {
            name: taskNameInput.value,
            description: descriptionInput.value,
            project: projectSelect.value,
            dueDate: calendarInput.value,
            priority: prioritySelect.value
        };

        taskForm.reset();
        taskForm.style.display = 'none';

        displayTask(taskData);
    });
}
