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


const movieContainer = document.getElementById("movie-container");
const searchBar = document.getElementById("searchbar");
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
const createMovieCard = (movie) => {
  const cardArticle = document.createElement("article");
  cardArticle.classList.add("card__article");

  const cardLink = document.createElement("a");
  cardLink.classList.add("card__link");
  cardLink.href = "#"; // Link to modal here

  const cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.src = `${baseImgUrl}${movie.poster_path}`;
  cardImg.alt = movie.title;

  const cardShadow = document.createElement("div");
  cardShadow.classList.add("card__shadow");

  const cardData = document.createElement("div");
  cardData.classList.add("card__data");

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card__name");
  cardTitle.textContent = movie.title;

  const cardCategory = document.createElement("span");
  cardCategory.classList.add("card__category");
  for (let i = 0; i < movie.genre_ids.length; i++) {
    let genreToAdd = genres.find((genre) => genre.id == movie.genre_ids[i]);
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

  return cardArticle;
};
const renderPagination = () => {
  const paginationContainer = document.querySelector("#pagination");
  paginationContainer.innerHTML = "";

  const startPagePrev = Math.max(currentPage - 3, 1);
  const endPagePrev = Math.min(currentPage - 1, totalPages);

  for (let i = startPagePrev; i <= endPagePrev; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.dataset.page = i;
    paginationContainer.appendChild(button);
  }
  const currentButton = document.createElement("button");
  currentButton.textContent = currentPage;
  currentButton.dataset.page = currentPage;
  currentButton.classList.add("active");
  paginationContainer.appendChild(currentButton);

  const startPageNext = currentPage + 1;
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
    genres = await fetchMovieGenres();
    let movies = await fetchApiMovies();
    totalPages = movies.pop();
    currentPage = movies.pop();
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
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
          fetchApiMovies(page)
            .then((movies) => {
              totalPages = movies.pop();
              currentPage = movies.pop();
              movieContainer.innerHTML = "";
              movies.forEach((movie) => {
                const movieCard = createMovieCard(movie);
                movieContainer.appendChild(movieCard);
              });
              renderPagination();
            })
            .catch((error) => {
              console.error("Error fetching movies: ", error);
            });
        }
      }
    });

    searchBar.addEventListener("keyup", async (event) => {
      const searchTerm = event.target.value.trim();
      if (!searchTerm) {
        movieContainer.innerHTML = "";
        try {
          const movies = await fetchApiMovies();
          totalPages = movies.pop();
          currentPage = movies.pop();
          movies.forEach((movie) => {
            const movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
          });
          renderPagination();
        } catch (error) {
          console.error("Error fetching movies: ", error);
        }
      } else {
        try {
          const movies = await fetchMoviesByTitle(searchTerm);
          movieContainer.innerHTML = "";
          movies.forEach((movie) => {
            const movieCard = createMovieCard(movie);
            movieContainer.appendChild(movieCard);
          });
          const movieTitles = movies.map((movie) => movie.title);
          autocomplete(searchBar, movieTitles);
        } catch (error) {
          console.error("Error fetching movies by title: ", error);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
})();
