const movieContainer = document.getElementById("movie-container");
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
const createModal = (movie) => {
  const modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("modal-backdrop");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalCloseBtn = document.createElement("span");
  modalCloseBtn.classList.add("modal-close-btn");
  modalCloseBtn.innerHTML = "&times;";

  const modalTitle = document.createElement("h2");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = movie.title;

  const modalDescription = document.createElement("p");
  modalDescription.classList.add("modal-description");
  modalDescription.textContent = movie.overview;

  modalContent.appendChild(modalCloseBtn);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalBackdrop.appendChild(modalContent);

  document.body.appendChild(modalBackdrop);

  modalCloseBtn.addEventListener("click", () => {
    document.body.removeChild(modalBackdrop);
  });

  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalBackdrop.addEventListener("click", () => {
    document.body.removeChild(modalBackdrop);
  });
};

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

  cardShadow.addEventListener("click", () => {
    console.log("hello");
    createModal(movie);
  });
  console.log("card create");

  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardShadow);
  cardLink.appendChild(cardLikeIcon);

  cardArticle.appendChild(cardLink);

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

    searchBar.addEventListener("keyup", (event) => {
      if (searchBar.value === "") {
        movieContainer.innerHTML = "";
        fetchApiMovies()
          .then((movies) => {
            movies.forEach((movie) => {
              // Create card for each movie
              const movieCard = createMovieCard(movie);
              // Append the card to the container
              movieContainer.appendChild(movieCard);
            });
          })
          .catch((error) => {
            console.error("Error fetching movies: ", error);
          });
      } else {
        movieContainer.innerHTML = "";
        let searchTerm = searchBar.value;
        fetchMoviesByTitle(searchTerm)
          .then((movies) => {
            movies.forEach((movie) => {
              const movieCard = createMovieCard(movie);
              movieContainer.appendChild(movieCard);
            });
          })
          .catch((error) => {
            console.error("Error fetching movies: ", error);
          });
      }
    });
  } catch (error) {
    console.error("Error fetching genres: ", error);
  }
})();
