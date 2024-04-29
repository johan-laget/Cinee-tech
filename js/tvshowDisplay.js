const tvsContainer = document.getElementById("tvshow-container");
const searchBar = document.getElementById("searchbar");
const selectedProfile = localStorage.getItem("currentProfile");
let tvFavorites =
  JSON.parse(localStorage.getItem(`${selectedProfile}_tvFavorites`)) || [];
let genres;
let totalPages;
let currentPage;

/*=============== SHOW MENU ===============*/
const nav = document.getElementById("nav"),
  headerMenu = document.getElementById("header-menu"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (headerMenu) {
  headerMenu.addEventListener("click", () => {
    nav.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    nav.classList.remove("show-menu");
  });
}

const createTvsCard = (tvs) => {
  // Create elements for the card
  const cardArticle = document.createElement("article");
  cardArticle.classList.add("card__article");

  const cardLink = document.createElement("a");
  cardLink.classList.add("card__link");
  cardLink.href = "#";

  const cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.src = `${baseImgUrl}${tvs.poster_path}`;
  cardImg.alt = tvs.name;

  const cardShadow = document.createElement("div");
  cardShadow.classList.add("card__shadow");
  cardShadow.addEventListener("click", () => {
    createModal(tvs);
  });

  const cardLikeIcon = document.createElement("i");
  cardLikeIcon.classList.add("ri-heart-3-line", "card__like");
  cardLikeIcon.id = tvs.id;

  // Check if TV show is in favorites list and set icon accordingly
  if (tvFavorites.includes(tvs.id)) {
    cardLikeIcon.classList.add("ri-heart-fill");
  }

  cardLikeIcon.addEventListener("click", () => {
    // Toggle favorite status and update local storage
    if (!selectedProfile) {
      alert("Veuillez sélectionner un profil.");
      return;
    }
    const tvsId = tvs.id;
    const tvsIndex = tvFavorites.indexOf(tvsId);
    if (tvsIndex === -1) {
      tvFavorites.push(tvsId);
      cardLikeIcon.classList.add("ri-heart-fill");
      alert("Série ajoutée aux favoris.");
    } else {
      tvFavorites.splice(tvsIndex, 1);
      cardLikeIcon.classList.remove("ri-heart-fill");
      alert("Série supprimée des favoris.");
    }
    localStorage.setItem(
      `${selectedProfile}_tvFavorites`,
      JSON.stringify(tvFavorites)
    );
  });

  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardShadow);
  cardLink.appendChild(cardLikeIcon);

  cardArticle.appendChild(cardLink);

  // Return the constructed card
  return cardArticle;
};

const renderPagination = () => {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";

  // Calculate the starting page number for the previous three pages
  const startPagePrev = Math.max(currentPage - 3, 1);
  // Calculate the ending page number for the previous three pages
  const endPagePrev = Math.min(currentPage - 1, totalPages);

  for (let i = startPagePrev; i <= endPagePrev; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.dataset.page = i;
    paginationContainer.appendChild(button);
  }
  // Create button for current page
  const currentButton = document.createElement("button");
  currentButton.textContent = currentPage;
  currentButton.dataset.page = currentPage;
  currentButton.classList.add("active");
  paginationContainer.appendChild(currentButton);

  // Calculate the starting page number for the next three pages
  const startPageNext = currentPage + 1;
  // Calculate the ending page number for the next three pages
  const endPageNext = Math.min(currentPage + 3, totalPages);

  for (let i = startPageNext; i <= endPageNext; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.dataset.page = i;
    paginationContainer.appendChild(button);
  }
};

(async () => {
  try {
    genres = await fetchTvsGenres();
    let tvs = await fetchApiTvs();
    totalPages = tvs.pop();
    currentPage = tvs.pop();
    tvs.forEach((tv) => {
      const tvsCard = createTvsCard(tv);
      tvsContainer.appendChild(tvsCard);
    });
    const paginationContainer = document.querySelector("#pagination");
    paginationContainer.innerHTML = "";

    const startPage = currentPage + 1;
    const endPage = Math.min(currentPage + 5, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.dataset.page = i;
      paginationContainer.appendChild(button);
    }

    searchBar.addEventListener("keyup", async (event) => {
      const searchTerm = event.target.value.trim();
      if (!searchTerm) {
        tvsContainer.innerHTML = "";
        try {
          const tvs = await fetchApiTvs();

          const tvsTitles = tvs.map((tv) => tv.name);
          autocomplete(searchBar, tvsTitles);

          totalPages = tvs.pop();
          currentPage = tvs.pop();
          tvs.forEach((tv) => {
            const tvsCard = createTvsCard(tv);
            tvsContainer.appendChild(tvsCard);
          });
          renderPagination();
        } catch (error) {
          console.error("Error fetching tv shows: ", error);
        }
      } else {
        const tvs = await fetchTvsByTitle(searchTerm);
        tvs.pop();
        tvs.pop();
        tvsContainer.innerHTML = "";
        tvs.forEach((tv) => {
          const tvsCard = createTvsCard(tv);
          tvsContainer.appendChild(tvsCard);
        });
      }
    });
    document
      .querySelector("#pagination")
      .addEventListener("click", async (event) => {
        if (searchBar.value.trim() !== "") {
          if (event.target.tagName === "BUTTON") {
            const page = parseInt(event.target.dataset.page);
            currentPage = page;
            if (!isNaN(page)) {
              try {
                const searchTerm = searchBar.value.trim();
                const tvs = await fetchTvsByTitle(searchTerm, page);
                totalPages = tvs.pop();
                currentPage = tvs.pop();
                tvsContainer.innerHTML = "";
                tvs.forEach((tv) => {
                  const tvsCard = createTvsCard(tv);
                  tvsContainer.appendChild(tvsCard);
                });
                renderPagination();
              } catch (error) {
                console.log("Error fetching tv shows: ", error);
              }
            }
          }
        } else {
          if (event.target.tagName === "BUTTON") {
            const page = parseInt(event.target.dataset.page);
            currentPage = page;
            if (!isNaN(page)) {
              try {
                const tvs = await fetchApiTvs(page);
                totalPages = tvs.pop();
                currentPage = tvs.pop();
                tvsContainer.innerHTML = "";
                tvs.forEach((tv) => {
                  const tvsCard = createTvsCard(tv);
                  tvsContainer.appendChild(tvsCard);
                });
                renderPagination();
              } catch (error) {
                console.log("Error fetching tv shows: ", error);
              }
            }
          }
        }
      });
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
})();
