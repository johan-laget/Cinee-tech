const emailInput = document.getElementById("email_input");
const passwordInput = document.getElementById("password_input");


document.getElementById("logInForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    const user_record = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = user_record.find((user) => user.email === email && user.password === password);
    if (currentUser) {
        alert("You're logged in");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "index.html";
    } else {
        alert("Log in failed");
    }
});
