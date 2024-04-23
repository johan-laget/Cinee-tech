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

document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;
  var confirmPassword = document.getElementById("signup-password-confirm").value;

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
    alert("Utilisateur enregistré avec succès !");
  }
});

inputs.forEach((input) => {
  switch (input.id) {
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
