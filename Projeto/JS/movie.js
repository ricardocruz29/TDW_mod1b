//data retrieved from https://api.themoviedb.org/3/genre/movie/list?api_key=b19cb0f63912ae924e81e2d6962a5fba
//Since genres don't usually change, decided to get them and here manually. Could also be stored on the local storage
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

//This function is called from APIfetch.js, and for each movie it will render a card that contains the data (movieInfo)
function renderMovieCard(data) {
  //flex container that contains all movies
  const movies_flex = document.getElementById("movies-flex");

  let movie_card = document.createElement("div");
  movie_card.className = "movie-card";

  //add movie image as background
  let image_url = BASE_IMG_URL + data.poster_path;
  let img_test = document.createElement("img");
  img_test.src = image_url;

  //add movie info, hidden
  let movie_info = document.createElement("div");
  movie_info.className = "movie-card-info";

  let movie_name = document.createElement("h3");
  movie_name.textContent = data.title;
  movie_name.className = "movie-card-title";

  let movie_description = document.createElement("p");
  movie_description.textContent = data.overview;
  movie_description.className = "movie-card-description";

  const genres_div = document.createElement("div");
  genres_div.className = "genres_div";
  //in the data, genres come as id's. Run all the genres that come in data, and then in the const defined above,
  //and check which are equal. This way we can get the name of the genres of the movie
  for (let i = 0; i < data.genre_ids.length; i++) {
    for (let j = 0; j < genres.length; j++) {
      if (parseInt(data.genre_ids[i]) === parseInt(genres[j].id)) {
        let p_genre = document.createElement("p");
        p_genre.textContent = genres[j].name;
        genres_div.append(p_genre);
      }
    }
  }

  //render movie year
  let movie_year = document.createElement("div");
  var date_array = data.release_date.split("-");
  movie_year.textContent = date_array[0];
  movie_year.className = "movie-card-year";

  //render rating
  let movie_rating = document.createElement("div");
  movie_rating.className = "movie-card-rating";
  //render the icon
  movie_rating.innerHTML =
    "<svg " +
    'xmlns="http://www.w3.org/2000/svg"' +
    'class="rating-logo"' +
    'viewBox="0 0 20 20"' +
    'fill="currentColor">' +
    '<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />' +
    "</svg>";
  let rating = document.createElement("i");
  rating.textContent = data.vote_average + "/10.0";
  movie_rating.append(rating);

  //add movie year and movie rating to a flex container, with space-between
  let movie_year_rating = document.createElement("div");
  movie_year_rating.className = "movie-card-year-rating";
  movie_year_rating.append(movie_year);
  movie_year_rating.append(movie_rating);

  //add info to movie_info
  movie_info.append(movie_name);
  movie_info.append(movie_description);
  movie_info.append(genres_div);
  movie_info.append(movie_year_rating);

  //onclick in the card, redirects to movie page
  movie_card.addEventListener("click", () => {
    location.href = "./moviePage.html?id=" + data.id;
  });

  //add image and movie info to the card
  movie_card.append(img_test);
  movie_card.append(movie_info);
  //add movie card to the flex container
  movies_flex.append(movie_card);
}

//add event listeners to the search by title
function addSearchFilterEventListeners() {
  //Search input doesn't work at the same time with other filters (API doesn't allow it)
  const search_input = document.getElementById("input-search-by-title");

  search_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      //This function, basically puts the dropdowns in default values (because this filters won't work together with the search input)
      makeDropdownsDefault();
      getMovies("search");
    }
  });
  const btn_search = document.getElementById("btn-search-by-title");
  btn_search.addEventListener("click", () => {
    makeDropdownsDefault();
    getMovies("search");
  });

  //This event listener, happens the first time the user clicks on the search input, and inserts an alert that warns the user that search input doesn't work together with the other filters
  search_input.addEventListener("click", () => {
    //if alert is null, it means the user already saw the warning and closed it. This way, the warning only appears the first time the user clicks to write the movie name
    if (alert !== null) {
      let alert = document.getElementById("alert");
      alert.style.display = "flex";
    }
  });
}

//function that adds for each dropdown item, an event listener
function addYearEventListeners() {
  const years = document.getElementById("ul-year").children;
  for (let i = 0; i < years.length; i++) {
    years[i].addEventListener("click", (event) => {
      //get the previous active and remove its class
      let year_prev_active = document.querySelector(".year-active");
      year_prev_active.classList.remove("year-active");

      event.target.classList.add("year-active");
      getMovies("secondarysearch");
    });
  }
}

function addSortEventListeners() {
  const sorts = document.getElementById("ul-sort").children;
  for (let i = 0; i < sorts.length; i++) {
    sorts[i].addEventListener("click", (event) => {
      console.log("entrei");
      //get the previous active and remove its class
      let sort_prev_active = document.querySelector(".sort-active");
      sort_prev_active.classList.remove("sort-active");

      event.target.classList.add("sort-active");
      getMovies("secondarysearch");
    });
  }
}

//function to add genres to the dropdown
function addGenres() {
  const ul_genres = document.getElementById("ul-genre");
  for (let i = 0; i < genres.length; i++) {
    let li = document.createElement("li");
    let button_genre = document.createElement("button");
    button_genre.className = "dropdown-item";
    button_genre.type = "button";
    button_genre.textContent = genres[i].name;
    button_genre.value = genres[i].id;

    button_genre.addEventListener("click", (event) => {
      //get the previous active and remove its class
      let genre_prev_active = document.querySelector(".genre-active");
      genre_prev_active.classList.remove("genre-active");

      event.target.classList.add("genre-active");
      getMovies("secondarysearch");
    });
    li.append(button_genre);
    ul_genres.append(li);
  }
}

//this function is called when the user enters in the movies Page.
function clearFilters() {
  if (document.getElementById("input-search-by-title").value !== "") {
    document.getElementById("input-search-by-title").value = "";
  }
}

function makeDropdownsDefault() {
  let year_active = document.querySelector(".year-active");
  let genre_active = document.querySelector(".genre-active");
  let sort_active = document.querySelector(".sort-active");
  //get the default values of the dropdowns
  let sort_default = document.getElementById("sort-default");
  let year_default = document.getElementById("year-default");
  let genre_default = document.getElementById("genre-default");
  sort_active.classList.remove("sort-active");
  year_active.classList.remove("year-active");
  genre_active.classList.remove("genre-active");
  sort_default.classList.add("sort-active");
  year_default.classList.add("year-active");
  genre_default.classList.add("genre-active");
}
