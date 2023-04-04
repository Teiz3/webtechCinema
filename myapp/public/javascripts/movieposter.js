// console.log("running");
// console.log(dbMovies);

const maxMoviesPerPage = 10;

for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
    makePoster(dbMovies[i]);
}

function makePoster(movie){
    makeElNode("div", document.body, "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    makeElNode("a", getElId(movie.title), "link", "", "", {href: "/movie/" + movie.title});
}
