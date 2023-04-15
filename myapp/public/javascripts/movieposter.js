const maxMoviesPerPage = 5;
let page = 0;
let dbMovies = [];
let buttonAmount = 4;

//setup container for posters
makeElNode("div", document.body, "", "movie-container");

//make buttons
makeElNode("div", document.body, "", "pag__ctrl");
makeElNode("button", getElClass("pag__ctrl"), "←", "pag__ctrl__prev");
for(let t=1; t<=buttonAmount; t++){
    makeElNode("button", getElClass("pag__ctrl"), t, "pag__ctrl__" + t);
    getElClass("pag__ctrl__" + t).addEventListener("click", function(){loadPage(t)}, false);
}
makeElNode("button", getElClass("pag__ctrl"), "→", "pag__crtl__next");
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
        makePoster(movie, "movie-container");
    }
}

//generate an individual poster (needs to be seperate function for the eventlisteners to function properly)
function makePoster(movie, parentclass){
    makeElNode("div", getElClass(parentclass), "", "movie-poster", movie.title);
    makeElNode("img", getElId(movie.title), "", "movie-poster__image", "", {src: "./images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
    makeElNode("div", getElId(movie.title), movie.title, "movie-poster__overlay");
    getElId(movie.title).addEventListener("click", function(){openDescriptionPage(movie.title), false});

}

//opens the movie description page of the movie that was pressed
function openDescriptionPage(movie){
    // console.log("go to description of " + movie);
    window.open("./movie/" + movie, "_self");
}

/*
===================================schedule==================================================================
*/
const d = new Date();
const dateOnly = d.getDate();
const month = "-" + (d.getMonth()+1);

makeElNode("hr", document.body, "", "hr");
//setup container for schedule
makeElNode("div", document.body, "", "schedule-container");

//Make weekday buttons
makeElNode("div", getElClass("schedule-container"), "", "schedule-buttons");
for(let i=0; i < 7; i++){
    makeElNode("button", getElClass("schedule-buttons"), (dateOnly+i) + month, "schedule-button-" + i);
    getElClass("schedule-button-" + i).addEventListener("click", function(){getSchedule(i)}, false);
}

makeElNode("div", getElClass("schedule-container"), "", "schedule-day");

//Get the schedule of the selected weekday
getSchedule(0);

//Get schedule according to weekday
function getSchedule(offset){
    date = getDate(offset).toISOString().slice(0,10);
    fetch("db/schedule?date=" + date)
    .then(res => res.json()).then(
        data => { 
            dbSchedule = JSON.parse(data);
            makeSchedule(dbSchedule);
        });
};

function getDate(offset){
    var date = new Date(Date.now());
    let today = date.getDate();
    date.setDate(today + offset);
    return date;
}

//Delete old day schedule and make new day schedule
function makeSchedule(dbSchedule){
    while(getElClass("schedule-day").hasChildNodes()){
        getElClass("schedule-day").removeChild(getElClass("schedule-day").firstChild);
    }
    for(let i = 0; i < dbSchedule.length; i++){
        scheduleEntry = dbSchedule[i]; 
        makeScheduleEntry(scheduleEntry);
        // console.log(scheduleEntry);
    }
};

function makeScheduleEntry(scheduleEntry){
    makeElNode('div', getElClass('schedule-day'), '', 'image-container', scheduleEntry.date + scheduleEntry.time);
    makeElNode("img", getElId(scheduleEntry.date + scheduleEntry.time), "", "schedule-day__image", "", {src: "images/" + scheduleEntry.image, alt: "poster of the " + scheduleEntry.title + " movie"});
    makeElNode('div',getElId(scheduleEntry.date + scheduleEntry.time), '', '', scheduleEntry.date + scheduleEntry.time + '-pcontainer');
    makeElNode("p", getElId(scheduleEntry.date + scheduleEntry.time + '-pcontainer'), scheduleEntry.time);
    makeElNode("p", getElId(scheduleEntry.date + scheduleEntry.time + '-pcontainer'), scheduleEntry.title);
    getElId(scheduleEntry.date + scheduleEntry.time).addEventListener("click", function(){openDescriptionPage(scheduleEntry.title), false});
};