import { loadStickyNotes } from "./stickyNotes";
import { loadBoard } from "./board";
import { loadProjects } from "./projects";
import { loadToday } from "./today";
import { loadComing } from "./upcoming";


export function tabSwitch() {
    const listItems = [
        document.querySelector("#boardBtn"),
        document.querySelector("#projectsBtn"),
        document.querySelector("#tasksBtn"),
        document.querySelector("#stickyBtn"),
        document.querySelector("#todayBtn"),
        document.querySelector("#upComingBtn")
    ];

    listItems.forEach(item => {
        if (item) {
            item.addEventListener("click", loadTab);
        }
    });
}

function loadTab(event) {
    const currentTab = event.target.id;
    const contentDiv = document.querySelector("div#content");

    contentDiv.replaceChildren();

    switch (currentTab) {
        case "projectsBtn":
            loadProjects(contentDiv);
            break;
        case "tasksBtn":
            loadTask(contentDiv);
            break;
        case "todayBtn":
            loadToday(contentDiv);
            break;
        case "upComingBtn":
            loadComing(contentDiv);
            break;
        case "stickyBtn":
            loadStickyNotes(contentDiv);
            break;
        default:
            loadBoard(contentDiv);
            break; 
    }
}

