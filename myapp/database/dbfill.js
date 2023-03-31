var sqlite3 = require("sqlite3").verbose();

//data to be put in the database
const movies = [
    ["Interstellar", "desc"],
    ["Spongebob the movie", "desc"]
]

//returns the database
function getDatabase(){
    return new sqlite3.Database('database/cinema.db');
}

//fills the movie table with all the movie info specified in the movies array above
function fillMovies(){
    var db = getDatabase();
    //prepare sql statement (better performance and prevents sql injection)
    const prepStmt = db.prepare('INSERT INTO Movies(movieid, title, desc) VALUES (?, ?, ?)');
    for(let i = 0; i < movies.length; i++){
        prepStmt.run(i, movies[i][0], movies[i][1]);
    }
    prepStmt.finalize();
}

module.exports = {fillMovies};