var CURRENT_PAGE = 1;
var NEXT_PAGE = 2;
var PREV_PAGE = 0;
var TOTAL_PAGES;

//function that changes the active number of paginator
function changeNumberPaginator() {
  const paginator_numbers = document.querySelectorAll(".pag-number");

  //for all the numbers in the paginator, check if it's id is equal to the current page clicked, and if it is add the class number-active
  //if it isn't, remove the class number-active;
  //Had to to with a cicle for, because i have my pagination like 1 2 3 4 5 ... 23, and i wouldn't be able to get the previous page
  for (let i = 0; i < paginator_numbers.length; i++) {
    //the id of the <a> elemtn has id for example = pag-3
    //parseInt because the id comes in as a string
    let paginator_number_id = parseInt(paginator_numbers[i].id.split("-")[1]);
    if (paginator_number_id === CURRENT_PAGE) {
      paginator_numbers[i].classList.add("number-active");
    } else {
      paginator_numbers[i].classList.remove("number-active");
    }
  }

  checkMinMax();
}

function checkMinMax() {
  if (CURRENT_PAGE === 1) {
    document.getElementById("btn-previous").style.display = "none";
    document.getElementById("btn-next").style.display = "flex";

    return;
  }
  if (CURRENT_PAGE === TOTAL_PAGES) {
    document.getElementById("btn-next").style.display = "none";
    document.getElementById("btn-previous").style.display = "flex";

    return;
  }
  document.getElementById("btn-previous").style.display = "flex";
  document.getElementById("btn-next").style.display = "flex";
}

//function that sets the number of total pages, that comes from the API endpoint, and then calls the function to add the pagniation numbers
function renderPaginator(nr_total_pages) {
  TOTAL_PAGES = nr_total_pages;

  //add the paginator numbers, and in this function it will be added their event listeners
  addPaginatorNumbers();
  //function to check if the current number is either min or max, so it can remove the correspondent button
  checkMinMax();
  //add events listeners to paginator numbers
  addEventsListeners();
  //the buttons are pre created, so we just add their event listeners
  addBtnsEventsListeners();
}

//function that adds the paginator numbers, based on the TOTAL_PAGES
function addPaginatorNumbers() {
  const paginator = document.getElementById("paginator");
  const p_etc = document.getElementById("etc");
  const btn_next = document.getElementById("btn-next");

  //If the it has more than 7 pages, do the normal way, else just had the number of total pages
  if (TOTAL_PAGES > 7) {
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
          a_number.classList.add("first-number");
        }
        if (i === 5) {
          a_number.classList.add("last-number");
        }
        a_number.id = "pag-" + (i + 1).toString();
        a_number.textContent = (i + 1).toString();
        paginator.insertBefore(a_number, p_etc);
      }
    }
  } else {
    for (let i = 0; i < TOTAL_PAGES; i++) {
      let a_number = document.createElement("a");
      a_number.className = "pag-number";
      //I want to have 7 numbers, 6 initial pages and then ... and the last one
      //1 2 3 4 5 6 ... 500

      a_number.id = "pag-" + TOTAL_PAGES;
      a_number.textContent = TOTAL_PAGES;
      paginator.insertBefore(a_number, btn_next);

      if (i === 0) {
        a_number.classList.add("number-active");
        a_number.classList.add("first-number");
      }
      if (i === 6) {
        a_number.classList.add("last-number");
      }
      a_number.id = "pag-" + (i + 1).toString();
      a_number.textContent = (i + 1).toString();
      paginator.insertBefore(a_number, p_etc);
    }
    p_etc.remove();
  }

  //makes the page go into the top
  // a_number.href = "#";
}

