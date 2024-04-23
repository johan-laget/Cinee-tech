const apiKey = "8c4b867188ee47a1d4e40854b27391ec";
const baseImgUrl = "https://image.tmdb.org/t/p/w500";
const movieSwiperContainer = document.getElementById("movie_swiper_container");
let movieGenres = [];

/**
 * Retrieves a guest session token from the MovieDB API.
 * @returns {Promise<Object>} The guest session token data received from the MovieDB API.
 * @throws {Error} If there is an HTTP error during the request.
 */
const getGuestToken = async () => {
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
/**
 * Fetches movie data from an API using an API key.
 * @returns {Promise<Array>} An array of movie objects.
 * @throws {Error} If there is an HTTP error or an error occurs during the fetch.
 */

const fetchMovieGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=8c4b867188ee47a1d4e40854b27391ec`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
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

const fetchApiMovies = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
fetchApiMovies()
  .then((movies) => {
    movies.forEach((movie, index) => {
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
      console.log(movieCategory);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

/**
 * Fetches movie data from an API based on a given search term.
 * @param {string} searchTerm - The term to search for movies.
 * @returns {Promise<Array>} - An array of movie objects that match the search term. If there is an error during the API request, an empty array is returned.
 */
const fetchMoviesByTitle = async (searchTerm) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

/**
 * Fetches movie data from an API using the provided movie ID.
 * @param {number} id - The ID of the movie to fetch.
 * @returns {Promise<object>} - The fetched movie data as an object.
 */
const fetchMoviesById = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

/**
 * Fetches tv shows data from an API using an API key.
 * @returns {Promise<Array>} An array of tv shows objects.
 * @throws {Error} If there is an HTTP error or an error occurs during the fetch.
 */
const fetchApiTvs = async () => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&api_key=${apiKey}&sort_by=popularity.desc`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch {
    console.error("Error fetching data: ", error);
    return [];
  }
};

/**
 * Fetches Tv shows data from an API using the provided Tvs ID.
 * @param {number} id - The ID of the tv show to fetch.
 * @returns {Promise<object>} - The fetched tv show data as an object.
 */
const fetchTvsById = async (id) => {
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching data: ", error);
    return [];
  }
};

/**
 * Fetches tv show data from an API based on a given search term.
 * @param {string} searchTerm - The term to search for tv shows.
 * @returns {Promise<Array>} - An array of tv shows objects that match the search term. If there is an error during the API request, an empty array is returned.
 */
const fetchTvsByTitle = async (searchTerm) => {
  const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};
