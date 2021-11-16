// the function receives the current page
function main(page) {
  //render the menu, and pass the current page, so it knows which tab is active
  renderMenu(page);

  //switch with all pages
  switch (page) {
    case "home":
      //ANY FUNCTION CALLED HERE, IS DEFINED IN index.js

      loadRecommendedMovies();
      getUpcomingMovies();
      break;

    case "movies":
      //ANY FUNCTION CALLED HERE, IS DEFINED IN movie.js
      //on the load of the page, it will be page 1, so if nothig is passed to the function, it will retreive the first page as default
      //in this function, the whole paginator is going to be generated as well
      clearFilters();
      getMovies();

      addSearchFilterEventListeners();
      addGenres(); //Genres event listeneres are added dinamically when created
      addYearEventListeners();
      addSortEventListeners();

      break;

    case "moviespage":
      //ANY FUNCTION CALLED HERE, IS DEFINED IN moviePage.js

      //Movie ID is passed through URL: (...)moviePage.html?id=xxxxxx
      //get movieID that was passed trough URL
      const currentURL = window.location.search;
      let url = new URLSearchParams(currentURL);
      var movie_id = url.get("id");

      getMovieInfo(movie_id);

      //add video source to iframe on the click of button watch trailer
      let button_watch = document.getElementById("btn-watch-trailer");
      button_watch.addEventListener("click", () => {
        getTrailer(movie_id);
      });

      //Stop the video when user clicks outside the modal
      window.onclick = function (event) {
        if (
          event.target.id !== "modal" &&
          event.target.id !== "btn-watch-trailer"
        ) {
          let video_frame = document.getElementById("video-frame");
          video_frame.src = "";
        }
      };

      //get similar movies
      getSimilarMovies(movie_id);
      break;

    default:
      break;
  }
}
