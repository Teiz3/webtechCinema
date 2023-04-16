/*
    This file deletes, creates and fills the database. Used during development when changes where made to the database.
*/
var path = require('path');
var sqlite3 = require("sqlite3").verbose();
var bcrypt = require('bcrypt');

class User{
    constructor(fullname, username, password, email, street, streetno, creditcard){
        this.fullname = fullname;
        this.username = username;
        this.password = bcrypt.hashSync(password, 10);
        this.email = email;
        this.street = street;
        this.streetno = streetno;
        this.creditcard = bcrypt.hashSync('' + creditcard, 10);
    }
};

user0 = new User('Ruben de Groot', 'Rubarber', 'feestwinkel', 'r.m.degroot@students.uu.nl', 'Koele Jongens Straat', 420, 24432);
user1 = new User('Thijs Kanters', 'Teiz', 'fopshop', 't.kanters@students.uu.nl', 'Koele Jongens Straat', 421, 53123);
user2 = new User('Gordon', 'NotGordon', 'ikbengeensteenikbeneenpersoon', 'gordon@gmail.com', 'Zanger Straat', 43, 63432);
user3 = new User('Peter Lub', 'DieGroene', 'tattoovanjouwnaam', 'kud@outlook.com', 'Animatie Straat', 1, 25641);
user4 = new User('Geralt of Rivia', 'Roach', 'windshowling', 'gor@gmail.com', 'Game Straat', 3, 73214);
const users = [user0, user1, user2, user3, user4];

class Order{
    constructor(schedule, user, date, nroftickets){
        this.schedule = schedule;
        this.user = user;
        this.date = date;
        this.nroftickets = nroftickets;
    }
}
order0 = new Order(12, 0, '16/04/2023', 2);
order1 = new Order(50, 0, '20/04/2023', 2);
order2 = new Order(63, 1, '21/04/2023', 2);
order3 = new Order(71, 1, '22/04/2023', 5);
order4 = new Order(100, 2, '25/04/2023', 1);
order5 = new Order(111, 2, '26/04/2023', 6);
order6 = new Order(121, 2, '27/04/2023', 4);
order7 = new Order(30, 3, '18/04/2023', 6);
order8 = new Order(51, 3, '20/04/2023', 3);
order9 = new Order(12, 3, '16/04/2023', 3);
const orders = [order0, order1, order2, order3, order4, order5, order6, order7, order8, order9];


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


const scheduleTimes = ["11:00", "13:00", "16:00", "20:00"]; //all the times a movie is played in our schedule

//this function is called by the databasemanager to regenerate the database
function regenerateDatabase(){
    
    deleteDatabase();
    setTimeout(createDatabase, 100);
    setTimeout(fillMovies, 300);
    setTimeout(fillSchedule, 500);
    setTimeout(fillUsers, 700);
    setTimeout(fillOrders, 900);
}

//deletes all the old tables
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

//creates all tables in the database
function createDatabase(){
    let db = getDatabase();
    console.log("start creating");
    const sqlCreateMovies = 'CREATE TABLE Movies (movieid INT UNIQUE, title TEXT NOT NULL UNIQUE, desc TEXT, image TEXT, trailer TEXT, trailerID TEXT, PRIMARY KEY(movieid))';
    db.run(sqlCreateMovies);
    const sqlCreateSchedule = 'CREATE TABLE Schedule (scheduleid INT, date TEXT, weekday TEXT, time TEXT, movieid INT, PRIMARY KEY(scheduleid), FOREIGN KEY(movieid) REFERENCES Movies(movieid))';
    db.run(sqlCreateSchedule);
    const sqlCreateUsers = 'CREATE TABLE Users (userid INT UNIQUE, fullname TEXT, username TEXT UNIQUE, password TEXT, email TEXT, street TEXT, streetno INT, creditcard INT, PRIMARY KEY(userid))';
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
            prepStmt.run(i.toString() + j.toString(), getDate(i).toISOString().slice(0, 10), getDate(i).toLocaleString("default", {weekday: "long"}), scheduleTimes[j], randomPositiveNumber(movies.length-1));
        };
    };
    prepStmt.finalize();
    db.close();
    console.log("finished filling schedule");
}

//fills the schedule table with all user information
function fillUsers(){
    let db = getDatabase();
    console.log('started filling users');
    const prepStmt = db.prepare('INSERT INTO Users(userid, fullname, username, password, email, street, streetno, creditcard) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    for(let i=0; i < users.length; i++){
        prepStmt.run(i, users[i].fullname, users[i].username, users[i].password, users[i].email, users[i].street, users[i].streetno, users[i].creditcard);
    }
    prepStmt.finalize();
    db.close();
    console.log('finished filling users');
}

//fills the schedule table with all order information
function fillOrders(){
    let db = getDatabase();
    console.log('started filling orders');
    const prepStmt = db.prepare('INSERT INTO Orders(orderid, schedule, user, date, nroftickets) VALUES (?, ?, ?, ?, ?)');
    for(let i=0; i < orders.length; i++){
        prepStmt.run(i, orders[i].schedule, orders[i].user, orders[i].date, orders[i].nroftickets)
    }
    prepStmt.finalize();
    db.close();
    console.log('finished filling orders');
}

//gets the current date and adds "offset" days to it (needed for generating a schedule)
function getDate(offset){
    var date = new Date(Date.now());
    let today = date.getDate();
    date.setDate(today + offset);
    // let result = date.toISOString();
    return date;
}

//returns a random positive number between 0 and max
function randomPositiveNumber(max){
    var randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
}

module.exports = {regenerateDatabase};