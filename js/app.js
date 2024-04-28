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

const fetchVideoMovies = async () => {
  const movies = await fetchUpcomingMovies();
  const id = movies[0].id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=fr-FR
  `;

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
const fetchMoviesByTitle = async (searchTerm, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=fr&page=${page}&api_key=${apiKey}`;

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
const fetchTvsByTitle = async (searchTerm, page = 1) => {
  const url = `https://api.themoviedb.org/3/search/tv?query=${searchTerm}&include_adult=false&language=fr&page=${page}&api_key=${apiKey}`;
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
function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", handleInput);
  inp.addEventListener("keydown", handleKeydown);

  function handleInput(e) {
    var val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    var a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    arr.forEach((item) => {
      if (
        item &&
        item.substr(0, val.length).toUpperCase() == val.toUpperCase()
      ) {
        var b = document.createElement("DIV");
        var strong = document.createElement("strong");
        strong.textContent = item.substr(0, val.length);
        b.appendChild(strong);
        var text = document.createTextNode(item.substr(val.length));
        b.appendChild(text);
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("value", item);
        b.appendChild(input);
        b.addEventListener("click", handleItemClick);
        a.appendChild(b);
      }
    });
  }

  function handleKeydown(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  }

  function handleItemClick(e) {
    inp.value = this.getElementsByTagName("input")[0].value;
    closeAllLists();
  }

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    if (x[currentFocus]) {
      x[currentFocus].classList.toggle("autocomplete-active");
    }
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
const createModal = (movie) => {
  // Retrieve current profile from local storage
  const currentProfile = localStorage.getItem("currentProfile") || "Anonymous";

  const modalHTML = `
    <div class="modal-backdrop">
      <div class="modal-content">
        <span class="modal-close-btn">&times;</span>
        <h2 class="modal-title">${
          movie.title !== undefined ? movie.title : movie.name
        }</h2>
        <p class="modal-description">${movie.overview}</p>
        <div class="modal-comments-container">
          <h3>Comments</h3>
          <ul class="modal-comments-list"></ul>
        </div>
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
    const comment = commentBox.value.trim();
    if (comment !== "") {
      addComment(movie.id, comment, currentProfile);
      commentBox.value = ""; // Clear the comment box after submitting
    }
  });

  // Function to add comment to local storage and list
  function addComment(movieId, comment, profile) {
    // Get existing comments for the movie from local storage
    let movieComments = localStorage.getItem(`movieComments_${movieId}`);
    movieComments = movieComments ? JSON.parse(movieComments) : [];

    // Add the new comment with profile info
    const commentWithProfile = { comment, profile };
    movieComments.push(commentWithProfile);

    // Update local storage with the new comments
    localStorage.setItem(
      `movieComments_${movieId}`,
      JSON.stringify(movieComments)
    );

    // Update the comments list
    renderComments(movieId);
  }

  // Function to render comments from local storage
  function renderComments(movieId) {
    const commentList = document.querySelector(".modal-comments-list");
    commentList.innerHTML = ""; // Clear existing comments

    // Retrieve comments for the movie from local storage
    let movieComments = localStorage.getItem(`movieComments_${movieId}`);
    movieComments = movieComments ? JSON.parse(movieComments) : [];

    // Add each comment to the list
    movieComments.forEach((commentObj) => {
      const li = document.createElement("li");
      li.textContent = `${commentObj.profile}: ${commentObj.comment}`;
      commentList.appendChild(li);
    });
  }

  // Call renderComments when modal is created to display existing comments for this movie
  renderComments(movie.id);
};
