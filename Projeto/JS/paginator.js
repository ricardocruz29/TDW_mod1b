var CURRENT_PAGE = 1;
var NEXT_PAGE = 2;
var PREV_PAGE = 0;
var TOTAL_PAGES;
var TYPE;

/*function that sets the number of the global variables with info that comes from the API endpoint.
After this, do a bunch of steps to configure the paginator:

Check if the the CURRENT_PAGE is either the min value (1) or the max value (TOTAL_PAGES) to remove the correspondent previous and next button
Add the paginator numbers
Add event listeners to paginator numbers
The buttons are pre created, but we need to add their event listeners*/

function renderPaginator(nr_total_pages, type) {
  TOTAL_PAGES = nr_total_pages;
  TYPE = type;
  CURRENT_PAGE = 1;
  NEXT_PAGE = 2;
  PREV_PAGE = 0;

  //function to check if the current number is either min or max, so it can remove the correspondent button
  checkMinMax();
  //add the paginator numbers, and in this function it will be added their event listeners
  addPaginatorNumbers();
  //add events listeners to paginator numbers
  addEventsListeners();
  //the buttons are pre created, so we just add their event listeners
  addBtnsEventsListeners();
}

//function that checks if current page is min or max. If it is, then remove the correspondent button
//Whenever we change the page, the function changeNumberPaginator will be called, and then in that function, this one will be called as well to check if the new number is either min or max
function checkMinMax() {
  //get the buttons next and previous of the paginator
  let btn_previous = document.getElementById("btn-previous");
  let btn_next = document.getElementById("btn-next");

  //If current_page = 1 (min), then remove the previous button
  if (CURRENT_PAGE === 1) {
    btn_previous.style.display = "none";
    btn_next.style.display = "flex";
    return;
  }
  //If current_page = TOTAL_PAGES (max), then remove the next button
  if (CURRENT_PAGE === TOTAL_PAGES) {
    btn_next.style.display = "none";
    btn_previous.style.display = "flex";
    return;
  }
  //It it is not neither of above, we need to secure that the buttons are both displayed.
  btn_previous.style.display = "flex";
  btn_next.style.display = "flex";
}

