
export function loadContact() {
    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");

    const headline = document.createElement("h1");
    headline.textContent = "For bookings or get in touch with us";
    headline.classList.add("contact-headline");

    const contacText = document.createElement("p");
    contacText.textContent = "Have inquiry or need a reservation? We're here to help you out! Fill out the form below, and our team will get back to you as soon as possible.";
    contacText.classList.add("contect-text");

    const contactForm = loadForm();

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("form", "contact-form");
    submitBtn.name = "submit";
    submitBtn.value = "submit";
    submitBtn.textContent = "submit";
    submitBtn.classList.add("submit-btn");

    contactDiv.append(headline, contacText, contactForm, submitBtn);
    const contentDiv = document.querySelector("div#content");

    contentDiv.append(contactDiv);
}

function getInputElement (type, name, required, placeholder) {
const input = document.createElement("input");
input.type =type;
input.name = name;
input.required = required;
input.placeholder = placeholder;
input.classList.add(`${name-input}`);
return input;
}

function loadForm () {
    const contactForm = document.createElement("form");
    contactForm.action ="";
    contactForm.method = "get";
    contactForm.id = "contact-form";
    contactForm.classList.add("contact-form");
    const firstName = getInputElement("text", "firstName", true, "FirstName");
    const lasttName = getInputElement("text", "lastName", true, "LastName");
    const email = getInputElement("email", "email", true, "E-mail");
    const Tel = getInputElement("tel", "tel", true, "Phone Number");
    const textarea = document.createElement("textarea");
    textarea.name = "textarea";
    textarea.placeholder = "For bookings write down your request here.";
    textarea.required = true;
    textarea.classList.add("textarea-input");
    const formChildren = [firstName, lasttName, Tel, email, textarea];
    contactForm.append(...formChildren);
    return contactForm;
}