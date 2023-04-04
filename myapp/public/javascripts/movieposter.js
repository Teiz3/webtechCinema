// console.log("running");
// console.log(dbMovies);

const maxMoviesPerPage = 5;

makeElNode("div", document.body, "", "movie-container");

for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
    makePoster(dbMovies[i]);
}

function makePoster(movie){
    makeElNode("div", getElClass("movie-container"), "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    makeElNode("a", getElId(movie.title), "link", "", "", {href: "/movie/" + movie.title});
}
