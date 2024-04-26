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

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const authButtons = document.getElementById("auth-buttons");
const profileButtons = document.getElementById("profile-buttons");

const logOutBtn = document.getElementById("logOutBtn");

if (currentUser) {
   logOutBtn.addEventListener("click", function() {
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
    });
}

if (currentUser) {
    authButtons.style.display = "none";
    profileButtons.style.display = "block";
    const profileButton = document.getElementById("profile-button");
    profileButton.value = currentUser.pseudo;
} else {
    authButtons.style.display = "block";
    profileButtons.style.display = "none";
}
