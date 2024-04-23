const genres = [];
const movieContainer = document.getElementById("movie-container");
fetchMovieGenres()
  .then((genres) => {
    const genresArray = [];
    for (let i = 0; i < genres.length; i++) {
      genresArray.push(genres[i]);
    }
    genres = genresArray;
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });

const createMovieCard = (movie) => {
  // Create elements for the card
  const cardArticle = document.createElement("article");
  cardArticle.classList.add("card__article");

  const cardLink = document.createElement("a");
  cardLink.classList.add("card__link");
  cardLink.href = "#"; // You can set the href to link to the movie details page if available

  const cardImg = document.createElement("img");
  cardImg.classList.add("card__img");
  cardImg.src = `${baseImgUrl}${movie.poster_path}`;
  cardImg.alt = movie.title; // Set alt text for accessibility

  const cardShadow = document.createElement("div");
  cardShadow.classList.add("card__shadow");

  const cardData = document.createElement("div");
  cardData.classList.add("card__data");

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card__name");
  cardTitle.textContent = movie.title; // Set movie title

  const cardCategory = document.createElement("span");
  cardCategory.classList.add("card__category");
  // You can set categories, genres, or any other information here

  const cardLikeIcon = document.createElement("i");
  cardLikeIcon.classList.add("ri-heart-3-line", "card__like");

  // Append elements to construct the card
  cardData.appendChild(cardTitle);
  cardData.appendChild(cardCategory); // Append categories if available

  cardLink.appendChild(cardImg);
  cardLink.appendChild(cardShadow);
  cardLink.appendChild(cardData);
  cardLink.appendChild(cardLikeIcon);

  cardArticle.appendChild(cardLink);

  // Return the constructed card
  return cardArticle;
};

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
