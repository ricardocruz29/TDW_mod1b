const API_KEY = "b19cb0f63912ae924e81e2d6962a5fba";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

function getMovieInfo(movie_id) {
  //fetch information with tmdb API to get movie information
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  fetch(BASE_URL + "/movie/" + movie_id + "?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //functions defined in moviePage.js
      renderMoviePage(data);
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
      for (let i = 0; i < 6; i++) {
        renderUpcomingMovies(upcoming_movies[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Function that gets all the movies (with filters or not)
function getMovies(page) {
  let first_time = false;
  if (page === undefined) {
    page = 1;
    first_time = true;
  }

  // https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<<api_key>>&language=en-US&page=1
  fetch(
    BASE_URL +
      "/discover/movie?sort_by=popularity.desc&api_key=" +
      API_KEY +
      "&page=" +
      page
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in movie.js
      //It comes with pagination
      if (first_time) {
        renderPaginator(data.total_pages, "all");
      }

      for (let i = 0; i < data.results.length; i++) {
        renderMovieCard(data.results[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function getMoviesFiltered(type, page) {
  let first_time = false;
  if (page === undefined) {
    page = 1;
    first_time = true;
  }

  if (type === "search") {
    let search_value = document.getElementById("input-search-by-title").value;
    if (search_value.length === 0) {
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";
      const paginator_numbers = document.querySelectorAll(".pag-number");
      for (let i = 0; i < paginator_numbers.length; i++) {
        paginator_numbers[i].remove();
      }
      getMovies();
    } else {
      // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=avengers&page=1

      fetch(
        BASE_URL +
          "/search/movie?api_key=" +
          API_KEY +
          "&query=" +
          search_value +
          "&page=" +
          page
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //function defined in movie.js
          //It comes with pagination
          if (first_time) {
            const movies_flex = document.getElementById("movies-flex");
            movies_flex.innerHTML = "";
            const paginator_numbers = document.querySelectorAll(".pag-number");
            console.log(paginator_numbers);

            for (let i = 0; i < paginator_numbers.length; i++) {
              paginator_numbers[i].remove();
            }
            renderPaginator(data.total_pages, "search");
          }

          for (let i = 0; i < data.results.length; i++) {
            renderMovieCard(data.results[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else if (type === "secondarysearch") {
    let year_active = document.querySelector(".year-active");
    let genre_active = document.querySelector(".genre-active");
    let sort_active = document.querySelector(".sort-active");

    //https://api.themoviedb.org/3/discover/movie?api_key=b19cb0f63912ae924e81e2d6962a5fba&sort_by=popularity.desc&page=1&with_genres=383&year=2000

    let url =
      BASE_URL +
      "/discover/movie?api_key=" +
      API_KEY +
      "&sort_by=" +
      sort_active.value +
      "&page=" +
      page;

    if (parseInt(genre_active.value) !== -1) {
      url += "&with_genres=" + genre_active.value;
    }
    if (year_active.value !== "all") {
      let years = year_active.value.split("-");
      if (years.length > 1) {
        //&release_date.gte=2021-01-01&release_date.lte=2021-12-31
        let release_date_gte = years[1] + "-01-01";
        let release_date_lte = years[0] + "-12-31";
        url +=
          "&release_date.gte=" +
          release_date_gte +
          "&release_date.lte=" +
          release_date_lte;
      } else {
        let year = years[0];
        url += "&year=" + year;
      }
    }

    console.log(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //function defined in movie.js
        //It comes with pagination
        if (first_time) {
          const movies_flex = document.getElementById("movies-flex");
          movies_flex.innerHTML = "";
          const paginator_numbers = document.querySelectorAll(".pag-number");
          console.log(paginator_numbers);

          for (let i = 0; i < paginator_numbers.length; i++) {
            paginator_numbers[i].remove();
          }
          renderPaginator(data.total_pages, "secondarysearch");
        }

        for (let i = 0; i < data.results.length; i++) {
          renderMovieCard(data.results[i]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// function getMoviesSecondaryFiltered(type, page) {
//   let first_time = false;
//   if (page === undefined) {
//     page = 1;
//     first_time = true;
//   }

//   if (type === "search") {
//     let search_value = document.getElementById("input-search-by-title").value;
//     if (search_value.length === 0) {
//       const movies_flex = document.getElementById("movies-flex");
//       movies_flex.innerHTML = "";
//       const paginator_numbers = document.querySelectorAll(".pag-number");
//       for (let i = 0; i < paginator_numbers.length; i++) {
//         paginator_numbers[i].remove();
//       }
//       getMovies();
//     } else {
//       // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=avengers&page=1

//       fetch(
//         BASE_URL +
//           "/search/movie?api_key=" +
//           API_KEY +
//           "&query=" +
//           search_value +
//           "&page=" +
//           page
//       )
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           //function defined in movie.js
//           //It comes with pagination
//           if (first_time) {
//             const movies_flex = document.getElementById("movies-flex");
//             movies_flex.innerHTML = "";
//             const paginator_numbers = document.querySelectorAll(".pag-number");
//             console.log(paginator_numbers);

//             for (let i = 0; i < paginator_numbers.length; i++) {
//               paginator_numbers[i].remove();
//             }
//             renderPaginator(data.total_pages, "search");
//           }

//           for (let i = 0; i < data.results.length; i++) {
//             renderMovieCard(data.results[i]);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }
// }
