// Prevent default behavior of form button

if(localStorage.users == undefined) {
    localStorage.users = JSON.stringify([]);
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Add localStorage parameters

    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userMessage = event.target.message.value;
    const userURL = event.target.url.value;

    let usersList = [];

    const userProfile = {name: userName, email: userEmail, message: userMessage, url: userURL}

    // Form validation

    if(validateForm()) {
            let users = JSON.parse(localStorage.users)
            users.push(userProfile)
            localStorage.users = JSON.stringify(users)
    } else {
        console.log("Form no validada!");
    }

    // Function used for validate form

    function validateForm() {

        let usersList = JSON.parse(localStorage.users);

        usersList.forEach(user => {
            if(user.name == userName || user.email == userEmail) {
                console.log("Este usuario ya existe!");
                return false;
            }

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
                return true;
            }
        }})
    }
})

 // Paint user cards

 if(localStorage.users) {
    let userList = JSON.parse(localStorage.users)

    let newSection = document.createElement("section")
    newSection.className = "box-container"
    newSection.setAttribute("id", "cards")
    document.querySelector("main").appendChild(newSection)

    userList.forEach(obj => {

        let cardDiv = document.createElement("div")
        cardDiv.className = "usercard"

        let userName = document.createElement("h2")
        let userNameText = document.createTextNode(obj.name)
        userName.appendChild(userNameText)

        let userImg = document.createElement("img")
        userImg.setAttribute("src", obj.url)
        userImg.setAttribute("alt", `${obj.name}-img`)

        let userEmail = document.createElement("p")
        let userEmailText = document.createTextNode(obj.email)
        userEmail.appendChild(userEmailText)

        let userMessage = document.createElement("p")
        let userMessageText = document.createTextNode(obj.message)
        userMessage.appendChild(userMessageText)

        let deleteContactButton = document.createElement("button")
        deleteContactButton.setAttribute("id", userName.innerHTML)
        let deleteContactText = document.createTextNode("Delete")
        deleteContactButton.appendChild(deleteContactText)

        cardDiv.appendChild(userName)
        cardDiv.appendChild(userImg)
        cardDiv.appendChild(userEmail)
        cardDiv.appendChild(userMessage)
        cardDiv.appendChild(deleteContactButton)

        document.querySelector("#cards").appendChild(cardDiv)
    })
 }

 // Delete all contacts button functionality

 document.querySelector("#delete-contacts").addEventListener("click", function(event) {
    event.preventDefault()

    localStorage.users = JSON.stringify([])

    console.log("Todos los contactos fueron borrados!");
 });

 // Delete one contact functionality

 JSON.parse(localStorage.users).forEach((user, index) => {
    document.querySelector(`#${user.name}`).addEventListener("click", function(event) {
        event.preventDefault()

        let usersList = JSON.parse(localStorage.users)
        usersList.splice(index, 1);

        localStorage.users = JSON.stringify(usersList)
    })
 });