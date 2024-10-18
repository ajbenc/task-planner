import { loadSidebarTitle } from "./sidebar";
import { tabSwitch } from "./tabActions";
import { loadBoard } from "./board";
import "./styles.css";

function init() {
    loadSidebarTitle();
    tabSwitch();
    loadBoard();
}

init();
