//THIS FILE CONTAINS ALL THE FUNCTIONS THAT PERFORM FETCH INTO THE EXTERNAL API

const API_KEY = "b19cb0f63912ae924e81e2d6962a5fba";
const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

//FUNCTION THAT FOR A SPECIFIC MOVIE, GETS ALL THE INFO. IT IS CALLED IN SCRIPT.JS FOR THE "MOVIEPAGE"
function getMovieInfo(movie_id) {
  //fetch information with tmdb API to get movie information
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

  fetch(BASE_URL + "/movie/" + movie_id + "?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      renderMoviePage(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

//FUNCTION THAT GETS THE TRAILERS(the api retrieves more than one), FOR A SPECIFIC MOVIE. IT IS CALLED IN MOVIEPAGE.JS, AFTER getMovieInfo() fetch
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

//FUNCTION THAT GETS THE CAST FOR A SPECIFIC MOVIE. IT IS CALLED IN MOVIEPAGE.JS, AFTER getMovieInfo() fetch
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

//FUNCTION THAT GETS SIMILAR MOVIES OF A SPECIFIC MOVIE. IT IS CALLED IN MOVIEPAGE.JS, AFTER getMovieInfo() fetch
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

//FUNCTION CALLED IN THE SCRIPT.JS In the "index" case.
//GETS ALL UPCOMING MOVIES
function getUpcomingMovies() {
  // https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
  fetch(BASE_URL + "/movie/upcoming?api_key=" + API_KEY)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //function defined in moviePage.js
      let upcoming_movies = data.results;
      //Limitate only 6 movies, because this information is in index page, on the right side. It would be ugly it was necessary to scroll
      for (let i = 0; i < 6; i++) {
        renderUpcomingMovies(upcoming_movies[i]);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Function that gets movies based on the type of request. It can be all movies, with input search, or with secondary search, meaning filters (with filters or not)
//THIS FUNCTION GETS ALL MOVIES FROM A SPECIFIC TYPE OF SEARCH.
//FOR now, the types available are:
//all -> get all movies
//search -> get movies that the user searched on the search input
//secondaryfilters -> get movies that the user chooses on the dropdowns
function getMovies(type, page) {
  //If page is not passed, then the default is page = 1
  let first_time = false;
  if (page === undefined) {
    page = 1;
    first_time = true;
  }

  if (type === "all") {
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
  } else if (type === "search") {
    //Get the value passed on the searc input
    let search_value = document.getElementById("input-search-by-title").value;

    //If the user didn't write anything, getMovies("all"), that will retrieve all movies on the platform
    if (search_value.length === 0) {
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";
      const paginator_numbers = document.querySelectorAll(".pag-number");
      for (let i = 0; i < paginator_numbers.length; i++) {
        paginator_numbers[i].remove();
      }
      getMovies("all");
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
          //function defined in movie.js and paginator.js
          if (first_time) {
            const movies_flex = document.getElementById("movies-flex");
            movies_flex.innerHTML = "";
            const paginator_numbers = document.querySelectorAll(".pag-number");

            //remove the paginators from the previous search, but only if it was the first time called it.
            //We have to check if it is the first time called, because this function is being consistently called in the paginator
            //when the user clicks on a new page
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
    //This type is called when the user clicks on a dropdown-item
    let year_active = document.querySelector(".year-active");
    let genre_active = document.querySelector(".genre-active");
    let sort_active = document.querySelector(".sort-active");

    //https://api.themoviedb.org/3/discover/movie?api_key=b19cb0f63912ae924e81e2d6962a5fba&sort_by=popularity.desc&page=1&with_genres=383&year=2000

    //The base URL contains sort_active value, because the default one is by popularity desc.
    let url =
      BASE_URL +
      "/discover/movie?api_key=" +
      API_KEY +
      "&sort_by=" +
      sort_active.value +
      "&page=" +
      page;

    //Check the value of genre_active
    //If the active is "All", the value associated is -1. So for any value different from that, we insert that in the URL
    if (parseInt(genre_active.value) !== -1) {
      url += "&with_genres=" + genre_active.value;
    }

    /* WARNING - ALTOUGH THIS CODE IS CORRECTLY DONE, THE API HAS SOME BUGS AND DOESN'T WORK VERY WELL WITH YEARS. IT WAS TESTED MANUALLY IN THE API MANUAL PAGE AND IT HAD THE SAME BUGS AS IN THE WEBSITE*/
    //Check the value of year dropdown
    //By default year is on "All"
    //If it is not on default, we will add it to the URL
    if (year_active.value !== "all") {
      //The years dropdown-item have 2 types of values:
      // 2021
      // 2015-2010
      //We split by "-", and if the correspondent array has more than one element, it means it was the type 2015-2010
      //else, it was the type 2021

      let years = year_active.value.split("-");
      if (years.length > 1) {
        //For the case 2015-2010, we have to inser in the URL release_date.gte=2010-01-01&release_date.lte=2015-12-31
        let release_date_gte = years[1] + "-01-01";
        let release_date_lte = years[0] + "-12-31";
        url +=
          "&release_date.gte=" +
          release_date_gte +
          "&release_date.lte=" +
          release_date_lte;
      } else {
        //For the case it is a single year, then just add to the url the year
        let year = years[0];
        url += "&year=" + year;
      }
    }

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

          //remove the paginators from the previous search, but only if it was the first time called it.
          //We have to check if it is the first time called, because this function is being consistently called in the paginator
          //when the user clicks on a new page
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
