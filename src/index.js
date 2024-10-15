import { loadSidebarTitle } from "./sidebar";
import { tabSwitch } from "./tabActions";
import { loadHome } from "./home";
import "./styles.css";

function init() {
    loadSidebarTitle();
    tabSwitch();
    loadHome();
}

init();
