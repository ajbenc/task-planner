 
export function displayProjectList(projectDisplaySection, projects) {
    projectDisplaySection.textContent = '';  
    projects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = project.name;
        projectDiv.classList.add('project-item');
        projectDisplaySection.appendChild(projectDiv);
    });
}

 
export function saveProject(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

 
export function loadProjectsFromStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : [];
}
