const maxMoviesPerPage = 5;
let page = 0;
let dbMovies = [];

makeElNode("div", document.body, "", "movie-container");
setup();

function setup(){
    fetch("db?page=" + page +"&limit=" + maxMoviesPerPage)
    .then(res => res.json()).then(
        data => { 
            console.log("dbmovies in then statement " + data);
            dbMovies = JSON.parse(data);
            generateIndexPage(dbMovies);
        });
};

function getMovies(){
    fetch("db?page=" + page +"&limit=" + maxMoviesPerPage)
    .then(res => res.json()).then(
        data => { 
            console.log("dbmovies in then statement " + data);
            dbMovies = JSON.parse(data);
            makePosters(dbMovies);
        });
};

function generateIndexPage(dbMovies){

    makePosters(dbMovies);

    makeElNode("button", document.body, "Next", "movie-next");
    makeElNode("button", document.body, "Previous", "movie-prev");
    
    getElClass("movie-next").addEventListener("click", function(){incrementPage()}, false);
    getElClass("movie-prev").addEventListener("click", function(){decrementPage()}, false);
}




function incrementPage(){
    if(page < 3){
        page++;
        console.log("increment page: " + page);
        getMovies();    
    }
}

function decrementPage(){
    if(page > 0){   
        page--;
        console.log("decrement page: " + page);
        getMovies();
    }
}

function makePosters(dbMovies){
    while(getElClass("movie-container").hasChildNodes()){
        getElClass("movie-container").removeChild(getElClass("movie-container").firstChild);
    }

    for(let i = 0; i < Math.min(dbMovies.length, maxMoviesPerPage); i++){
        movie = dbMovies[i];
        
        makeElNode("div", getElClass("movie-container"), "", "movie-poster", movie.title);
        makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
        makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
        // makeElNode("a", getElId(movie.title), "link", "", "", {href: "/movie/" + movie.title});
        getElId(movie.title).addEventListener("click", function(){openDescriptionPage(movie.title), false});
    }
}

function openDescriptionPage(movie){
    console.log("go to description of " + movie);
    window.open("/movie/" + movie, "_self");
}