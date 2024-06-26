const movieContainer = document.getElementById("movie-container");
const searchBar = document.getElementById("searchbar");
const selectedProfile = localStorage.getItem("currentProfile");
let movieFavorites =
  JSON.parse(localStorage.getItem(`${selectedProfile}_movieFavorites`)) || [];
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
  cardLink.href = "#";

  const cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.src = `${baseImgUrl}${movie.poster_path}`;
  cardImg.alt = movie.title;

  const cardShadow = document.createElement("div");
  cardShadow.classList.add("card__shadow");

  const cardLikeIcon = document.createElement("i");
  cardLikeIcon.classList.add("ri-heart-3-line", "card__like");
  cardLikeIcon.id = movie.id;
  if (movieFavorites.includes(movie.id)) {
    cardLikeIcon.classList.add("ri-heart-fill");
  }

  cardLikeIcon.addEventListener("click", () => {
    if (!selectedProfile) {
      alert("Veuillez sélectionner un profil.");
      return;
    }
    const movieId = movie.id;
    const movieIndex = movieFavorites.indexOf(movieId);
    if (movieIndex === -1) {
      movieFavorites.push(movieId);
      cardLikeIcon.classList.add("ri-heart-fill");
      alert("Film ajouté aux favoris.");
    } else {
      movieFavorites.splice(movieIndex, 1);
      cardLikeIcon.classList.remove("ri-heart-fill");
      alert("Film supprimé des favoris.");
    }
    localStorage.setItem(
      `${selectedProfile}_movieFavorites`,
      JSON.stringify(movieFavorites)
    );
  });

  cardShadow.addEventListener("click", () => {
    createModal(movie);
  });

  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardShadow);
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
                const movies = await fetchMoviesByTitle(searchTerm, page);
                totalPages = movies.pop();
                currentPage = movies.pop();
                movieContainer.innerHTML = "";
                movies.forEach((movie) => {
                  const movieCard = createMovieCard(movie);
                  movieContainer.appendChild(movieCard);
                });
                renderPagination();
              } catch (error) {
                console.error("Error fetching movies: ", error);
              }
            }
          }
        } else {
          if (event.target.tagName === "BUTTON") {
            const page = parseInt(event.target.dataset.page);
            currentPage = page;
            if (!isNaN(page)) {
              try {
                const movies = await fetchApiMovies(page);
                totalPages = movies.pop();
                currentPage = movies.pop();
                movieContainer.innerHTML = "";
                movies.forEach((movie) => {
                  const movieCard = createMovieCard(movie);
                  movieContainer.appendChild(movieCard);
                });
                renderPagination();
              } catch (error) {
                console.error("Error fetching movies: ", error);
              }
            }
          }
        }
      });
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
})();
