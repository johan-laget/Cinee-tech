const cardSection = document.getElementById('card__profile');
const maxAccounts = 6;
const maxCharacters = 7;

function createCard(username) {
    if (cardSection.children.length >= maxAccounts) {
        alert("Vous avez atteint la limite de comptes.");
        return;
    }

    if (username.length > maxCharacters) {
        alert("Le pseudo ne doit pas dépasser 7 caractères.");
        return;
    }

    const card = document.createElement('div');
    card.classList.add('cards__profile');

    const img = document.createElement('img');
    img.classList.add('profile__img');
    img.src = `https://api.dicebear.com/8.x/lorelei/svg?d=${username}&flip=false`;

    const p = document.createElement('p');
    p.classList.add('profile__name');
    p.textContent = username;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
            card.remove();
            updateLocalStorage();
        }
    });

    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(deleteButton);
   
    cardSection.appendChild(card);

    updateLocalStorage();
}

const createCardButton = document.querySelector('.cards__profile');
createCardButton.addEventListener('click', () => {
    const username = prompt("Entrez votre pseudo:");
    if (username) {
        createCard(username);
    }
});

const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
savedCards.forEach(username => {
    createCard(username);
});

function updateLocalStorage() {
    const cards = Array.from(cardSection.children)
        .map(card => card.querySelector('.profile__name').textContent);
    localStorage.setItem('cards', JSON.stringify(cards));
}
