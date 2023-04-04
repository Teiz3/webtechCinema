const movie = movies[0];

descriptionPage();

function descriptionPage(){
    if(movie){
        makeElNode("h1", document.body, movie.title);
    }
}

function notFound(){

}