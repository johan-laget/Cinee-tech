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

const favMoviesContainer = document.getElementById("fav-movies-container");
const favTvsContainer = document.getElementById("fav-tvs-container");
const currentProfile = localStorage.getItem("currentProfile");
const favMovies = JSON.parse(
  localStorage.getItem(`${currentProfile}_movieFavorites`)
);
const favTvShows = JSON.parse(
  localStorage.getItem(`${currentProfile}_tvFavorites`)
);

// Function to display movie favorites
const displayMovieFavorites = async () => {
  if (favMovies && favMovies.length > 0) {
    favMoviesContainer.innerHTML = ""; // Clear previous content
    favMovies.forEach(async (id) => {
      const movie = await fetchMoviesById(id);
      const movieArticle = document.createElement("article");
      movieArticle.className = "card__article swiper-slide";

      const movieLink = document.createElement("a");
      movieLink.classList.add("card__link");

      const movieImg = document.createElement("img");
      movieImg.classList.add("card__img");
      movieImg.src = `${baseImgUrl}${movie.backdrop_path}`;
      movieImg.alt = `${movie.title} image`;

      const movieShadow = document.createElement("div");
      movieShadow.classList.add("card__shadow");
      movieShadow.addEventListener("click", () => {
        createModal(movie);
      });

      movieLink.appendChild(movieImg);
      movieLink.appendChild(movieShadow);

      movieArticle.appendChild(movieLink);
      favMoviesContainer.appendChild(movieArticle);
    });
  } else {
    // Display message if no movie favorites
    favMoviesContainer.innerHTML =
      "<p>Vous n'avez pas encore ajouté de film à vos favoris</p>";
  }
};

// Function to display TV show favorites
const displayTvShowFavorites = async () => {
  if (favTvShows && favTvShows.length > 0) {
    favTvsContainer.innerHTML = ""; // Clear previous content
    favTvShows.forEach(async (id) => {
      const tvs = await fetchTvsById(id);
      const tvsArticle = document.createElement("article");
      tvsArticle.className = "new__card card__article swiper-slide";

      const tvsLink = document.createElement("a");
      tvsLink.classList.add("card__link");

      const tvsImg = document.createElement("img");
      tvsImg.classList.add("card__img");
      tvsImg.src = `${baseImgUrl}${tvs.backdrop_path}`;
      tvsImg.alt = `${tvs.title} image`;

      const tvsShadow = document.createElement("div");
      tvsShadow.classList.add("card__shadow");
      tvsShadow.addEventListener("click", () => {
        createModal(tvs);
      });
      tvsLink.appendChild(tvsImg);
      tvsLink.appendChild(tvsShadow);
      tvsArticle.appendChild(tvsLink);
      favTvsContainer.appendChild(tvsArticle);
    });
  } else {
    // Display message if no TV show favorites
    favTvsContainer.innerHTML =
      "<p>Vous n'avez pas encore ajouté de série à vos favoris</p>";
  }
};

// Call the functions to display favorites
displayMovieFavorites();
displayTvShowFavorites();
