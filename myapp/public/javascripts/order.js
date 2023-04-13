//get the name of the movie from the url
const URLPath = window.location.href;
const queryFromUrl = URLPath.split('?').pop();
let params = new URLSearchParams(queryFromUrl);
const movieid = params.get("movie");

makeElNode("div", document.body, "", "movie-container");
getMovies();

//fetch movie info from database
function getMovies(){
    fetch("../db/order?movieid=" + movieid)
        .then(res => res.json()).then(
            data => { 
                console.log("movieorder fetched " + data);
                dbMovies = JSON.parse(data);
                orderPage(dbMovies[0][0], dbMovies[1]);
    });
}

function orderPage(movie, schedule){
    makeElNode("img", getElClass("movie-container"), "", "", "", {src: "../images/" + movie.image});
    makeElNode("div", getElClass("movie-container"), "", "schedule-container", "", {src: "../images/" + movie.image});
    makeElNode('h2', getElClass("schedule-container"), movie.title);
    for(let i = 0; i < schedule.length; i++){
        let currentschedule = schedule[i];
        makeElNode("button", getElClass("schedule-container"), currentschedule.date + " - " + currentschedule.time);
    }
}