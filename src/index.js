import "./styles.css";
import { loadMenu } from "./menu";
import { loadContact } from "./contact";
import { loadHome } from "./home";
import { loadCart } from "./cart";

//load page and images.

function init(){
    tabSwitch();
    loadHome();
}

function tabSwitch() {
    const listItems = [
        document.querySelector("#homeBtn"),
        document.querySelector("#menuBtn"),
        document.querySelector("#contactBtn"),
        document.querySelector("#cartBtn"),
    ];

    listItems.forEach(item => {
        if(item) {
            item.addEventListener("click", loadTab);
        }
    });
}

function loadTab (event) {
    const currentTab = event.target.id;
    const contentDiv = document.querySelector("div#content");

    contentDiv.replaceChildren();

    switch (currentTab) {
        case "menuBtn":
            loadMenu(contentDiv);
            break;
        case "contactBtn":
            loadContact(contentDiv);
            break;
        case "cartBtn":
            loadCart(contentDiv);
            break;
        default:
            loadHome(contentDiv);
            break; 
    }

}

init();