//Function that creates all bootstrap content to make a carousel.
function loadRecommendedMovies() {
  let reccomendedMovies = [
    {
      movie_id: "497698",
      movie_title: "BLACK WIDOW",
      movie_description:
        "Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.",
      src: "IMG/blackwidow.jpg",
      index: "0",
    },
    {
      movie_id: "509967",
      movie_title: "6 UNDERGROUND",
      movie_description:
        "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
      src: "IMG/6underground.jpg",
      index: "1",
    },
    {
      movie_id: "339846",
      movie_title: "BAYWATCH",
      movie_description:
        "Devoted lifeguard Mitch Buchannon butts heads with a brash new recruit, as they uncover a criminal plot that threatens the future of the bay.",
      src: "IMG/baywatch.jpg",
      index: "2",
    },
    {
      movie_id: "293660",
      movie_title: "DEADPOOL",
      movie_description:
        "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
      src: "IMG/deadpool.jpg",
      index: "3",
    },
    {
      movie_id: "475557",
      movie_title: "JOKER",
      movie_description:
        "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
      src: "IMG/joker.jpg",
      index: "4",
    },
  ];

  for (let i = 0; i < reccomendedMovies.length; i++) {
    /*All Images Section */
    let movie = reccomendedMovies[i];

    /*Carousel Indicators */
    let slide_button = document.createElement("button");
    slide_button.type = "button";
    slide_button.setAttribute("data-bs-target", "#carouselExampleCaptions");
    slide_button.setAttribute("data-bs-slide-to", movie.index);
    if (movie.index === "0") {
      slide_button.classList.add("active");
    }
    /*Add carousel indicators to carousel-indicators div */
    document.getElementById("carousel-indicators").appendChild(slide_button);

    /*Carousel Images */
    let img_element = document.createElement("img");
    img_element.className = "d-block w-100";
    img_element.src = movie.src;
    img_element.alt = movie.movie_title + " WALLPAPER";

    /*Carousel Caption */
    let carousel_caption_element = document.createElement("div");
    carousel_caption_element.className = "carousel-caption d-none d-md-block";
    let movie_title = document.createElement("h2");
    movie_title.textContent = movie.movie_title;
    let movie_description = document.createElement("p");
    movie_description.className = "movie-description";
    movie_description.textContent = movie.movie_description;
    let movie_link = document.createElement("a");
    movie_link.className = "btn-more-info";
    movie_link.href = "moviePage.html?id=" + movie.movie_id;
    movie_link.textContent = "More Info";
    /*Add all elements into carousel caption */
    carousel_caption_element.append(movie_title);
    carousel_caption_element.append(movie_description);
    carousel_caption_element.append(movie_link);

    /* Creation of carousel-item */
    let carousel_item_element = document.createElement("div");
    carousel_item_element.classList.add("carousel-item");
    if (movie.index === "0") {
      carousel_item_element.classList.add("active");
    }
    /* Add elements into carousel-item */
    carousel_item_element.append(img_element);
    carousel_item_element.append(carousel_caption_element);

    /*Add carousel-items to carousel-inner */
    document.getElementById("carousel-inner").append(carousel_item_element);
  }
}

//This and the one in moviePage can be collapsed into one, with identifiers of what to do
function renderUpcomingMovies(data) {
  // console.log(data);
  const upcoming_movies_div = document.getElementById("upcoming-movies");

  let movie_div = document.createElement("div");
  movie_div.className = "up-movie";

  let small_img = document.createElement("img");
  small_img.className = "upcoming-img";
  small_img.src = BASE_IMG_URL + data.poster_path;
  small_img.alt = data.title + " banner";

  let movie_name = document.createElement("h2");
  movie_name.className = "upcoming-movie-name";
  movie_name.textContent = data.title;

  let movie_link = document.createElement("a");
  movie_link.className = "btn-more-info btn-small";
  movie_link.href = "moviePage.html?id=" + data.id;
  movie_link.textContent = "More Info";

  let wrapper_content = document.createElement("div");
  wrapper_content.append(movie_name);
  wrapper_content.append(movie_link);

  movie_div.append(small_img);
  movie_div.append(wrapper_content);
  upcoming_movies_div.append(movie_div);
}
