/*
    Generates the order page
*/

//get the name of the movie from the url
const URLPath = window.location.href;
const queryFromUrl = URLPath.split('?').pop();
let params = new URLSearchParams(queryFromUrl);
const movieid = params.get("movie");

makeElNode("div", document.body, "", "movie-container");
getMovies();

//fetch movie info from database
function getMovies(){
    fetch("./db/order?movieid=" + movieid)
        .then(res => res.json()).then(
            data => { 
                console.log("movieorder fetched " + data);
                dbMovies = JSON.parse(data);
                orderPage(dbMovies[0][0], dbMovies[1]);
    });
}

let chosenSchedule = null;

//generated the order page
function orderPage(movie, schedule){
    //show some info of the movie that you are buying tickets for
    makeElNode("img", getElClass("movie-container"), "", "", "", {src: "./images/" + movie.image});
    makeElNode("div", getElClass("movie-container"), "", "schedule-container", "");
    makeElNode('h2', getElClass("schedule-container"), movie.title);
    //generate buttons with all available schedule times
    for(let i = 0; i < schedule.length; i++){
        let currentschedule = schedule[i];
        makeElNode("button", getElClass("schedule-container"), currentschedule.date + " - " + currentschedule.time, "", currentschedule.date + " - " + currentschedule.time);
        getElId(currentschedule.date + " - " + currentschedule.time).addEventListener("click", () => {timeChosen(currentschedule)});
    }
    //input field to select the number of buttons
    makeElNode("input", getElClass("schedule-container"), "", "", "ticket-amount", {type: "number", value: "1", min: "1", max: "20"});
    getElId("ticket-amount").addEventListener("change", () => {ticketAmountChosen(getElId("ticket-amount"))});
    //Your order data and confirmation
    makeElNode("div", getElClass("movie-container"), "", "confirming-container");
    makeElNode("h3", getElClass("confirming-container"), "Your order");
    makeElNode("ul", getElClass("confirming-container"), "", "order-data");
    makeElNode("li", getElClass("order-data"), "Movie: " + movie.title);
    makeElNode("li", getElClass("order-data"), "Select a date", "", "date-chosen");
    makeElNode("li", getElClass("order-data"), "Select a timeslot", "", "timeslot-chosen");
    makeElNode("li", getElClass("order-data"), "Ticket amount: 1", "", "ticketAmount-chosen");
    makeElNode("button", getElClass("confirming-container"), "Confirm order", "", "confirm-order");
    getElId("confirm-order").addEventListener("click", () => {confirmOrder(movie, chosenSchedule, getElId("ticket-amount").value)})

}

//function gets called when you select a 
function timeChosen(schedule){
    // console.log("I am the chosen one " + schedule.scheduleid);
    getElId("date-chosen").childNodes[0].textContent = "Date: " + schedule.date;
    getElId("timeslot-chosen").childNodes[0].textContent = "Time: " + schedule.time;
    chosenSchedule = schedule;
}
//function gets called when you change the number of tickets
function ticketAmountChosen(inputNode){
    getElId("ticketAmount-chosen").childNodes[0].textContent = "Ticket amount: " + inputNode.value;
}
//function gets called when you click the confirm order button and fetches your data( to be stored in the db)
function confirmOrder(movie, schedule, tickets){
    if(schedule){
        console.log("order confirmed for " + movie.movieid + " on " + schedule.scheduleid + " with " + tickets + " tickets");
        fetch('./db/order/confirm?schedule=' + schedule.scheduleid + '&tickets=' + tickets).then(

        );
    }
}