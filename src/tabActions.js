import { loadTask } from "./task";
import { loadStickyNotes } from "./stickyNotes";
import { loadHome } from "./home";
import { loadProject } from "./projects";
import { loadToday } from "./today";
import { loadComing } from "./upcoming";

export function tabSwitch() {
    const listItems = [
        document.querySelector("#homeBtn"),
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
            loadProject(contentDiv);
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
            loadHome(contentDiv);
            break; 
    }
}
