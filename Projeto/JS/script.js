function main(page) {
  renderMenu(page);

  switch (page) {
    case "moviespage":
      const currentURL = window.location.search;
      let url = new URLSearchParams(currentURL);
      var movie_id = url.get("id");
      getMovieInfo(movie_id);
      break;
    default:
      break;
  }

  function getMovieInfo(movie_id) {
    fetch("https://data-imdb1.p.rapidapi.com/movie/id/" + movie_id + "/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
        const banner_img = document.getElementById("banner-img");
        banner_img.src = data.results.banner;
        const movie_header = document.getElementById("movie-name-header");
        movie_header.textContent = data.results.title;

        let rating = document.getElementById("rating");
        rating.textContent = data.results.rating + " / 10.0";

        const movie_description = document.getElementById("movie-description");
        movie_description.textContent = data.results.description;
        const movie_year = document.getElementById("movie-year");
        movie_year.textContent = data.results.year;
        // const content_rating = document.getElementById("content-rating");
        // content_rating.textContent = data.results.content_rating;

        const keywords_div = document.getElementById("keywords");
        let keywords = data.results.keywords;
        for (let i = 0; i < keywords.length; i++) {
          let p_keyword = document.createElement("p");
          p_keyword.textContent = keywords[i].keyword;
          keywords_div.append(p_keyword);
        }

        const genres_div = document.getElementById("genres");
        let genres = data.results.gen;
        for (let i = 0; i < genres.length; i++) {
          let p_genre = document.createElement("p");
          p_genre.textContent = genres[i].genre;
          genres_div.append(p_genre);
        }

        let p_movie_time = document.createElement("p");
        const movie_time = data.results.movie_length;
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

        getMovieCast(movie_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getMovieCast(movie_id) {
    fetch("https://data-imdb1.p.rapidapi.com/movie/id/" + movie_id + "/cast/", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // test();
  // const input_film = document.getElementById("input_test");
  // const button_test = document.getElementById("button_test");
  // const body_test = document.getElementById("body");
  // button_test.addEventListener("click", () => {
  //   let movie_name = input_film.value;
  //   getMovie(movie_name);
  // });
  // function getMovie(movie_name) {
  //   fetch(
  //     "https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/" +
  //       movie_name +
  //       "/",
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
  //         "x-rapidapi-key":
  //           "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.results[0].imdb_id);
  //       let movie_id = data.results[0].imdb_id;
  //       fetch("https://data-imdb1.p.rapidapi.com/movie/id/" + movie_id + "/", {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
  //           "x-rapidapi-key":
  //             "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
  //         },
  //       })
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((data) => {
  //           console.log(data.results.trailer);
  //           renderTrailer(data.results.trailer);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  // function renderTrailer(trailer_src) {
  //   let iframe_test = document.createElement("iframe");
  //   iframe_test.src = trailer_src;
  //   iframe_test.style.width = "750px";
  //   iframe_test.style.height = "500px";
  //   iframe_test.allowFullscreen = true;
  //   body_test.append(iframe_test);
  // }
}
