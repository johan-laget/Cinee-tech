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
