document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const profileName = document.getElementById("profileName").value;

    if (profileName.trim() === "") {
      alert("Veuillez entrer un nom de profil valide.");
      return;
    }

    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

    // Vérifie si le profil existe déjà
    if (profiles.includes(profileName)) {
      alert("Ce nom de profil existe déjà. Veuillez choisir un autre nom.");
      return;
    }

    profiles.push(profileName);
    localStorage.setItem("profiles", JSON.stringify(profiles));

    // Réinitialise le formulaire
    profileForm.reset();

    localStorage.setItem(profileName, JSON.stringify([]));

    // Met à jour l'affichage des profils
    displayProfiles();
  });

  function displayProfiles() {
    const profilesContainer = document.getElementById("profilesContainer");
    profilesContainer.innerHTML = "";

    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];
    profiles.forEach((profile) => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("card__profile");
      profileCard.innerHTML = `
                <a href="#" class="profile-link" data-profile="${profile}">
                    <img class="profile__img" src="https://api.dicebear.com/8.x/lorelei/svg?flip=false" alt="">
                    <p class="profile__name">${profile}</p>
                </a>
            `;
      profilesContainer.appendChild(profileCard);
    });

    // Ajoute un gestionnaire d'événements pour chaque lien de profil
    const profileLinks = document.querySelectorAll(".profile-link");
    profileLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const selectedProfile = this.dataset.profile;
        localStorage.setItem("currentProfile", selectedProfile);
        // Redirige vers la page d'accueil ou effectue toute autre action nécessaire
        window.location.href = "./home.html";
      });
    });
  }

  // Affiche les profils au chargement de la page
  displayProfiles();
});
