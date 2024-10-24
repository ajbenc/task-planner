import { createTaskForm } from './form.js'; // Import the form function

export function showModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';

    // Get the form and append it to the modal
    const { taskForm } = createTaskForm();
    modal.appendChild(taskForm);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-modal';
    modal.appendChild(closeButton);

    document.body.appendChild(modal);

    // Close modal on close button click
    closeButton.onclick = () => {
        closeModal(modalOverlay, modal);
    };

    // Apply class to blur background
    document.body.classList.add('modal-open');

    // Optionally: Prevent form submission if the user clicks outside the modal
    modalOverlay.onclick = () => {
        closeModal(modalOverlay, modal);
    };
}

function closeModal(modalOverlay, modal) {
    document.body.classList.remove('modal-open');
    modalOverlay.remove();
    modal.remove();
}