//function that adds the paginator numbers, based on the TOTAL_PAGES.
//This function is only called in the initialization
function addPaginatorNumbers() {
  //We have to get the paginator, the "..." and the next button
  //Paginator we need because we insert the things there. Paginator numbers are children of paginator element
  //P_etc we need, because we need to add the first 6 numbers before "..."
  //Btn_next we need, because the last number of all, that will be after "..." needs to be inserted before btn_next element. PS: insertAfter method does not exist, so we have to insert before btn_next
  const paginator = document.getElementById("paginator");
  const p_etc = document.getElementById("etc");
  const btn_next = document.getElementById("btn-next");

  /*Paginator has 2 types:
  More than 7 pages: 1 2 3 4 5 6 ... 500; PS: 500 is the number of TOTAL_pages;
  Less or equal than 7 pages: 1 2 3 4 5 6 7; 
  */

  //If the it has more than 7 pages, do the normal way, else just had the number of total pages
  if (TOTAL_PAGES > 7) {
    //check if p_etc is null. It could be deleted when in another type of search, if we got into the last set of pages, or if the results didn't have more than 7 pages.
    //For example, if we click in 500, the "..." will be removed. So because of other iterations, when we initialize, we have to verify if p_etc exists
    //Or for example, if we do a search that has only 5 pages, and then we clear the filters, and get into one with 500 pages. The "..." are deleted from the last search.
    if (p_etc === null) {
      let p_etc = document.createElement("p");
      p_etc.className = "etc";
      p_etc.id = "etc";
      p_etc.textContent = "...";
      paginator.insertBefore(p_etc, btn_next);
    }

    for (let i = 0; i < 7; i++) {
      //I want to have 7 numbers, 6 initial pages and then ... and the last one
      //1 2 3 4 5 6 ... 500
      if (i === 6) {
        let a_number = createPaginatorNumber(TOTAL_PAGES);
        //page 500 of the example
        paginator.insertBefore(a_number, btn_next);
      } else {
        // i goes from 0 to 5 (number 6 is for the TOTAL_PAGES), and the page go from 1 to 6
        let a_number = createPaginatorNumber(i + 1);
        if (i === 0) {
          //page 1 of the example
          //this class first-number will act as an id. It should be utilized another attribute.
          a_number.classList.add("number-active");
          a_number.classList.add("first-number");
        }
        if (i === 5) {
          //page 5 of the example
          //this class last-number will act as an id. It should be utilized another attribute.
          a_number.classList.add("last-number");
        }

        //We have to get it again, because if p_etc was deleted in previous search, then the const p_etc wouldn't be able to recognize it
        let p_etc = document.getElementById("etc");
        paginator.insertBefore(a_number, p_etc);
      }
    }
  }
  //If the total pages are less or equal than 7, just add them in the paginator
  else {
    //page 5 of the example
    //this class last-number will act as an id. It should be utilized another attribute.
    let a_last_number = createPaginatorNumber(TOTAL_PAGES);
    a_last_number.classList.add("last-number");
    paginator.insertBefore(a_last_number, btn_next);
    for (let i = 0; i < TOTAL_PAGES - 1; i++) {
      //If TOTAL_PAGES = 5 for example, from i = 0 to 4, add the pages from 1 to 5

      let a_number = createPaginatorNumber(i + 1);

      if (i === 0) {
        //page 1 of the example
        //this class first-number will act as an id. It should be utilized another attribute.
        a_number.classList.add("number-active");
        a_number.classList.add("first-number");
      }

      paginator.insertBefore(
        a_number,
        document.getElementById("pag-" + TOTAL_PAGES)
      );
    }
    //if there were only 7 pages, when we pressed enter, then p_etc already does not exist
    if (p_etc !== null) {
      p_etc.remove();
    }
  }
}

//function that adds Events Listeners to the paginator numbers
function addEventsListeners() {
  const paginator_numbers = document.querySelectorAll(".pag-number");
  for (let i = 0; i < paginator_numbers.length; i++) {
    paginator_numbers[i].addEventListener("click", numbersLogicEL);
  }
}

//function of the number event listener. It was easir to do with a proper function, because with anonymous functions, the events woudl stack
function numbersLogicEL(event) {
  //event will be the element of the number clicked. The id is of the type "pag-<id>". We need to split by "-" and then parseInt the last value of the correspondent array
  //Update with the new values
  CURRENT_PAGE = parseInt(event.target.id.split("-")[1]);
  NEXT_PAGE = CURRENT_PAGE + 1;
  PREV_PAGE = CURRENT_PAGE - 1;

  //Change number active
  changeNumberPaginator();

  //Specific case of the clicked page is the last page of all
  if (CURRENT_PAGE === TOTAL_PAGES) {
    let paginator_numbers = document.querySelectorAll(".pag-number");
    //get all p_etc -> There were cases, don't remember when, that it could create more than one element "..." . It might be fixed now, but not sure, por isso é melhor prevenir
    const p_etc = document.getElementsByClassName("etc");
    for (let i = 0; i < p_etc.length; i++) {
      p_etc[i].remove();
    }

    //If the row of last numbers is not already created, then
    //Had to do this, because of the double click in last number. It would double the things
    if (document.getElementById("pag-" + (TOTAL_PAGES - 1)) === null) {
      document
        .getElementById("pag-" + TOTAL_PAGES)
        .classList.add("last-number");
      deletePrevNumbers();

      //this can't be done with renderPrevNumbers() because it inserts the numbers before the element "...".
      //For this specific case, it would need to insert the numbers before the last number of all, so it is more correct to separte both worlds.
      for (let i = paginator_numbers.length - 1; i >= 1; i--) {
        let a_number = createPaginatorNumber(TOTAL_PAGES - i);
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

        paginator.insertBefore(
          a_number,
          document.getElementById("pag-" + TOTAL_PAGES)
        );
      }
    }

    //prev numbers does not eliminate the button with last-number class, so we need to manual remove it in this specific case
    let previous_last_number = document.getElementsByClassName("last-number");
    //If we click the last page, then previous_last_number will be constituited by the previous last number, and the new last_number that in this case is the last page of all.
    //For this case, if we click again in the last number. Se estavamos no 500, e carregamos agora no 500 outra vez, este array so tera um elemento, e entao sera este caso em que n queremos apagar
    if (previous_last_number.length > 1) {
      previous_last_number[0].remove();
    }

    //addEventsListeners to the new created numbers;
    addEventsListeners();
  } else {
    //If we click in a number that is lastNumber of the row, then delete previous numbers, and render the new ones
    // 1 2 3 4 5 6 -> If we click on 6 -> delete 1 2 3 4 5, and render 7,8,9,10,11
    if (isLastPage()) {
      deletePrevNumbers();
      renderNextNumbers();
    }

    //addEventsListeners to the new created numbers;
    addEventsListeners();
  }

  /*when a paginator_number is clicked, remove all the movies in the flex container
      So it is able to add the new 20 */
  const movies_flex = document.getElementById("movies-flex");
  movies_flex.innerHTML = "";

  //Render the new movies
  getMovies(TYPE, CURRENT_PAGE);
}

