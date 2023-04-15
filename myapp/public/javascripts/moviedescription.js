//get the name of the movie from the url
const URLPath = window.location.pathname;
const movieFromUrl = URLPath.split('/').pop();
console.log(movieFromUrl);

//make the container for all content and fetch the content from the database
makeElNode("div", document.body, "", "", "movie-info");
getMovies();

//fetch movie info from database
function getMovies(){
    fetch("../db/desc?movie=" + movieFromUrl)
        .then(res => res.json()).then(
            data => { 
                console.log("moviedescription fetched " + data);
                dbMovies = JSON.parse(data);
                descriptionPage(dbMovies[0]);
    });
}

//make the page with info from db
function descriptionPage(movie){
    if(movie){
        makeElNode("img", getElId("movie-info"), "", "movie-info", "", {src: "./../images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
        makeElNode('div', getElId("movie-info"), "", "info-container");
        makeElNode("h1", getElClass("info-container"), movie.title, "movie-info");
        makeElNode("p", getElClass("info-container"), movie.desc, "movie-info");
        makeElNode("div", document.body, "", "trailer-container");
        makeElNode("iframe", getElClass("trailer-container"), "", "trailer", "", {src: movie.trailer + "?playlist=" + movie.trailerID + "&autoplay=1&controls=0&disablekb=1&loop=1&mute=1"});
        if(dbMovies[1].loggedIn){
            makeElNode("a", getElClass("info-container"), "Order tickets", "", "", {href: "../order?movie=" + movie.movieid});
        }
    }
}