var CURRENT_PAGE = 1;
var NEXT_PAGE;
var PREV_PAGE;
var TOTAL_PAGES;

//function that changes the active number of paginator
function changeNumberPaginator(page) {
  const paginator_numbers = document.querySelectorAll(".pag-number");

  //for all the numbers in the paginator, check if it's id is equal to the current page clicked, and if it is add the class number-active
  //if it isn't, remove the class number-active;
  //Had to to with a cicle for, because i have my pagination like 1 2 3 4 5 ... 23, and i wouldn't be able to get the previous page
  for (let i = 0; i < paginator_numbers.length; i++) {
    //the id of the <a> elemtn has id for example = pag-3
    //parseInt because the id comes in as a string
    let paginator_number_id = parseInt(paginator_numbers[i].id.split("-")[1]);
    if (paginator_number_id === page) {
      paginator_numbers[i].classList.add("number-active");
    } else {
      paginator_numbers[i].classList.remove("number-active");
    }
  }
}

//function that sets the number of total pages, that comes from the API endpoint, and then calls the function to add the pagniation numbers
function renderPaginator(nr_total_pages) {
  TOTAL_PAGES = nr_total_pages;

  //add the paginator numbers, and in this function it will be added their event listeners
  addPaginatorNumbers();
  //add events listeners to paginator numbers
  addEventsListeners();
  //the buttons are pre created, so we just add their event listeners
  addBtnsEventsListeners();
}

//function that adds the paginator numbers, based on the TOTAL_PAGES
function addPaginatorNumbers() {
  const paginator = document.getElementById("paginator");
  const span_etc = document.getElementById("etc");
  const btn_next = document.getElementById("btn-next");

  for (let i = 0; i < 7; i++) {
    let a_number = document.createElement("a");
    a_number.className = "pag-number";
    //I want to have 7 numbers, 6 initial pages and then ... and the last one
    //1 2 3 4 5 6 ... 500
    if (i === 6) {
      a_number.id = "pag-" + TOTAL_PAGES;
      a_number.textContent = TOTAL_PAGES;
      paginator.insertBefore(a_number, btn_next);
    } else {
      if (i === 0) {
        a_number.classList.add("number-active");
      }
      if (i === 5) {
        a_number.classList.add("last-number");
      }
      a_number.id = "pag-" + (i + 1).toString();
      a_number.textContent = (i + 1).toString();
      paginator.insertBefore(a_number, span_etc);
    }

    //makes the page go into the top
    a_number.href = "#";
  }
}

//function that adds Events Listeners to the <a> numbers
function addEventsListeners() {
  //add event listeners to the numbers in paginator
  const paginator_numbers = document.querySelectorAll(".pag-number");
  for (let i = 0; i < paginator_numbers.length; i++) {
    paginator_numbers[i].addEventListener("click", () => {
      //get the id of the paginator_number
      //the id of the <a> elemtn has id for example = pag-3
      //parseInt because the id comes in as a string
      let page = parseInt(paginator_numbers[i].id.split("-")[1]);
      //function defined in paginator.js
      changeNumberPaginator(page);
      if (isLastPage(page)) {
        renderNextNumbers(page);
      }

      /*when a paginator_number is clicked, remove all the movies in the flex container
      So it is able to add the new 20 */
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";

      getMovies(page);
    });
  }
}

//function that adds Events listeners to the buttons next and previous
function addBtnsEventsListeners() {
  //add event listeners to the icons buttons next and previous in paginator
  const paginator_buttons = document.querySelectorAll(".btn-pn");
  for (let i = 0; i < paginator_buttons.length; i++) {
    paginator_buttons[i].addEventListener("click", () => {
      //getting the <a> element that has the class number-active
      let element_currentPage =
        document.getElementsByClassName("number-active");
      //the id of the <a> elemtn has id for example = pag-3
      //parseInt because the id comes in as a string
      let page = parseInt(element_currentPage[0].id.split("-")[1]);

      if (paginator_buttons[i].id === "btn-previous") {
        if (page > 1) {
          //function defined in paginator.js
          changeNumberPaginator(page - 1);
          getMovies(page - 1);
        }
      } else if (paginator_buttons[i].id === "btn-next") {
        if (page < 500) {
          //function defined in paginator.js
          changeNumberPaginator(page + 1);
          getMovies(page + 1);
          if (isLastPage(page + 1)) {
            renderNextNumbers(page + 1);
          }
        }
      }
      /*when a paginator_button is clicked, remove all the movies in the flex container
      So it is able to add the new 20 */
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";
    });
  }
}

//Function that checks if the page clicked, is the last page in the paginator before "..."
function isLastPage(page) {
  let last_page = document.getElementsByClassName("last-number");
  let last_page_number = parseInt(last_page[0].id.split("-")[1]);
  let isLastPage;
  page === last_page_number ? (isLastPage = true) : (isLastPage = false);
  return isLastPage;
}

//function that renders the next numbers
function renderNextNumbers(page) {
  const span_etc = document.getElementById("etc");
  /*the whole list of numbers is 6 (1 2 3 4 5 6)
  the last number is 6. When we are in the number 6, we have to delete 1,2,3,4,5
  so for i = 1 to 5, we have to delete the numbers (6-1), (6-2), ... (6-5)
  */

  //delete last-number class of the previous last_number
  let a_prev_last_page = document.getElementById("pag-" + page);
  a_prev_last_page.classList.remove("last-number");
  for (let i = 1; i <= 5; i++) {
    let delete_number = document.getElementById("pag-" + (page - i));
    delete_number.remove();

    let a_number = document.createElement("a");
    a_number.className = "pag-number";
    //I want to have 7 numbers, 6 initial pages and then ... and the last one
    //1 2 3 4 5 6 ... 500

    //add last-number, to the new last-number
    if (i === 5) {
      a_number.classList.add("last-number");
    }

    a_number.id = "pag-" + (page + i).toString();
    a_number.textContent = (page + i).toString();
    paginator.insertBefore(a_number, span_etc);
  }

  //add events listeners to the newly created buttons
  addEventsListeners();
}