//function that adds Events listeners to the buttons next and previous
function addBtnsEventsListeners() {
  //add event listeners to the icons buttons next and previous in paginator
  const paginator_buttons = document.querySelectorAll(".btn-pn");
  for (let i = 0; i < paginator_buttons.length; i++) {
    paginator_buttons[i].addEventListener("click", buttonsLogicEL);
  }
}

//function that contains the logic of buttons event listeners
function buttonsLogicEL() {
  //doing it with event.target.id, if we clicked in the icon inside the button, it would regist the event of click on the icon, and it woul'nt have the correct id
  //so btn_id = this.id
  let btn_id = this.id;

  //IF button clicked is to go to the previous page
  if (btn_id === "btn-previous") {
    CURRENT_PAGE = PREV_PAGE;
    //UPDATE PREVIOUS PAGE AND NEXT PAGE
    PREV_PAGE -= 1;
    NEXT_PAGE = CURRENT_PAGE + 1;

    //If we have the row 6 7 8 9 10 11 ... 500, then if we are on 6, and we click on btn-previous
    //the new row will be 1 2 3 4 5 6 ... 500, with number 5 active
    if (isFirstPage()) {
      //So, if this happens, then:
      //delete all the numbers in the paginator, and render the new ones
      //We had 6 7 8 9 10 11 -> delete all except 6
      //We now have 1 2 3 4 5 6 -> render all new numbers
      deleteNextNumbers();

      //If we are in the last row of pages, and we click to go to the previous page ( Example: we are in 494 and we click in btn-previous, we go into 493.) In this row, etc will be null, so we have to create it again
      if (CURRENT_PAGE === TOTAL_PAGES - 7) {
        if (document.getElementById("etc") === null) {
          let p_etc = document.createElement("p");
          p_etc.className = "etc";
          p_etc.id = "etc";
          p_etc.textContent = "...";
          paginator.insertBefore(
            p_etc,
            document.getElementById("pag-" + TOTAL_PAGES)
          );
        }
      }

      //render the previous numbers
      renderPrevNumbers();
    }

    //change the number active
    changeNumberPaginator();
    getMovies(TYPE, CURRENT_PAGE);
  } else if (btn_id === "btn-next") {
    //UPDATE THE PAGES
    CURRENT_PAGE = NEXT_PAGE;
    NEXT_PAGE += 1;
    PREV_PAGE = CURRENT_PAGE - 1;

    //SAME AS EVENT LISTENER LOGIC WHEN WE CLICK ON A LAST NUMBER OF THE ROW
    // 1 2 3 4 5 6 ... 500 -> 6 7 8 9 10 11 ... 500
    if (isLastPage()) {
      deletePrevNumbers();
      renderNextNumbers();
    }
    changeNumberPaginator();
    getMovies(TYPE, CURRENT_PAGE);
  }
  /*when a paginator_button is clicked, remove all the movies in the flex container
  So it is able to add the new 20 */
  const movies_flex = document.getElementById("movies-flex");
  movies_flex.innerHTML = "";
}

//Function that checks if the page clicked, is the last page in the paginator before "..."
function isLastPage() {
  //ignore if it is the last number of all, or last number of all - 1.
  //For example, 500 and 499 will be ignored, so it wont create the numbers after 500
  //Had to include 499, because when we clicked on 494, 499 gets added with the class last-number
  if (CURRENT_PAGE === TOTAL_PAGES || CURRENT_PAGE + 1 === TOTAL_PAGES) {
    return false;
  }

  //If the condition above doesn't meet, get the last-page of the current row and compare it to the page the user clicked (CURRENT_PAGE)
  //IF they are the same, it means the user clicked in the last page of the row, and it will render the new ones
  let last_page = document.getElementsByClassName("last-number");
  let last_page_number = parseInt(last_page[0].id.split("-")[1]);
  let isLastPage;

  CURRENT_PAGE === last_page_number
    ? (isLastPage = true)
    : (isLastPage = false);
  return isLastPage;
}

//Function that checks if the page clicked, is the first page in the current row
//This function is called when we click on button previous, to check if it needs to do
// 6(active) 7 8 9 10 11 ... 500 -> click on button previous -> 1 2 3 4 5(active) 6 ... 500
function isFirstPage() {
  let first_page = document.getElementsByClassName("first-number");
  let first_page_number = parseInt(first_page[0].id.split("-")[1]);
  let isFirstPage;

  CURRENT_PAGE + 1 === first_page_number
    ? (isFirstPage = true)
    : (isFirstPage = false);
  return isFirstPage;
}

//function that changes the active number of paginator
//This function is called whenever the page changes. Either by clicking a paginator number, or a paginator button
function changeNumberPaginator() {
  //get the current paginator numbers (Example: 1 2 3 4 5 6 .. 500 -> [1,2,3,4,5,6,500])
  const paginator_numbers = document.querySelectorAll(".pag-number");

  //for all the numbers in the paginator, check if it's id is equal to the current page clicked, and if it is add the class number-active
  //if it isn't, remove the class number-active;
  //Had to do with a cicle for, because i have my pagination like 1 2 3 4 5 ... 23, and i wouldn't be able to get the previous active page. Basically goes thorugh all of them, and removes the active of the one that already had it
  for (let i = 0; i < paginator_numbers.length; i++) {
    //the id of the <a> elemtn has id for example = pag-3
    //parseInt because the id comes in as a string
    let paginator_number_id = parseInt(paginator_numbers[i].id.split("-")[1]);
    //If the id is equal to the new CURRENT_PAGE add the number_active
    if (paginator_number_id === CURRENT_PAGE) {
      paginator_numbers[i].classList.add("number-active");
    } else {
      //If it is not equal, and the number has the class number-active, it will be removed
      paginator_numbers[i].classList.remove("number-active");
    }
  }

  //CheckMinMax() to check if the new CURRENT_PAGE is either min or max
  checkMinMax();
}

//function that deletes all the numbers on the paginator except the last number of the row, and the last number of all
// 1 2 3 4 5 6 ... 500 -> deletePrevNumbers() -> the numbers 1 2 3 4 5 will be eliminated, and 6 and 500 will remain
//After this function, it is called renderNext Numbers that adds the 7 8 9 10 11 between 6 and 500
function deletePrevNumbers() {
  let paginator_numbers = document.querySelectorAll(".pag-number");
  for (let i = 0; i < paginator_numbers.length - 2; i++) {
    paginator_numbers[i].remove();
  }
}

//function that deletes all the numbers on the paginator except the one after ...
//This function is called when we are on the first page of a row, and we press the button previous
// Example: 6 (active) 7 8 9 10 11 ... 500 -> 1 2 3 4 5(active) 6 ... 500. The numbers 7 8 9 10 11 were deleted
function deleteNextNumbers() {
  for (let i = 5; i >= 0; i--) {
    //This if the next 5 numbers after CURRENT_PAGE aren't greater than the number of TOTAL_PAGES
    //For example, if we had 38(active) 39 40, and we clicked button previous, it would try to delete numbers above 40 that doesn't existe
    if (!(CURRENT_PAGE + 1 + i >= TOTAL_PAGES)) {
      let delete_number = document.getElementById(
        "pag-" + (CURRENT_PAGE + 1 + i)
      );
      delete_number.remove();
    }
  }
}

//function that renders the next numbers
function renderNextNumbers() {
  const span_etc = document.getElementById("etc");
  /*the whole list of numbers is 6 (1 2 3 4 5 6)
  the last number is 6. When we are in the number 6, we have to delete all the numbers (including 6 so we dont accumulate events)
  so for i = 0 to 5, we have to delete the numbers (6-0), (6-1), ... (6-5)
  */

  for (let i = 0; i <= 5; i++) {
    //FOr example, we have the row 1 2 3 4 5 6 ... 500, if we click on 6, the number 6 (6+0 on the cicle), won't be eliminated
    //by the function deletePrevNumbers(), but we to trade classes, because number 6 is now the first number of the row
    if (i !== 0) {
      //Verify if we don't try to create numbers bigger than TOTAL_PAGES (number of pages that come from the endpoint)
      if (!(CURRENT_PAGE + i >= TOTAL_PAGES)) {
        let a_number = createPaginatorNumber(CURRENT_PAGE + i);
        //add last-number, to the new last-number
        if (i === 5) {
          a_number.classList.add("last-number");
        }

        paginator.insertBefore(a_number, span_etc);
      } else {
        // if the current_page + i is greater than TOTAL_PAGES, we need to define the last-number as the last page
        document
          .getElementById("pag-" + TOTAL_PAGES)
          .classList.add("last-number");
      }
    } else {
      //THe previous last number, for example 6, we need to remove the class last number, and add the class first number
      let new_first_number = document.getElementById("pag-" + CURRENT_PAGE);
      new_first_number.classList.remove("last-number");
      new_first_number.classList.add("first-number");
    }
  }

  //add events listeners to the newly created buttons
  addEventsListeners();
}

//function that renders the previous numbers to the number passed, including the number of page
//The example refered above, if we have 6 7 8 9 10 11 ... 500, the numbers 7,8,9,10,11 will be removed in the deleteNextNumbers()
//and we now need to render the new numbers: 1 2 3 4 5
function renderPrevNumbers() {
  for (let i = 5; i >= 0; i--) {
    let a_number = createPaginatorNumber(CURRENT_PAGE + 1 - i);

    //add first-number, to the new first-number
    if (i === 5) {
      a_number.classList.add("first-number");
    }
    //add last-number, to the new last-number
    if (i === 0) {
      a_number.classList.add("last-number");
    }

    paginator.insertBefore(a_number, document.getElementById("etc"));
  }

  //add events listeners to the newly created buttons
  addEventsListeners();
}

//function that creates the element <a>, that consists of the page number of the row
function createPaginatorNumber(number) {
  let a_number = document.createElement("a");
  a_number.className = "pag-number";
  a_number.id = "pag-" + number;
  a_number.textContent = number;
  return a_number;
}
