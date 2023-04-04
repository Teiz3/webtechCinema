class Movie{
    constructor(title, genre, year, director, writers, actors, poster, trailer, plot, movieClass){
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.director = director;
        this.writers = writers;
        this.actors = actors;
        this.poster = poster;
        this.trailer = trailer;
        this.plot = plot;
        this.movieClass = movieClass;
    }

    makePoster(posterClass){
        var moviePoster = document.createElement("img");
        moviePoster.src=this.poster;
        moviePoster.alt= this.title + " poster";
        moviePoster.className= this.movieClass + "__poster";
        return moviePoster;
    }

    makeTrailer(){
        var movieTrailer = document.createElement("iframe");
        movieTrailer.src=this.trailer;
        movieTrailer.className=this.movieClass + "__trailer";
        return movieTrailer;
    }

    makeTrailerLink(){
        var trailerLink = document.createElement("a");
        trailerLink.className = this.movieClass + "__trailer-link";
        trailerLink.setAttribute("href", this.trailer);
        trailerLink.setAttribute("target", "_blank");
        var trailerLinkText = document.createTextNode("Watch the Trailer here!");
        trailerLink.appendChild(trailerLinkText);
        return trailerLink;
    }
}

//Making the movie object
const spongebobMovie = new Movie("The SpongeBob SquarePants Movie", "Cartoon", 2004, allDirectors, allWriters, allActors, "Images/spongebob_the_movie.jpg", 
                                "https://www.youtube.com/embed/47ceXAEr2Oo", "SpongeBob goes on an adventure with his best friend Patrick to return the stolen crown of king Neptune.", "spongebob-movie")                             