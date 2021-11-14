const API_KEY = "b19cb0f63912ae924e81e2d6962a5fba";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

function getMovieInfo(movie_id) {
  //fetch information with tmdb API to get movie information
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  // If this function is called through similar movie event hover, then its id is not undefined
  let is_similar_movie = false;
  if (this.id !== undefined) {
    //id = smovie-{id}
    movie_id = this.id.split("-")[1];
    is_similar_movie = true;
  }

  fetch(BASE_URL + "/movie/" + movie_id + "?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //functions defined in moviePage.js
      if (!is_similar_movie) {
        renderMoviePage(data);
      } else if (is_similar_movie) {
        addOverlay(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTrailer(id) {
  //fetch information with tmdb API to get movie videos
  //https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b19cb0f63912ae924e81e2d6962a5fba
  fetch(BASE_URL + "/movie/" + id + "/videos?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      addTrailerSrc(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getMovieCast(id) {
  //fetch information with tmdb API to get movie cast
  //https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b19cb0f63912ae924e81e2d6962a5fba
  fetch(BASE_URL + "/movie/" + id + "/credits?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      renderMovieCast(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getSimilarMovies(id) {
  //fetch information with tmdb API to get similar movies
  //https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=b19cb0f63912ae924e81e2d6962a5fba
  fetch(BASE_URL + "/movie/" + id + "/similar?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      renderSimilarMovies(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//Function that loads upcoming movies dinamically through an API
function getUpcomingMovies() {
  // https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
  fetch(BASE_URL + "/movie/upcoming?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      let upcoming_movies = data.results;
      for (let i = 0; i < upcoming_movies.length; i++) {
        renderUpcomingMovies(upcoming_movies[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Function that loads upcoming series dinamically through an API
function getUpcomingSeries() {}
