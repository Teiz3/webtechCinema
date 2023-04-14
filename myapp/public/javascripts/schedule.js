// const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const d = new Date();
// const dateOnly = d.getDate();
// const month = "-" + (d.getMonth()+1);
// let currentWeekday = d.getDay();

// makeElNode("hr", document.body, "", "hr");
// //setup container for schedule
// makeElNode("div", document.body, "", "schedule-container");

// //Make weekday buttons
// makeElNode("div", getElClass("schedule-container"), "", "schedule-buttons");
// for(let i=0; i < 7; i++){
//     makeElNode("button", getElClass("schedule-buttons"), (dateOnly+i) + month, "schedule-button-" + i);
//     getElClass("schedule-button-" + i).addEventListener("click", function(){getSchedule(i)}, false);
// }

// makeElNode("div", getElClass("schedule-container"), "", "schedule-day");

// //Get the schedule of the selected weekday
// getSchedule(0);



// // function loadDay(day){
// //     currentWeekday = day;
// //     console.log(currentWeekday);
// //     getSchedule();
// // };

// //Get schedule according to weekday
// function getSchedule(offset){
//     date = getDate(offset).toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day: "2-digit"});
//     fetch("db/schedule?date=" + date)
//     .then(res => res.json()).then(
//         data => { 
//             dbSchedule = JSON.parse(data);
//             makeSchedule(dbSchedule);
//         });
// };

// function getDate(offset){
//     var date = new Date(Date.now());
//     let today = date.getDate();
//     date.setDate(today + offset);
//     return date;
// }

// //Delete old day schedule and make new day schedule
// function makeSchedule(dbSchedule){
//     while(getElClass("schedule-day").hasChildNodes()){
//         getElClass("schedule-day").removeChild(getElClass("schedule-day").firstChild);
//     }
//     for(let i = 0; i < dbSchedule.length; i++){
//         scheduleEntry = dbSchedule[i]; 
//         makeScheduleEntry(scheduleEntry);
//         // console.log(scheduleEntry);
//     }
// };

// function makeScheduleEntry(scheduleEntry){
//     makeElNode('div', getElClass('schedule-day'), '', 'image-container', scheduleEntry.date + scheduleEntry.time);
//     makeElNode("img", getElId(scheduleEntry.date + scheduleEntry.time), "", "schedule-day__image", "", {src: "images/" + scheduleEntry.image, alt: "poster of the " + scheduleEntry.title + " movie"});
//     makeElNode("p", getElId(scheduleEntry.date + scheduleEntry.time), scheduleEntry.time);
//     makeElNode("p", getElId(scheduleEntry.date + scheduleEntry.time), scheduleEntry.title);
// };