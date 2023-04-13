var path = require('path');
var sqlite3 = require("sqlite3").verbose();

//data to be put in the movie table
const movies = [
    ["Spongebob the movie", "SpongeBob SquarePants takes leave from the town of Bikini Bottom in order to track down King Neptune's stolen crown.", "SpongeBob_the_Movie.jpg", "https://www.youtube.com/embed/47ceXAEr2Oo", "47ceXAEr2Oo"],
    ["Sponge out of Water", "When a diabolical pirate above the sea steals the secret Krabby Patty formula, SpongeBob and his nemesis Plankton must team up in order to get it back.", "Spongebob_Movie_2_Sponge_Out_Of_Water.jpg", "https://www.youtube.com/embed/e9awLSibQ80", "e9awLSibQ80"],
    ["Sponge on the Run", "After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to The Lost City of Atlantic City to bring Gary home.", "Sponge_on_the_Run.jpg", "https://www.youtube.com/embed/a2cowVH03Xo", "a2cowVH03Xo"],
    ["Interstellar", "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", "Interstellar.jpg", "https://www.youtube.com/embed/Lm8p5rlrSkY", "Lm8p5rlrSkY"],
    ["Phineas and Ferb Across the 2nd Dimension", "Phineas and Ferb discover that Perry is a secret agent, and they all get stuck in an alternate dimension where Doofenschmirtz is the ruler of the tri-state area.", "Phineas_and_Ferb_Across_the_2nd_Dimension.jpg", "https://www.youtube.com/embed/jwfNAPIfip4", "jwfNAPIfip4"],
    ["Phineas and Ferb: Candace against the universe", "The famed stepbrother inventors know what they're gonna do today. They're gonna rescue their sister from an alien abduction.", "Phineas_and_Ferb_Candace_Against_the_Universe.jpg", "https://www.youtube.com/embed/jcqziqIcJ_g", "jcqziqIcJ_g"],
    ["Forrest Gump", "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", "Forrest_Gump.jpg", "https://www.youtube.com/embed/bLvqoHBptjg", "bLvqoHBptjg"],
    ["The Prestige", "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.", "The_Prestige.jpg", "https://www.youtube.com/embed/RLtaA9fFNXU", "RLtaA9fFNXU"],
    ["Django Unchained", "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.", "Django_Unchained.jpg", "https://www.youtube.com/embed/_iH0UBYDI4g", "_iH0UBYDI4g"],
    ["Apollo 13", "NASA must devise a strategy to return Apollo 13 to Earth safely after the spacecraft undergoes massive internal damage putting the lives of the three astronauts on board in jeopardy.", "Apollo_13.jpg", "https://www.youtube.com/embed/KtEIMC58sZo", "KtEIMC58sZo"],
    ["Saving Private Ryan", "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.", "Saving_Private_Ryan.jpg", "https://www.youtube.com/embed/9CiW_DgxCnQ", "9CiW_DgxCnQ"],
    ["The Shawshank Redemption", "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.", "The_Shawshank_Redemption.jpg", "https://www.youtube.com/embed/6hB3S9bIaco", "6hB3S9bIaco"],
    ["Knives Out", "A detective investigates the death of the patriarch of an eccentric, combative family.", "Knives_Out.jpg", "https://www.youtube.com/embed/xi-1NchUqMA", "xi-1NchUqMA"],
    ["Glass Onion", "Famed Southern detective Benoit Blanc travels to Greece for his latest case.", "Glass_Onion.jpg", "https://www.youtube.com/embed/gj5ibYSz8C0", "gj5ibYSz8C0"],
    ["Bullet Train", "Five assassins aboard a swiftly-moving bullet train find out that their missions have something in common.", "Bullet_Train.jpg", "https://www.youtube.com/embed/0IOsk2Vlc4o", "0IOsk2Vlc4o"],
    ["Ratatouille", "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.", "Ratatouille.jpg", "https://www.youtube.com/embed/NgsQ8mVkN8w", "NgsQ8mVkN8w"],
    ["The Emperor's New Groove", "Emperor Kuzco is turned into a llama by his ex-administrator Yzma, and must now regain his throne with the help of Pacha, the gentle llama herder.", "The_Emperor's_New_Groove.jpg", "https://www.youtube.com/embed/JX6btxoFhI8", "JX6btxoFhI8"],
    ["Murder on the Orient Express", "When a murder occurs on the train on which he's travelling, celebrated detective Hercule Poirot is recruited to solve the case.", "Murder_on_the_Orient_Express.jpg", "https://www.youtube.com/embed/Mq4m3yAoW8E", "Mq4m3yAoW8E"],
    ["Iron Man", "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.", "Iron_Man.jpg", "https://www.youtube.com/embed/8ugaeA-nMTc", "8ugaeA-nMTc"],
    ["Star Wars IV: A New Hope", "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.", "Star_Wars_IV_A_New_Hope.jpg", "https://www.youtube.com/embed/vZ734NWnAHA", "vZ734NWnAHA"]
];

