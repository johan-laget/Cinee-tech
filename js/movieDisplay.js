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
  const modalHTML = `
    <div class="modal-backdrop">
      <div class="modal-content">
        <span class="modal-close-btn">&times;</span>
        <h2 class="modal-title">${movie.title}</h2>
        <p class="modal-description">${movie.overview}</p>
        <p class="modal-commantaire">Commentaire:</p>
        <textarea class="modal-comment-box" placeholder="Ajoutez votre commentaire ici..."></textarea>
        <button class="modal-submit-comment">Soumettre</button>
      </div>
    </div>
  `;

  const modalElement = document.createElement("div");
  modalElement.innerHTML = modalHTML;

  document.body.appendChild(modalElement);

  const modalBackdrop = document.querySelector(".modal-backdrop");
  const closeModalBtn = document.querySelector(".modal-close-btn");
  closeModalBtn.addEventListener("click", () => {
    document.body.removeChild(modalElement);
  });

  const modalContent = document.querySelector(".modal-content");
  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalBackdrop.addEventListener("click", () => {
    document.body.removeChild(modalBackdrop);
  });

  const submitCommentButton = document.querySelector(".modal-submit-comment");
  submitCommentButton.addEventListener("click", () => {
    const commentBox = document.querySelector(".modal-comment-box");
    console.log("Commentaire soumis : " + commentBox.value);
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
