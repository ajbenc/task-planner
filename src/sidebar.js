export function loadSidebarTitle() {
    const sidebar = document.querySelector("#sidebar");
    const title = document.createElement("div");
    title.id = "sidebarTitle";
    title.textContent = "Task Planner";

    sidebar.insertBefore(title, sidebar.firstChild);
}
