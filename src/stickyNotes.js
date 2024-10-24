export function loadStickyNotes() {
    const content = document.querySelector("#content");
    content.textContent = '';  

    const heading = document.createElement('h1');
    heading.textContent = 'Sticky Notes Wall';
    content.appendChild(heading);

    const addNoteBtn = document.createElement('button');
    addNoteBtn.textContent = 'Add note';
    addNoteBtn.classList.add('add-note-btn');
    content.appendChild(addNoteBtn);

    const stickyNotesSection = document.createElement('div');
    stickyNotesSection.id = 'stickyNotesSection';
    content.appendChild(stickyNotesSection);

    // Load saved sticky notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    displayStickyNotes(savedNotes, stickyNotesSection);

    // Event listener for creating new notes
    addNoteBtn.addEventListener('click', () => {
        createStickyNote(savedNotes, stickyNotesSection);
    });
}

function displayStickyNotes(notes, container) {
    container.textContent = '';  // Clear the container first
    notes.forEach((note, index) => {
        const noteDiv = createNoteElement(note, index, notes);
        container.appendChild(noteDiv);
    });
}

function createStickyNote(notesArray, container) {
    const newNoteDiv = document.createElement('textarea');
    newNoteDiv.placeholder = 'Type your note here...';
    newNoteDiv.classList.add('sticky-note');
    newNoteDiv.style.backgroundColor = getRandomColor();  // Set random color

    container.appendChild(newNoteDiv);

    // Event listener for saving the note when pressing Enter
    newNoteDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const noteContent = newNoteDiv.value.trim();
            if (noteContent) {
                const newNote = { content: noteContent, color: newNoteDiv.style.backgroundColor };
                notesArray.push(newNote);
                saveNotesToLocalStorage(notesArray);
                displayStickyNotes(notesArray, container);
            }
        }
    });
}

function createNoteElement(note, index, notesArray) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('sticky-note');
    noteDiv.style.backgroundColor = note.color;  // Use saved color
    noteDiv.textContent = note.content;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-note-btn');

    // Delete note when clicked
    deleteBtn.addEventListener('click', () => {
        notesArray.splice(index, 1);
        saveNotesToLocalStorage(notesArray);
        displayStickyNotes(notesArray, document.querySelector('#stickyNotesSection'));
    });

    noteDiv.appendChild(deleteBtn);
    return noteDiv;
}

function saveNotesToLocalStorage(notesArray) {
    localStorage.setItem('stickyNotes', JSON.stringify(notesArray));
}

function getRandomColor() {
    const colors = ['#FFD700', '#FF4500', '#87CEEB', '#32CD32', '#FF69B4', '#8A2BE2', '#FF6347'];
    return colors[Math.floor(Math.random() * colors.length)];
}
