//data retrieved from https://api.themoviedb.org/3/genre/movie/list?api_key=b19cb0f63912ae924e81e2d6962a5fba
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

function renderMovieCard(data) {
  const movies_flex = document.getElementById("movies-flex");
  // movies_flex.innerHTML = "";

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
  //and check which are equal. This way we can get the genres of the movie
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
