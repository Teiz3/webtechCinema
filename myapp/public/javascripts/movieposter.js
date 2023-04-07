const maxMoviesPerPage = 5;
let page = 0;
let dbMovies = [];

getMovies();

function getMovies(){
    fetch("db?page=" + page +"&limit=" + maxMoviesPerPage)
    .then(res => res.json()).then(
        data => { 
            console.log("dbmovies in then statement " + data);
            dbMovies = JSON.parse(data);
            generateIndexPage(dbMovies);
        });
};
// console.log("running");
// console.log("" + dbMovies);

// async function getMovies(){
//     const res = fetch("db?page=" + page +"&limit=" + maxMoviesPerPage);
//     data = (await res).json();
//     dbMovies = data;
//     console.log(dbMovies);
    
// }

// getMovies();

function generateIndexPage(dbMovies){
    makeElNode("div", document.body, "", "movie-container");

    for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
        makePoster(dbMovies[i]);
    }
    
    // if()
    makeElNode("button", document.body, "Next", "movie-next");
    makeElNode("button", document.body, "Previous", "movie-prev");

    getElClass("movie-next").addEventListener("click", function(){incrementPage()}, false);
    getElClass("movie-prev").addEventListener("click", function(){decrementPage()}, false);
}


function incrementPage(){
    page++;
    console.log("increment");
    getMovies();
}

function decrementPage(){
    page--;
    console.log("decrement");
    getMovies();
}

function makePoster(movie){
    makeElNode("div", getElClass("movie-container"), "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    // makeElNode("a", getElId(movie.title), "link", "", "", {href: "/movie/" + movie.title});
    getElId(movie.title).addEventListener("click", function(){openDescriptionPage(movie.title), false});
}

function openDescriptionPage(movie){
    console.log("go to description of " + movie);
    window.open("/movie/" + movie, "_self");
}