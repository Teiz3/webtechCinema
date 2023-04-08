const maxMoviesPerPage = 5;
let page = 0;
let dbMovies = [];
let buttonAmount = 4;

//setup container for posters
makeElNode("div", document.body, "", "movie-container");

//make buttons
makeElNode("div", document.body, "", "", "pag__ctrl");
makeElNode("button", getElId("pag__ctrl"), "←", "pag__ctrl__prev");
for(let t=1; t<=buttonAmount; t++){
    makeElNode("button", getElId("pag__ctrl"), t, "pag__ctrl__" + t);
    getElClass("pag__ctrl__" + t).addEventListener("click", function(){loadPage(t)}, false);
}
makeElNode("button", getElId("pag__ctrl"), "→", "pag__crtl__next");
getElClass("pag__crtl__next").addEventListener("click", function(){incrementPage()}, false);
getElClass("pag__ctrl__prev").addEventListener("click", function(){decrementPage()}, false);

//get the first 5 movies
getMovies();

//get 5 movies acording to page nr and generate posters afterwards with the requested movie info
function getMovies(){
    fetch("db?page=" + page +"&limit=" + maxMoviesPerPage)
    .then(res => res.json()).then(
        data => { 
            // console.log("dbmovies in then statement " + data);
            dbMovies = JSON.parse(data);
            makePosters(dbMovies);
        });
};

//next page
function incrementPage(){
    if(page < 3){
        page++;
        // console.log("increment page: " + page);
        getMovies();    
    }
}

//previouspage
function decrementPage(){
    if(page > 0){   
        page--;
        // console.log("decrement page: " + page);
        getMovies();
    }
}

//loadpage
function loadPage(pageNo){
    page = pageNo - 1;
    getMovies();
}

//delete all old posters and make new posters
function makePosters(dbMovies){
    while(getElClass("movie-container").hasChildNodes()){
        getElClass("movie-container").removeChild(getElClass("movie-container").firstChild);
    }

    for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
        movie = dbMovies[i];
        makePoster(movie);
    }
}

//generate an individual poster (needs to be seperate function for the eventlisteners to function properly)
function makePoster(movie){
    makeElNode("div", getElClass("movie-container"), "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    getElId(movie.title).addEventListener("click", function(){openDescriptionPage(movie.title), false});

}

//opens the movie description page of the movie that was pressed
function openDescriptionPage(movie){
    // console.log("go to description of " + movie);
    window.open("/movie/" + movie, "_self");
}