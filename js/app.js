const apiKey = "8c4b867188ee47a1d4e40854b27391ec";

/**
 * Fetches movie data from an API using an API key.
 * @returns {Promise<Array>} An array of movie objects.
 * @throws {Error} If there is an HTTP error or an error occurs during the fetch.
 */
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
    for (let i = 0; i < movies.length; i++) {}
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
fetchMoviesById(22)
  .then((movie) => {})
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

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

getGuestToken()
  .then((data) => {
    console.log(data.guest_session_id);
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });
