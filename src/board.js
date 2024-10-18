export function loadBoard
 () {

    const content = document.querySelector ("#content");
    content.textContent = '';

    const headingHome = document.createElement('h1');
    headingHome.textContent = 'Board';
    content.appendChild(headingHome);

    const paraHome = document.createElement('p')
    paraHome.textContent = '0 task'
    content.appendChild(paraHome);

    const newTask = document.createElement('button');
    newTask.textContent = 'New Task';
    content.appendChild(newTask);


  
  
}
