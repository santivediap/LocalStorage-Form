// Prevent default behavior of form button

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
})