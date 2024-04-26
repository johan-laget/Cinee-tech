const fetchApiMovie = async (movieId) => {
  const apiKey = "39787069cfe20f504fbbf4f3df331d89";
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

fetchApiMovie(11);

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

const fetchApiTvs = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=fr&page=${page}&api_key=${apiKey}&sort_by=vote_count.desc`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    data.results.push(data.page);
    data.results.push(data.total_pages);
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

function autocomplete(inp, arr) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x) return false;
    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /* add class "autocomplete-active" if the element is defined: */
    if (x[currentFocus]) {
      x[currentFocus].classList.add("autocomplete-active");
    }
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

