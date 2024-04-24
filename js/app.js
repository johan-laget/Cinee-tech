const apiKey = "8c4b867188ee47a1d4e40854b27391ec";
const baseImgUrl = "https://image.tmdb.org/t/p/w400";

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
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=fr&api_key=${apiKey}`;

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

const fetchApiMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=fr&api_key=${apiKey}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    data.results.push(data.page);
    data.results.push(data.total_pages);
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const fetchUpcomingMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=fr&api_key=${apiKey}`;

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
 * Fetches movie data from an API based on a given search term.
 * @param {string} searchTerm - The term to search for movies.
 * @returns {Promise<Array>} - An array of movie objects that match the search term. If there is an error during the API request, an empty array is returned.
 */
const fetchMoviesByTitle = async (searchTerm) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=fr&page=1&api_key=${apiKey}`;

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
  const url = `https://api.themoviedb.org/3/movie/${id}?language=fr&api_key=${apiKey}`;

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

const fetchTvsGenres = async () => {
  const url = `https://api.themoviedb.org/3/genre/tv/list?language=fr&api_key=${apiKey}`;

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

const fetchApiTvs = async () => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=fr&page=1&api_key=${apiKey}&sort_by=popularity.desc`;
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
  const url = `https://api.themoviedb.org/3/tv/${id}?language=fr&api_key=${apiKey}`;
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
  const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=fr&page=1&api_key=${apiKey}`;
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
