// Prevent default behavior of form button

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Add localStorage functions

    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userMessage = event.target.message.value;
    const userURL = event.target.url.value;

    let usersList = [];

    const userProfile = {name: userName, email: userEmail, message: userMessage, url: userURL}

    // Form validation

    if(validateForm()) {
        if(localStorage.users) {

            // Existing users condition
    
            let users = JSON.parse(localStorage.users)
            usersList = [];
            usersList.push(...users)
            usersList.push(userProfile)
            localStorage.users = JSON.stringify(usersList)
        } else {
    
            // Non existing users condition
    
            usersList.push(userProfile);
            localStorage.users = JSON.stringify(usersList);
        }
    } else {
        console.log("Form no validada!");
    }

    // Function used for validate form

    function validateForm() {
        if(userName == "" || userEmail == "" || userMessage == "" || userURL == "") {
            console.log("Debes introducir todos los valores en los campos!");
            return false
        } else {
            if(userName.length < 5) {
                console.log("Tu nombre debe ser mayor de 5 caracteres!");
                return false
            } else if (!userEmail.endsWith(".com")) {
                console.log("Tu email debe acabar en .com!");
                return false
            } else if (userMessage.length > 20) {
                console.log("Tu mensaje es demasiado largo! Maximo: 20 caracteres");
                return false
            } else {
                return true
            }
        }
    }
})