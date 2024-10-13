import { loadMenu } from "./menu";
import { loadContact } from "./contact";
import homeImg from './imgs/home.jpg';

const addLogoToNavbar = () => {
    const navBar = document.querySelector("nav");
    const existingLogo = navBar.querySelector(".logo");
    
    if (!existingLogo) {  
        const logoContainer = document.createElement("div");
        logoContainer.classList.add("logo");

        const textLogo = document.createElement("h1");
        textLogo.textContent = "Opulence";
        textLogo.classList.add("text-logo");
        
        logoContainer.appendChild(textLogo);
        navBar.insertBefore(logoContainer, navBar.firstChild);
    }
};

addLogoToNavbar();

//create the main body for the page as an export function
export function loadHome () {

    const homeDiv = document.createElement("div");
    homeDiv.classList.add("home");

    const image = document.createElement("img");
    image.src = homeImg;
    image.alt = "Home Image";

    homeDiv.appendChild(image);

    const sloganOverlay = document.createElement("div");
    sloganOverlay.classList.add("slogan-overlay");

    const sloganText = document.createElement("h2");
    sloganText.innerHTML = `""When elegance<br><span class="second-line">meets flavor"</span>`;
    sloganText.classList.add("slogan-text");

    sloganOverlay.appendChild(sloganText);
    homeDiv.appendChild(sloganOverlay);

    const headingTitle = document.createElement("h1");
    headingTitle.textContent = "Opulence";

    const restaurantDescription = document.createElement("p");
    restaurantDescription.textContent = "Opulence is a three-Michelin-starred restaurant that redefines luxury dining. With a menu crafted from the finest global ingredients, each dish is a masterpiece of flavor and presentation. Immerse yourself in an unparalleled culinary experience where sophistication and creativity meet.";

    const orderNowBtn = document.createElement("button"); 
    orderNowBtn.textContent = "Order now";
    orderNowBtn.id = "orderNow";

    const reservationsBtn = document.createElement("button");
    reservationsBtn.textContent = "Reservations"
    reservationsBtn.id = "reservations"

    const content = [headingTitle, restaurantDescription, orderNowBtn, reservationsBtn];

    homeDiv.append(...content);

    const contentDiv = document.querySelector("div#content");

    contentDiv.append(homeDiv);

    orderNowBtn.addEventListener("click", () => {
        loadMenu();
    });

    reservationsBtn.addEventListener("click", () => {
        const contactTab = document.querySelector("#contactBtn");
        contactTab.click();
    });
}