//function that adds Events Listeners to the <a> numbers
function addEventsListeners() {
  //add event listeners to the numbers in paginator
  const paginator_numbers = document.querySelectorAll(".pag-number");
  for (let i = 0; i < paginator_numbers.length; i++) {
    paginator_numbers[i].addEventListener("click", () => {
      CURRENT_PAGE = parseInt(paginator_numbers[i].id.split("-")[1]);
      NEXT_PAGE = CURRENT_PAGE + 1;
      PREV_PAGE = CURRENT_PAGE - 1;

      changeNumberPaginator();
      //get the id of the paginator_number
      //the id of the <a> elemtn has id for example = pag-3
      //parseInt because the id comes in as a string

      //function defined in paginator.js

      if (CURRENT_PAGE === TOTAL_PAGES) {
        paginator_numbers[paginator_numbers.length - 1].remove();
        const p_etc = document.getElementsByClassName("etc");
        for (let i = 0; i < p_etc.length; i++) {
          p_etc[i].remove();

          // p.remove();
        }
        // if (p_etc !== null) {
        //   p_etc.remove();
        // }
        for (let i = paginator_numbers.length - 1; i >= 0; i--) {
          paginator_numbers[i].remove();

          let a_number = document.createElement("a");
          a_number.className = "pag-number";
          //I want to have 7 numbers, 6 initial pages and then ... and the last one
          //1 2 3 4 5 6 ... 500

          //add first-number, to the new first-number
          if (i === 6) {
            a_number.classList.add("first-number");
          }
          //add last-number, to the new last-number
          if (i === 0) {
            a_number.classList.add("last-number");
          }

          a_number.id = "pag-" + (TOTAL_PAGES - i).toString();
          a_number.textContent = (TOTAL_PAGES - i).toString();

          paginator.insertBefore(a_number, document.getElementById("btn-next"));
        }
        addEventsListeners();
        changeNumberPaginator();
      } else {
        if (isLastPage()) {
          deletePrevNumbers();
          renderNextNumbers();
          //since the CURRENT_PAGE is also deleted, we then have to add the class number-active
          changeNumberPaginator();
        }
      }

      /*when a paginator_number is clicked, remove all the movies in the flex container
      So it is able to add the new 20 */
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";

      getMovies(CURRENT_PAGE);
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
      // let element_currentPage =
      //   document.getElementsByClassName("number-active");
      // //the id of the <a> elemtn has id for example = pag-3
      // //parseInt because the id comes in as a string
      // let page = parseInt(element_currentPage[0].id.split("-")[1]);

      if (paginator_buttons[i].id === "btn-previous") {
        //function defined in paginator.js
        //If the page clicked, is the first page that appears in the paginator

        CURRENT_PAGE = PREV_PAGE;
        //change the number active to the correct one

        if (isFirstPage()) {
          //delete all the numbers in the paginator, and render the new ones
          //We had 6 7 8 9 10 11 -> delete all (6 has to be deleted so it won't accumulate event listeners)
          //We now have 1 2 3 4 5 6 -> remder all new numbers
          deleteNextNumbers();
          if (CURRENT_PAGE === TOTAL_PAGES - 7) {
            if (document.getElementById("etc") === null) {
              let p_etc = document.createElement("p");
              p_etc.className = "etc";
              p_etc.id = "etc";
              p_etc.textContent = "...";
              paginator.insertBefore(
                p_etc,
                document.getElementById("btn-next")
              );
            }
          }

          renderPrevNumbers();
        }
        changeNumberPaginator();
        //get movies for the page the user is
        getMovies(CURRENT_PAGE);

        //UPDATE PREVIOUS PAGE AND NEXT PAGE
        PREV_PAGE -= 1;
        NEXT_PAGE = CURRENT_PAGE + 1;
      } else if (paginator_buttons[i].id === "btn-next") {
        CURRENT_PAGE = NEXT_PAGE;

        //function defined in paginator.js
        if (isLastPage()) {
          if (CURRENT_PAGE !== TOTAL_PAGES) {
            deletePrevNumbers();

            renderNextNumbers();
          }
        }
        changeNumberPaginator();
        getMovies(CURRENT_PAGE);

        NEXT_PAGE += 1;
        PREV_PAGE = CURRENT_PAGE - 1;
      }
      /*when a paginator_button is clicked, remove all the movies in the flex container
      So it is able to add the new 20 */
      const movies_flex = document.getElementById("movies-flex");
      movies_flex.innerHTML = "";
    });
  }
}

//Function that checks if the page clicked, is the last page in the paginator before "..."
function isLastPage() {
  let last_page = document.getElementsByClassName("last-number");
  let last_page_number = parseInt(last_page[0].id.split("-")[1]);
  let isLastPage;
  CURRENT_PAGE === last_page_number
    ? (isLastPage = true)
    : (isLastPage = false);
  return isLastPage;
}

