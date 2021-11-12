function main() {
  const input_film = document.getElementById("input_test");
  const button_test = document.getElementById("button_test");
  const body_test = document.getElementById("body");

  button_test.addEventListener("click", () => {
    let movie_name = input_film.value;
    getMovie(movie_name);
  });
  function getMovie(movie_name) {
    fetch(
      "https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/" +
        movie_name +
        "/",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
          "x-rapidapi-key":
            "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.results[0].imdb_id);

        let movie_id = data.results[0].imdb_id;
        fetch("https://data-imdb1.p.rapidapi.com/movie/id/" + movie_id + "/", {
          method: "GET",
          headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key":
              "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.results.trailer);
            renderTrailer(data.results.trailer);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function renderTrailer(trailer_src) {
    let iframe_test = document.createElement("iframe");
    iframe_test.src = trailer_src;
    iframe_test.style.width = "750px";
    iframe_test.style.height = "500px";
    iframe_test.allowFullscreen = true;
    body_test.append(iframe_test);
  }
}
