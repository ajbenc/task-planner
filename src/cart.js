let cart = [];

// Function to add items to the cart
export function addItem(item, price) {
    cart.push({ item, price });
    updateCartCounter();
}

// Function to update the cart counter
export function updateCartCounter() {
    const cartCounter = document.getElementById("cartCounter");
    if (cartCounter) {
        cartCounter.textContent = cart.length; 
    }
}

// Function to clear the cart 
function clearContent() {
    const contentDiv = document.querySelector("#content");
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
    }
}

// Function to render the cart
export function loadCart() {
    clearContent(); 

    const contentDiv = document.querySelector("#content");

    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart");

    const cartTitle = document.createElement("h1");
    cartTitle.textContent = "Your Cart";
    cartDiv.appendChild(cartTitle);

    if (cart.length === 0) {
        const emptyCartMsg = document.createElement("p");
        emptyCartMsg.textContent = "Your cart is empty. Thank you for your purchase!";
        cartDiv.appendChild(emptyCartMsg);
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");

            const itemName = document.createElement("p");
            itemName.textContent = item.item;

            const itemPrice = document.createElement("p");
            itemPrice.textContent = `$${item.price}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => removeItem(index));

            itemDiv.append(itemName, itemPrice, removeBtn);
            cartDiv.appendChild(itemDiv);
        });

        const totalDiv = document.createElement("div");
        totalDiv.classList.add("total");
        totalDiv.textContent = `Total: $${calculateTotal()}`;
        cartDiv.appendChild(totalDiv);

        const checkoutBtn = document.createElement("button");
        checkoutBtn.textContent = "Checkout";
        checkoutBtn.addEventListener("click", handleCheckout);
        cartDiv.appendChild(checkoutBtn);
    }

    contentDiv.appendChild(cartDiv);
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

//Checkout
function handleCheckout() {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("checkout-alert");
    alertDiv.textContent = "Thank you for your order, processing it now!";

    //add Style css appart

    document.body.appendChild(alertDiv);
    //Removal alert

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);

    cart = []; 
    updateCartCounter(); 
    loadCart(); 
}

// Remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); 
    updateCartCounter(); 
    loadCart(); 
}
