// Function to display the list of projects
export function displayProjectList(projectDisplaySection, projects) {
    projectDisplaySection.textContent = ''; // Clear previous projects

    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = project.name;
        projectDiv.classList.add('project-item');
        projectDisplaySection.appendChild(projectDiv);
    });
}

// Save projects to local storage
export function saveProject(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Load projects from local storage
export function loadProjectsFromStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}
