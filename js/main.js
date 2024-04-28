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
/*=============== SWIPER BANNER ===============*/

/*=============== SWIPER MOVIE ===============*/
let swiperMovies = new Swiper(".movie__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 24,
  breakpoints: {
    440: {
      slidesPerView: "auto",
    },
    768: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
/*=============== SWIPER TvShows ===============*/

let swiperTvShows = new Swiper(".tvs__swiper", {
  loop: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: 24,
  breakpoints: {
    440: {
      slidesPerView: "auto",
    },
    768: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};
window.addEventListener("scroll", blurHeader);

const movieSwiperContainer = document.getElementById("movie_swiper_container");
const tvsSwiperContainer = document.getElementById("tvs_swiper_container");
const bannerContainer = document.getElementById("banner");
let movieGenres = [];
let tvsGenres = [];

fetchMovieGenres()
  .then((genres) => {
    const genresArray = [];
    for (let i = 0; i < genres.length; i++) {
      genresArray.push(genres[i]);
    }
    movieGenres = genresArray;
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

fetchApiMovies()
  .then((movies) => {
    // Retrieve favorites list from local storage
    const selectedProfile = localStorage.getItem("currentProfile");
    const favorites = JSON.parse(localStorage.getItem(selectedProfile)) || [];

    movies.pop();
    movies.pop();
    movies.forEach((movie) => {
      // Create elements
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

      const movieLikeIcon = document.createElement("i");
      movieLikeIcon.classList.add("ri-heart-3-line", "card__like");
      movieLikeIcon.id = movie.id;

      // Check if movie is in favorites list and set icon accordingly
      if (favorites.includes(movie.id)) {
        movieLikeIcon.classList.add("ri-heart-fill");
      }

      movieLikeIcon.addEventListener("click", () => {
        // Toggle favorite status and update local storage
        if (!selectedProfile) {
          alert("Veuillez sélectionner un profil.");
          return;
        }
        const movieId = movie.id;
        const movieIndex = favorites.indexOf(movieId);
        if (movieIndex === -1) {
          favorites.push(movieId);
          movieLikeIcon.classList.add("ri-heart-fill");
          alert("Film ajouté aux favoris.");
        } else {
          favorites.splice(movieIndex, 1);
          movieLikeIcon.classList.remove("ri-heart-fill");
          alert("Film supprimé des favoris.");
        }
        localStorage.setItem(selectedProfile, JSON.stringify(favorites));
      });

      // Append elements
      movieLink.appendChild(movieImg);
      movieLink.appendChild(movieShadow);
      movieLink.appendChild(movieLikeIcon);

      movieArticle.appendChild(movieLink);

      movieSwiperContainer.appendChild(movieArticle);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

fetchVideoMovies().then((video) => {});

fetchTvsGenres()
  .then((genres) => {
    const genresArray = [];
    for (let i = 0; i < genres.length; i++) {
      genresArray.push(genres[i]);
    }
    tvsGenres = genresArray;
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

fetchApiTvs()
  .then((Tvs) => {
    // Retrieve favorites list from local storage
    const selectedProfile = localStorage.getItem("currentProfile");
    const favorites = JSON.parse(localStorage.getItem(selectedProfile)) || [];

    Tvs.pop();
    Tvs.pop();
    Tvs.forEach((tvs, index) => {
      // Create elements
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

      const tvsLikeIcon = document.createElement("i");
      tvsLikeIcon.classList.add("ri-heart-3-line", "card__like");
      tvsLikeIcon.id = tvs.id;

      // Check if TV show is in favorites list and set icon accordingly
      if (favorites.includes(tvs.id)) {
        tvsLikeIcon.classList.add("ri-heart-fill");
      }

      tvsLikeIcon.addEventListener("click", () => {
        // Toggle favorite status and update local storage
        if (!selectedProfile) {
          alert("Veuillez sélectionner un profil.");
          return;
        }
        const tvsId = tvs.id;
        const tvsIndex = favorites.indexOf(tvsId);
        if (tvsIndex === -1) {
          favorites.push(tvsId);
          tvsLikeIcon.classList.add("ri-heart-fill");
          alert("Série ajoutée aux favoris.");
        } else {
          favorites.splice(tvsIndex, 1);
          tvsLikeIcon.classList.remove("ri-heart-fill");
          alert("Série supprimée des favoris.");
        }
        localStorage.setItem(selectedProfile, JSON.stringify(favorites));
      });

      // Append elements
      tvsLink.appendChild(tvsImg);
      tvsLink.appendChild(tvsShadow);
      tvsLink.appendChild(tvsLikeIcon);

      tvsArticle.appendChild(tvsLink);

      tvsSwiperContainer.appendChild(tvsArticle);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });
