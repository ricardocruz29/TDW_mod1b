function renderMenu(page) {
  const main = document.getElementById("body");

  var nav = document.createElement("nav");
  var sidemenu = document.createElement("div");
  sidemenu.className = "sidemenu";

  /* MAIN LOGO */
  var logo = document.createElement("div");
  logo.className = "logo";
  var logo_icon = [
    "CeMovies",
    '<svg xmlns="http://www.w3.org/2000/svg" class="logo-img" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /> </svg>',
  ];

  logo.innerHTML = logo_icon[1];
  var logo_text = document.createElement("p");
  logo_text.className = "logo-name";
  logo_text.textContent = logo_icon[0];
  logo.append(logo_text);
  sidemenu.append(logo);

  /* MENU ICONS */
  var menu_icons = {
    home: [
      "Home",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> </svg>',
      "index.html",
    ],
    movies: [
      "Movies",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /> </svg>',
      "movies.html",
    ],
    series: [
      "Series",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" /> <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" /> </svg>',
      "series.html",
    ],
    artists: [
      "Artists",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /> </svg>',
      "artists.html",
    ],
  };

  var menu = document.createElement("div");
  menu.className = "menu";
  var menu_title = document.createElement("p");
  menu_title.className = "sub-menu-title";
  menu_title.textContent = "MENU";
  menu.append(menu_title);
  var ul_menu = document.createElement("ul");

  for (let i in menu_icons) {
    var a_item = document.createElement("a");
    a_item.href = menu_icons[i][2];
    var li_item = document.createElement("li");
    if (page.includes(i)) {
      a_item.className = "menu-option option--active";
    } else {
      a_item.className = "menu-option";
    }

    a_item.innerHTML = menu_icons[i][1] + menu_icons[i][0];
    li_item.append(a_item);
    ul_menu.append(li_item);
  }

  menu.append(ul_menu);

  /* GENERAL ICONS */
  var general_icons = {
    settings: [
      "Settings",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /> </svg>',
      "settings.html",
    ],
    aboutus: [
      "About Us",
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /> </svg>',
      "aboutus.html",
    ],
  };

  var general = document.createElement("div");
  general.className = "general";
  var general_title = document.createElement("p");
  general_title.className = "sub-menu-title";
  general_title.textContent = "GENERAL";
  general.append(general_title);
  var ul_general = document.createElement("ul");

  for (let i in general_icons) {
    var a_item = document.createElement("a");
    a_item.href = general_icons[i][2];
    var li_item = document.createElement("li");
    if (page.includes(i)) {
      a_item.className = "menu-option option--active";
    } else {
      a_item.className = "menu-option";
    }

    a_item.innerHTML = general_icons[i][1] + general_icons[i][0];
    li_item.append(a_item);
    ul_general.append(li_item);
  }
  general.append(ul_general);

  sidemenu.append(menu);
  sidemenu.append(general);

  nav.append(sidemenu);

  main.prepend(nav);
}
