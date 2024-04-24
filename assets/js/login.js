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

        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // Rediriger l'utilisateur vers la page d'accueil
        window.location.href = "index.html";
    } else {
        alert("Log in failed");
    }
});

  // Sélectionner le bouton de déconnexion dans le DOM
const logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", function() {
  // Supprimer les données de l'utilisateur actuellement connecté du localStorage
  localStorage.removeItem("currentUser");

  // Rediriger l'utilisateur vers la page d'accueil ou une autre page de votre choix
  window.location.href = "./index.html";
});
