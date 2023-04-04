makeElNode("main", document.body);
//==========Article for everything that has to do with the movie=========
makeElNode("article", getElTag("main"), "", "spongebob-movie");
//Title and subtitle section
makeElNode("div", getElClass("spongebob-movie"), "", "spongebob-movie__title-section");
makeElNode("h2", getElClass("spongebob-movie__title-section"), spongebobMovie.title, "spongebob-movie__title");
makeElNode("p", getElClass("spongebob-movie__title-section"), spongebobMovie.year + " \267 " + spongebobMovie.genre, "spongebob-movie__subtitle");
//Trailer, poster and movie info section
makeElNode("div", getElClass("spongebob-movie"), "", "spongebob-movie__movie-grid");
//Poster
makeElNode("div", getElClass("spongebob-movie__movie-grid"), "", "spongebob-movie__poster-container");
var moviePoster = spongebobMovie.makePoster();
getElClass("spongebob-movie__poster-container").appendChild(moviePoster);
//Trailer div
makeElNode("div", getElClass("spongebob-movie__movie-grid"), "", "spongebob-movie__trailer-container");
var movieTrailer = spongebobMovie.makeTrailer();
getElClass("spongebob-movie__trailer-container").appendChild(movieTrailer);
//Movie information div
makeElNode("section", getElClass("spongebob-movie__movie-grid"), "", "spongebob-movie__info-container");
let infoContainer = getElClass("spongebob-movie__info-container");
makeElNode("h3", infoContainer, spongebobMovie.plot);

artistInfoLinks(infoContainer, "Directed by: ", allDirectors);
artistInfoLinks(infoContainer, "Written by: ", allWriters);
artistInfoLinks(infoContainer, "Starring: ", allActors);

makeElNode("hr", infoContainer, "", "spongebob-movie__trailer-link");
var trailerLink = spongebobMovie.makeTrailerLink(); //link only visible in mobile view
infoContainer.appendChild(trailerLink);

//=============Artists information================
makeElNode("div", getElTag("main"), "", "artists");
//---------Directors information---------
makeElNode("article", getElClass("artists"), "", "directors");
makeElNode("h4", getElClass("directors"), "DIRECTORS");
makeElNode("div", getElClass("directors"), "", "directors__grid");
//makes a section with information for each director

artistInfoDisplay("directors", allDirectors);

//-------Writers information--------
makeElNode("article", getElClass("artists"), "", "writers");
makeElNode("h4", getElClass("writers"), "WRITERS");
makeElNode("div", getElClass("writers"), "", "writers__grid");

artistInfoDisplay("writers", allWriters);

//-------Actors information--------
makeElNode("article", getElClass("artists"), "", "actors");
makeElNode("h4", getElClass("actors"), "ACTORS");
makeElNode("div", getElClass("actors"), "", "actors__grid");

artistInfoDisplay("actors", allActors);