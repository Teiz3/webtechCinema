var sqlite3 = require("sqlite3").verbose();

//data to be put in the database
const movies = [
    ["Spongebob the movie", "desc", "SpongeBob_the_Movie.jpg"],
    ["Sponge out of Water", ""],
    ["Sponge on the Run", ""],
    ["Intestellar", ""],
    ["Phineas and Ferb Across the 2nd Dimension", ""],
    ["Phineas and Ferb: Candace against the universe", ""],
    ["Forrest Grump", ""],
    ["The Prestige", ""],
    ["Django Unchained", ""],
    ["Apollo 13", ""],
    ["Saving Private Ryan", ""],
    ["Shawshank Redemption", ""],
    ["Knives Out", ""],
    ["Glass Onion", ""],
    ["Bullet Train", ""],
    ["Ratatouille", ""],
    ["The Emperor's New Groove", ""],
    ["Murder on the Orient Express", ""],
    ["Iron Man", ""],
    ["Star Wars IV: A New Hope", ""]
]

//returns the database
function getDatabase(){
    return new sqlite3.Database('database/cinema.db');
}

//fills the movie table with all the movie info specified in the movies array above
function fillMovies(){
    var db = getDatabase();
    //prepare sql statement (better performance and prevents sql injection)
    const prepStmt = db.prepare('INSERT INTO Movies(movieid, title, desc, image) VALUES (?, ?, ?, ?)');
    for(let i = 0; i < movies.length; i++){
            prepStmt.run(i, movies[i][0], movies[i][1], movies[i][2]);
    }
    prepStmt.finalize();
}

module.exports = {fillMovies};