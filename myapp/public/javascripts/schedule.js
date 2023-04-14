const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
const dateOnly = d.getDate();
const month = "-" + (d.getMonth()+1);
let currentWeekday = d.getDay();

makeElNode("hr", document.body, "", "hr");
//setup container for schedule
makeElNode("div", document.body, "", "schedule-container");

//Make weekday buttons
makeElNode("div", getElClass("schedule-container"), "", "schedule-buttons");
for(let i=0; i < 7; i++){
    makeElNode("button", getElClass("schedule-buttons"), (dateOnly+i) + month, "schedule-button-" + i);
    getElClass("schedule-button-" + i).addEventListener("click", function(){loadDay(i)}, false);
}

makeElNode("div", getElClass("schedule-container"), "", "schedule-day");

//Get the schedule of the selected weekday
getSchedule();



function loadDay(day){
    currentWeekday = day;
    console.log(currentWeekday);
    getSchedule();
};

//Get schedule according to weekday
function getSchedule(){
    fetch("db/schedule?weekday=" + weekdays[currentWeekday])
    .then(res => res.json()).then(
        data => { 
            dbSchedule = JSON.parse(data);
            makeSchedule(dbSchedule);
        });
};

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
    makeElNode("p", getElClass("schedule-day"), scheduleEntry.time);
    makeElNode("p", getElClass("schedule-day"), scheduleEntry.title);
};

// for(let i=0; i < 14; i++){
//     let Dates 
//     // for(let j = 0; j < scheduleTimes.length; j++){
//     //     prepStmt.run(i.toString() + j.toString(), getDate(i).toLocaleDateString(), getDate(i).toLocaleString("default", {weekday: "long"}), scheduleTimes[j], randomPositiveNumber(movies.length-1));
//     // };
// };