//function that deletes all the numbers on the paginator except the one after ...
function deletePrevNumbers() {
  let delete_last_number = document.getElementById("pag-" + TOTAL_PAGES);
  delete_last_number.remove();
  for (let i = 0; i <= 5; i++) {
    let delete_number = document.getElementById("pag-" + (CURRENT_PAGE - i));
    delete_number.remove();
  }
}

//function that renders the next numbers
function renderNextNumbers() {
  const span_etc = document.getElementById("etc");
  /*the whole list of numbers is 6 (1 2 3 4 5 6)
  the last number is 6. When we are in the number 6, we have to delete all the numbers (including 6 so we dont accumulate events)
  so for i = 0 to 5, we have to delete the numbers (6-0), (6-1), ... (6-5)
  */

  //delete last-number class of the previous last_number
  // let a_prev_last_page = document.getElementById("pag-" + CURRENT_PAGE);
  // a_prev_last_page.classList.remove("last-number");
  // a_prev_last_page.classList.add("first-number");
  for (let i = 0; i <= 5; i++) {
    // let delete_number = document.getElementById("pag-" + (CURRENT_PAGE - i));
    // delete_number.remove();

    let a_number = document.createElement("a");
    a_number.className = "pag-number";
    //I want to have 7 numbers, 6 initial pages and then ... and the last one
    //1 2 3 4 5 6 ... 500

    //add last-number, to the new last-number
    if (i === 5) {
      a_number.classList.add("last-number");
    }
    if (i === 0) {
      a_number.classList.add("first-number");
    }

    a_number.id = "pag-" + (CURRENT_PAGE + i).toString();
    a_number.textContent = (CURRENT_PAGE + i).toString();
    paginator.insertBefore(a_number, span_etc);
  }

  let a_number = document.createElement("a");
  a_number.className = "pag-number";
  a_number.id = "pag-" + TOTAL_PAGES;
  a_number.textContent = TOTAL_PAGES;
  paginator.insertBefore(a_number, document.getElementById("btn-next"));

  //add events listeners to the newly created buttons
  addEventsListeners();
}

//Function that checks if the page clicked, is the first page in the paginator numbers
function isFirstPage() {
  let first_page = document.getElementsByClassName("first-number");
  let first_page_number = parseInt(first_page[0].id.split("-")[1]);
  let isFirstPage;

  CURRENT_PAGE + 1 === first_page_number
    ? (isFirstPage = true)
    : (isFirstPage = false);
  return isFirstPage;
}

/*the whole list of numbers is 6 (6 7 8 9 10 11)
  the first number is 6. We have to delete all numbers
  so for i = 0 to 5, we have to delete the numbers (6+0), (6+1), ... (6+5) and then add the numbers (6-0), (6-1) ... (6-5)
  the number 6 will have the number 1 will have the first-number
*/

//function that deletes all the numbers on the paginator except the one after ...
function deleteNextNumbers() {
  let delete_last_number = document.getElementById("pag-" + TOTAL_PAGES);
  delete_last_number.remove();
  for (let i = 5; i >= 0; i--) {
    let delete_number = document.getElementById(
      "pag-" + (CURRENT_PAGE + 1 + i)
    );
    delete_number.remove();
  }
}

//function that renders the previous numbers to the number passed, including the number of page
function renderPrevNumbers() {
  for (let i = 5; i >= 0; i--) {
    let a_number = document.createElement("a");
    a_number.className = "pag-number";
    //I want to have 7 numbers, 6 initial pages and then ... and the last one
    //1 2 3 4 5 6 ... 500

    //add first-number, to the new first-number
    if (i === 5) {
      a_number.classList.add("first-number");
    }
    //add last-number, to the new last-number
    if (i === 0) {
      a_number.classList.add("last-number");
    }

    a_number.id = "pag-" + (CURRENT_PAGE + 1 - i).toString();
    a_number.textContent = (CURRENT_PAGE + 1 - i).toString();

    paginator.insertBefore(a_number, document.getElementById("etc"));
  }

  let a_number = document.createElement("a");
  a_number.className = "pag-number";
  a_number.id = "pag-" + TOTAL_PAGES;
  a_number.textContent = TOTAL_PAGES;
  paginator.insertBefore(a_number, document.getElementById("btn-next"));

  //add events listeners to the newly created buttons
  addEventsListeners();
}
