const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");

document.getElementById("logInForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  let email, password;
  email = emailInput.value;
  password = passwordInput.value;
  
  let user_records = JSON.parse(localStorage.getItem("users")) || [];
  
  if (user_records.some((v) => v.email === email && v.password === password)) {
    alert("You're logged in");
    let current_user = user_records.find((v) => v.email === email && v.password === password);
    localStorage.setItem("name", current_user.name);
    localStorage.setItem("email", current_user.email);
    window.location.href = "index.html";
  } else {
    alert("Log in failed");
  }
});
