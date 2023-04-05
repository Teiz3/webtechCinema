const movie = movies[0];

descriptionPage();

function descriptionPage(){
    if(movie){
        makeElNode("h1", document.body, movie.title);
        makeElNode("div", document.body, "", "trailer-container");
        makeElNode("iframe", getElClass("trailer-container"), "", "trailer", "", {src: movie.trailer + "?autoplay=1&controls=0&disablekb=1&mute=1"});
    }
}

function notFound(){

}