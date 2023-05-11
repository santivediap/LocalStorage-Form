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
})