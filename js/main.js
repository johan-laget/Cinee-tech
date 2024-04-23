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

/*=============== SWIPER NEW ===============*/
// let swiperNew = new Swiper(".new__swiper", {
//   loop: true,
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: 2,

//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },

//   breakpoints: {
//     440: {
//       centeredSlides: false,
//       slidesPerView: "auto",
//     },
//     768: {
//       centeredSlides: false,
//       slidesPerView: 4,
//     },
//     1200: {
//       centeredSlides: false,
//       slidesPerView: 5,
//     },
//   },
// });

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

      const movieData = document.createElement("div");
      movieData.classList.add("card__data");

      const movieTitle = document.createElement("h3");
      movieTitle.classList.add("card__name");
      movieTitle.textContent = movie.title;

      const movieCategory = document.createElement("span");
      movieCategory.classList.add("card__category");
      for (let i = 0; i < movie.genre_ids.length; i++) {
        let genreToAdd = movieGenres.find(
          (genre) => genre.id == movie.genre_ids[i]
        );
        movieCategory.textContent += ` ${genreToAdd.name}`;
      }

      const movieLikeIcon = document.createElement("i");
      movieLikeIcon.classList.add("ri-heart-3-line", "card__like");

      // Append elements
      movieData.appendChild(movieTitle);
      movieData.appendChild(movieCategory);

      movieLink.appendChild(movieImg);
      movieLink.appendChild(movieShadow);
      movieLink.appendChild(movieData);
      movieLink.appendChild(movieLikeIcon);

      movieArticle.appendChild(movieLink);

      movieSwiperContainer.appendChild(movieArticle);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

fetchUpcomingMovies()
  .then((movies) => {
    for (i = 0; i < 1; i++) {
      const bannerArticle = document.createElement("article");
      bannerArticle.className = "banner__card";

      const bannerLink = document.createElement("a");
      bannerLink.className = "banner__link";

      const bannerImg = document.createElement("img");
      bannerImg.className = "banner__img";
      bannerImg.src = `${baseImgUrl}${movies[i].backdrop_path}`;

      const bannerShadow = document.createElement("div");
      bannerShadow.className = "banner__shadow";

      const bannerData = document.createElement("div");
      bannerData.className = "banner__data";

      const bannerTitle = document.createElement("h2");
      bannerTitle.className = "banner__title";
      bannerTitle.textContent = movies[i].title;

      const bannerCategory = document.createElement("span");
      bannerCategory.className = "banner__category";
      for (let i = 0; i < movies[i].genre_ids.length; i++) {
        let genreToAdd = movieGenres.find(
          (genre) => genre.id == movies[i].genre_ids[i]
        );
        bannerCategory.textContent += ` ${genreToAdd.name}`;
      }

      bannerData.appendChild(bannerCategory);
      bannerData.appendChild(bannerTitle);
      bannerLink.appendChild(bannerData);
      bannerLink.appendChild(bannerImg);
      bannerLink.appendChild(bannerShadow);
      bannerArticle.appendChild(bannerLink);
      bannerContainer.appendChild(bannerArticle);
    }
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

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

      const tvsData = document.createElement("div");
      tvsData.className = "new__data card__data";

      const tvsTitle = document.createElement("h3");
      tvsTitle.classList.add("card__name");
      tvsTitle.textContent = tvs.name;

      const tvsCategory = document.createElement("span");
      tvsCategory.classList.add("card__category");
      for (let i = 0; i < tvs.genre_ids.length; i++) {
        let genreToAdd = tvsGenres.find(
          (genre) => genre.id == tvs.genre_ids[i]
        );
        tvsCategory.textContent += ` ${genreToAdd.name}`;
      }

      const tvsLikeIcon = document.createElement("i");
      tvsLikeIcon.classList.add("ri-heart-3-line", "card__like");
      // console.log(tvsCategory);

      // Append elements
      tvsData.appendChild(tvsTitle);
      tvsData.appendChild(tvsCategory);

      tvsLink.appendChild(tvsImg);
      tvsLink.appendChild(tvsShadow);
      tvsLink.appendChild(tvsData);
      tvsLink.appendChild(tvsLikeIcon);

      tvsArticle.appendChild(tvsLink);

      tvsSwiperContainer.appendChild(tvsArticle);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });
