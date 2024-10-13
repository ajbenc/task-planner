import { addItem, updateCartCounter } from "./cart";
import caviarImage from './imgs/dish1.jpeg';
import soupImage from './imgs/dish2.jpeg';
import lobsterImage from './imgs/dish3.jpg';
import wagyuImage from './imgs/dish4.jpg';
import chocolateImage from './imgs/dish5.jpg';
import souffleImage from './imgs/dish6.jpg';

export function loadMenu() {

    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu");

    const menuHeadline = document.createElement("h1");
    menuHeadline.textContent = "Menu";
    menuDiv.appendChild(menuHeadline);

    const menuItems = [
        {   
            dishInfo: "Starter",
            menuHeadline: "Caviar Royale",
            menuDescription: "Delicate pearls of Oscietra caviar, served on a bed of chilled heirloom potato espuma, paired with crème fraîche and a touch of lemon zest. The perfect balance of briny elegance and creamy richness.",
            drinks: "Champagne Brut Blanc de Blancs",
            price: 150,
            img: caviarImage,
        },
        {
            dishInfo: "Starter",
            menuHeadline: "Velouté of Truffle and Porcini",
            menuDescription: "A velvety soup made from wild porcini mushrooms and infused with black winter truffles. Each spoonful is a rich, earthy embrace, finished with a drizzle of white truffle oil and crispy leeks for texture.",
            drinks: "Chardonnay, Meursault (Burgundy)",
            price: 120,
            img: soupImage,
        },
        {
            dishInfo: "Main",
            menuHeadline: "Butter-Poached Lobster",
            menuDescription: "Tender lobster poached in clarified butter, served with a saffron-infused risotto. Accompanied by a sauce of lobster bisque reduction, each bite is an explosion of decadent flavors, from the sweetness of the lobster to the subtle warmth of saffron.",
            drinks: "Chablis Grand Cru",
            price: 350,
            img: lobsterImage,
        },
        {
            dishInfo: "Main",
            menuHeadline: "Wagyu Beef Tenderloin",
            menuDescription: "A perfectly seared, melt-in-your-mouth Wagyu beef tenderloin, complemented by a silky black garlic purée and caramelized shallots. Finished with a red wine reduction, this dish is the epitome of indulgence, where every bite exudes luxury.",
            drinks: "Cabernet Sauvignon, Napa Valley",
            price: 400,
            img: wagyuImage,
        },
        {
            dishInfo: "Dessert",
            menuHeadline: "Gold-Dusted Chocolate Sphere",
            menuDescription: "A stunning dark chocolate sphere, dusted in edible gold, which melts open as warm hazelnut ganache is poured over it. Inside, a delicate mousse and caramelized nuts offer the perfect balance of texture and rich, sweet flavors.",
            drinks: "Tawny Port",
            price: 95,
            img: chocolateImage,
        },
        {
            dishInfo: "Dessert",
            menuHeadline: "Vanilla Bean Soufflé",
            menuDescription: "A light, airy soufflé made from Madagascar vanilla beans, paired with a smooth bourbon crème anglaise. Every spoonful feels like a cloud, gently sweet and irresistibly fragrant.",
            drinks: "Sauternes (Bordeaux)",
            price: 85,
            img: souffleImage,
        },
    ];

    menuItems.forEach(item => {

        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        const imageMenu = document.createElement("img");
        imageMenu.src = item.img;
        imageMenu.alt = item.menuHeadline;
        imageMenu.classList.add("menu-img");

        imgContainer.appendChild(imageMenu);

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        const dishInfo = document.createElement("p");
        dishInfo.textContent = item.dishInfo;
        dishInfo.classList.add("dish-info");

        const menuHeadline = document.createElement("h2");
        menuHeadline.textContent = item.menuHeadline;
        menuHeadline.classList.add("menu-headline");

        const menuDescription = document.createElement("p");
        menuDescription.textContent = item.menuDescription;
        menuDescription.classList.add("menu-description");

        const drinks = document.createElement("p");
        drinks.textContent = `Drink Pairing: ${item.drinks}`;
        drinks.classList.add("drinks");

        const price = document.createElement("p");
        price.textContent = `$${item.price}`;
        price.classList.add("price");

        // Order button
        const orderButton = document.createElement("button");
        orderButton.textContent = "Order";
        orderButton.classList.add("order-button");
        orderButton.addEventListener("click", () => {
            addItem(item.menuHeadline, item.price);
            updateCartCounter();
        });

        infoContainer.append(dishInfo, menuHeadline, menuDescription, drinks, price, orderButton);

        menuItem.append(imgContainer, infoContainer);
        menuDiv.appendChild(menuItem);
    });

    // Clear the content
    const contentDiv = document.querySelector("div#content");
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
    }

    contentDiv.appendChild(menuDiv);
}
