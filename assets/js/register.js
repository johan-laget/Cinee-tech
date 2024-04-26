const switchers = [...document.querySelectorAll('.switcher')];

switchers.forEach(item => {
  item.addEventListener('click', function() {
    switchers.forEach(item => item.parentElement.classList.remove('is-active'));
    this.parentElement.classList.add('is-active');
    
  });
});
//**************************************register******************************************* //
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector(".btn-signup");

function isValidEmail(email) {
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.trim().length >= 6;
}

function isValidPseudo(pseudo) {
  return pseudo.trim().length >= 3; // Au moins 3 caractères pour le pseudo
}

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var pseudo = document.getElementById("pseudo_input").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  var confirmPassword = document.getElementById("signup-password-confirm").value;

  if (!isValidPseudo(pseudo)) {
    alert("Veuillez saisir un pseudo valide (au moins 3 caractères).");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Veuillez saisir une adresse e-mail valide.");
    return;
  }

  if (!isValidPassword(password)) {
    alert("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  var formData = {
    pseudo: pseudo,
    email: email,
    password: password
  };

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];
  if (
    user_records.some((v) => {
      return v.email == email;
    })
  ) {
    alert("Email déjà utilisé.");
  } else {
    user_records.push(formData);
    localStorage.setItem("users", JSON.stringify(user_records));
    window.location.href = "login.html";
    alert("Utilisateur enregistré avec succès !");
  }
});

inputs.forEach((input) => {
  switch (input.id) {
    case "pseudo_input":
      input.addEventListener("blur", () => {
        const pseudo = input.value;
        if (!isValidPseudo(pseudo)) {
          alert("Veuillez saisir un pseudo valide (au moins 3 caractères).");
        }
      });
      break;
    case "signup-email":
      input.addEventListener("blur", () => {
        const email = input.value;
        if (!isValidEmail(email)) {
          alert("Veuillez saisir une adresse e-mail valide.");
        }
      });
      break;
    case "signup-password":
      input.addEventListener("blur", () => {
        const password = input.value;
        if (!isValidPassword(password)) {
          alert("Le mot de passe doit contenir au moins 6 caractères.");
        }
      });
      break;
    case "signup-password-confirm":
      input.addEventListener("blur", () => {
        const password = document.getElementById("signup-password").value;
        const confirmPassword = input.value;
        if (password !== confirmPassword) {
          alert("Les mots de passe ne correspondent pas.");
        }
      });
      break;
  }
});

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
