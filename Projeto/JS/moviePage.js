//function that render movie Page with data supplied in APIfetch.js file
function renderMoviePage(data) {
  //render banner image
  const banner_img = document.getElementById("banner-img");
  banner_img.src = BASE_IMG_URL + data.poster_path;

  //render rating and keywords
  let rating = document.getElementById("rating");
  rating.textContent = data.vote_average + " / 10.0";

  //render movie header
  const movie_header = document.getElementById("movie-name-header");
  movie_header.textContent = data.original_title;

  //render movie year and time
  const movie_year = document.getElementById("movie-year");
  var date_array = data.release_date.split("-");
  movie_year.textContent = date_array[0];

  let p_movie_time = document.createElement("p");
  const movie_time = data.runtime;
  //parse minutes into hours and minutes
  let movie_hours = Math.floor(movie_time / 60);
  let movie_minuts = movie_time % 60;
  let movie_time_displayed = "00h00m";
  if (movie_hours === 0) {
    movie_time_displayed = movie_minuts + "m";
  } else {
    movie_time_displayed = movie_hours + "h " + movie_minuts + "m";
  }
  p_movie_time.textContent = movie_time_displayed;
  p_movie_time.className = "movie-year-time";
  const year_and_time_div = document.getElementById("year_and_time");
  year_and_time_div.append(p_movie_time);

  //render movie description
  const movie_description = document.getElementById("movie-description");
  movie_description.textContent = data.overview;

  //render movie genres
  const genres_div = document.getElementById("genres");
  let genres = data.genres;
  for (let i = 0; i < genres.length; i++) {
    let p_genre = document.createElement("p");
    p_genre.textContent = genres[i].name;
    genres_div.append(p_genre);
  }

  //process the cast information
  getMovieCast(data.id);
}

function addTrailerSrc(data) {
  //add src to trailer
  const modal_body = document.getElementById("modal-body");
  let trailer = document.getElementById("video-frame");

  let trailer_found = false;
  //can be retrieved more than one trailer, so stop on the first one
  for (let i = 0; i < data.results.length; i++) {
    if (
      data.results[i].type === "Trailer" &&
      data.results[i].site === "YouTube"
    ) {
      trailer.src = "https://www.youtube.com/embed/" + data.results[i].key;
      modal_body.append(trailer);
      trailer_found = true;
      break;
    }
  }

  //If a trailer is not found
  if (!trailer_found) {
    modal_body.style.backgroundColor = "white";
    modal_body.innerHTML = "Trailer not found";
  }
}

//FUNCTION THAT RENDERS 6 ACTORS
function renderMovieCast(data) {
  const cast = document.getElementById("cast");

  //cicle that puts 6 actors into the cast. (I chose 6 because almost every movie doesn't have more than 6 important actors)
  for (let i = 0; i < 6; i++) {
    let artist = data.cast[i];
    //In the API response, writers come in as cast members, so I ignore them
    let div_popover = document.createElement("div");
    div_popover.className = "popover-custom";
    let a_actor = document.createElement("a");
    a_actor.className = "a_actor";
    //href to the personal actor page
    a_actor.href = "./actorPage.html?id=" + artist.id;
    a_actor.textContent = artist.name;
    div_popover.append(a_actor);

    // Some images might not be found
    if (artist.profile_path !== null) {
      let actor_img = document.createElement("img");
      actor_img.src = BASE_IMG_URL + artist.profile_path;
      div_popover.append(actor_img);
    }

    cast.append(div_popover);
  }
}

//FUNCTION THAT RENDERS 5 SIMILAR MOVIES
function renderSimilarMovies(data) {
  const similar_movies_div = document.getElementById("flex-similar-movies");
  //render only 5 similar movies
  for (let i = 0; i < 5; i++) {
    let similar_movie = document.createElement("div");
    let image_url = BASE_IMG_URL + data.results[i].poster_path;
    //add movie image as background
    similar_movie.style.backgroundImage =
      "linear-gradient(rgba(34, 34, 34, 0.5)," +
      "rgba(34, 34, 34, 0.5)), url(" +
      image_url +
      ")";
    similar_movie.className = "similar-movie-div";
    similar_movie.id = "smovie-" + data.results[i].id;

    //add event listener when hover, appears info
    similar_movie.addEventListener("mouseenter", addOverlay);
    //add event listener when leaves, deletes info
    similar_movie.addEventListener("mouseleave", removeOverlay);
    //add event listener when clicked, redirects to page
    similar_movie.addEventListener("click", () => {
      location.href = "./moviePage.html?id=" + data.results[i].id;
    });

    similar_movies_div.append(similar_movie);
  }
}

//FUNCTION THAT ADDS MOVIE INFO ON SIMILAR MOVIES
function addOverlay() {
  const similar_movie = document.getElementById(this.id);

  let p_center = document.createElement("p");
  p_center.textContent = "More Details";
  p_center.className = "smovie-more-info";
  p_center.id = "smovie-more-info-" + this.id.split("-")[1];

  similar_movie.append(p_center);
}

//FUNCTION THAT ADDS MOVIE INFO ON SIMILAR MOVIES
function removeOverlay() {
  let similar_movie_more_info = document.getElementById(
    "smovie-more-info-" + this.id.split("-")[1]
  );
  similar_movie_more_info.remove();
}