const scheduleTimes = ["11:00", "13:00", "16:00", "20:00"];

function regenerateDatabase(){
    // var db = new sqlite3.Database(path.join(__dirname, 'cinema.db'));
    
    deleteDatabase();
    setTimeout(createDatabase, 100);
    setTimeout(fillMovies, 300);
    setTimeout(fillSchedule, 300);
}

function deleteDatabase(){
    let db = getDatabase();
    console.log("started deleting");
    const sqlDropMovies = 'DROP TABLE IF EXISTS Movies'
    const sqlDropSchedule = "DROP TABLE IF EXISTS Schedule"
    const sqlDropUsers = 'DROP TABLE IF EXISTS Users'
    const sqlDropOrders = 'DROP TABLE IF EXISTS Orders'
    db.run(sqlDropSchedule);
    db.run(sqlDropMovies);
    db.run(sqlDropUsers);
    db.run(sqlDropOrders);
    db.close();
    console.log("finished deleting");
}

function createDatabase(){
    let db = getDatabase();
    console.log("start creating");
    const sqlCreateMovies = 'CREATE TABLE Movies (movieid INT UNIQUE, title TEXT NOT NULL UNIQUE, desc TEXT, image TEXT, trailer TEXT, trailerID TEXT, PRIMARY KEY(movieid))';
    db.run(sqlCreateMovies);
    const sqlCreateSchedule = 'CREATE TABLE Schedule (scheduleid INT, date TEXT, weekday TEXT, time TEXT, movieid INT, PRIMARY KEY(scheduleid), FOREIGN KEY(movieid) REFERENCES Movies(movieid))';
    db.run(sqlCreateSchedule);
    const sqlCreateUsers = 'CREATE TABLE Users (userid INT UNIQUE, fullname TEXT, username TEXT, password TEXT, email TEXT, street TEXT, streetno INT, creditcard INT, PRIMARY KEY(userid))';
    db.run(sqlCreateUsers);
    const sqlCreateOrders = 'CREATE TABLE Orders (orderid INT UNIQUE, schedule INT, user INT, date TEXT, nroftickets INT, PRIMARY KEY(orderid), FOREIGN KEY(schedule) REFERENCES Schedule(scheduleid), FOREIGN KEY(user) REFERENCES User(userid))';
    db.run(sqlCreateOrders);
    db.close();
    console.log("finished creating");
}

// returns the database
function getDatabase(){
    return new sqlite3.Database(path.join(__dirname, 'cinema.db'));
}



//fills the movie table with all the movie info specified in the movies array above
function fillMovies(){
    let db = getDatabase();
    console.log("started filling movies");
    //prepare sql statement (better performance and prevents sql injection)
    const prepStmt = db.prepare('INSERT INTO Movies(movieid, title, desc, image, trailer, trailerID) VALUES (?, ?, ?, ?, ?, ?)');
    for(let i = 0; i < movies.length; i++){
        prepStmt.run(i, movies[i][0], movies[i][1], movies[i][2], movies[i][3], movies[i][4]);
    }
    prepStmt.finalize();
    db.close();
    console.log("finished filling movies");
}

//fills the schedule table with all schedule information
function fillSchedule(){
    let db = getDatabase();
    console.log("started filling schedule");
    //prepare sql statement
    const prepStmt = db.prepare('INSERT INTO Schedule(scheduleid, date, weekday, time, movieid) VALUES (?, ?, ?, ?, ?)');
    for(let i=0; i < 14; i++){
        for(let j = 0; j < scheduleTimes.length; j++){
            prepStmt.run(i.toString() + j.toString(), getDate(i).toLocaleDateString(), getDate(i).toLocaleString("default", {weekday: "long"}), scheduleTimes[j], randomPositiveNumber(movies.length-1));
        };
    };
    prepStmt.finalize();
    db.close();
    console.log("finished filling schedule");
}

function getDate(offset){
    var date = new Date(Date.now());
    let today = date.getDate();
    date.setDate(today + offset);
    // let result = date.toISOString();
    return date;
}

function randomPositiveNumber(max){
    var randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
}


module.exports = {regenerateDatabase};