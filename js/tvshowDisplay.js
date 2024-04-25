const tvsContainer = document.getElementById("tvshow-container");
const searchBar = document.getElementById("searchbar");
let genres;
let autoCompletion;
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

  const cardData = document.createElement("div");
  cardData.classList.add("card__data");

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card__name");
  cardTitle.textContent = tvs.name;

  const cardCategory = document.createElement("span");
  cardCategory.classList.add("card__category");
  for (let i = 0; i < tvs.genre_ids.length; i++) {
    let genreToAdd = genres.find((genre) => genre.id == tvs.genre_ids[i]);
    cardCategory.textContent += ` ${genreToAdd.name}`;
  }

  const cardLikeIcon = document.createElement("i");
  cardLikeIcon.classList.add("ri-heart-3-line", "card__like");

  cardData.appendChild(cardTitle);
  cardData.appendChild(cardCategory);
  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardShadow);
  cardLink.appendChild(cardData);
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
    document.querySelector("#pagination").addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const page = parseInt(event.target.dataset.page);
        currentPage = page;
        if (!isNaN(page)) {
          fetchApiTvs(page)
            .then((tvs) => {
              totalPages = tvs.pop();
              currentPage = tvs.pop();
              tvsContainer.innerHTML = "";
              tvs.forEach((tv) => {
                const tvsCard = createTvsCard(tv);
                tvsContainer.appendChild(tvsCard);
              });
              renderPagination();
            })
            .catch((error) => {
              console.error("Error fetching tv shows: ", error);
            });
        }
      }
    });

    searchBar.addEventListener("keyup", async (event) => {
      const searchTerm = event.target.value.trim();
      if (!searchTerm) {
        tvsContainer.innerHTML = "";
        try {
          const tvs = await fetchApiTvs();
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
        const tvsTitles = tvs.map((tv) => tv.name);
        autocomplete(searchBar, tvsTitles);
      }
    });
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
})();
