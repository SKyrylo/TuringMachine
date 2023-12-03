function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);

}
function setInputError(inputElement, message){
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}


function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkcreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        setFormMessage(loginForm, "error", "invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e =>{
            if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length<5){
                setInputError(inputElement, "Username must be at least 5 characters.");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });


});

function Write_data(){
    let Username = document.getElementById("signupUsername").value;
    let Password = document.getElementById("pass").value;
    console.log(Username);
    console.log(Password);
    const fs = require('fs')
    fs.writeFile('/registration/registration.txt', Username, (err) => {
     if (err) throw err;

    });
    fs.writeFile('/registration/registration.txt', Password, (err) => {
        if (err) throw err;
    });
}
function Read_data(){
    const fs = require('fs');

    fs.readFile('/registration/registration.txt', (err, log) => {
        if (err) throw err;

    })
    fs.readFile('/registration/registration.txt', (err, pass) => {
            if (err) throw err;

        })


}
