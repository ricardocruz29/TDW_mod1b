-Pesquisar filme por nome
-Pesquisar filmes por ano
-Pesquisar filmes por genero
-Pesquisar filmes por ano e genero
-Obter informações de um filme através do ID (descoberto num dos endpoints anteriores)

# ENDPOINTS

## GET_GENRES

fetch("https://data-imdb1.p.rapidapi.com/genres/", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIE_ID_BY_TITLE

fetch("https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/Scarface/", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_BY_YEAR

fetch("https://data-imdb1.p.rapidapi.com/movie/byYear/1982/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_BY_GENRE

fetch("https://data-imdb1.p.rapidapi.com/movie/byGen/Drama/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_BY_GENRE_AND_YEAR

fetch("https://data-imdb1.p.rapidapi.com/movie/byYear/2000/byGen/Drama/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIE_DETAILS_BY_ID (RETRIEVED IN THE LAST ENDPOINTS)

fetch("https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_CAST_BY_MOVIE_ID

fetch("https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/cast/", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_AWARDS_BY_MOVIE_ID

fetch("https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/awards/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_BY_ACTOR_ID

fetch("https://data-imdb1.p.rapidapi.com/movie/byActor/nm0000199/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_ORDERED_BY_IMDB_RATING

fetch("https://data-imdb1.p.rapidapi.com/movie/order/byRating/?page_size=100", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET_MOVIES_ORDERED_BY_POPULARITY

fetch("https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});

## GET UPCOMING_MOVIES

fetch("https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/?page_size=50", {
"method": "GET",
"headers": {
"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
"x-rapidapi-key": "3becab2a2bmshd8afad184be5054p16d505jsnd53719f44fef"
}
})
.then(response => {
console.log(response);
})
.catch(err => {
console.error(err);
});
