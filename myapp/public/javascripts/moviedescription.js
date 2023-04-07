const movie = movies[0];

descriptionPage();

function descriptionPage(){
    if(movie){
        makeElNode("div", document.body, "", "", "movie-info")
        makeElNode("img", getElId("movie-info"), "", "movie-info", "", {src: "../../images/" + movie.image, alt: "poster of the " + movie.title + " movie"});
        makeElNode('div', getElId("movie-info"), "", "info-container")
        makeElNode("h1", getElClass("info-container"), movie.title, "movie-info");
        makeElNode("p", getElClass("info-container"), movie.desc, "movie-info");
        makeElNode("div", document.body, "", "trailer-container");
        makeElNode("iframe", getElClass("trailer-container"), "", "trailer", "", {src: movie.trailer + "?playlist=" + movie.trailerID + "&autoplay=1&controls=0&disablekb=1&loop=1&mute=1"});
    }
}

function notFound(){

}