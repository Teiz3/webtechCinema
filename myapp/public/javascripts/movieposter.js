// console.log("running");
// console.log(dbMovies);

const maxMoviesPerPage = 2;

for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
    makePoster(dbMovies[i]);
}

function makePoster(movie){
    makeElNode("div", document.body, "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: movie.desc});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    // getElId(movie.title).addEventListener("click", )
}
