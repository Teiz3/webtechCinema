//the class where all data of actors is stored
class Actors extends Artist{
    constructor(name, yearOfBirth, previousMovies, photoLink, photoAlt, link, tooltip){
        super(name, yearOfBirth, link, tooltip);
        this.firstName = seperateName(name)[0];
        this.previousMovies = previousMovies;
        this.photoLink = photoLink;
        this.photoAlt = photoAlt;
    }
}

//defining the actors
const actorInfo = [
    ["Tom Kenney", 1962, ["SpongeBob SquarePants", "Sponge out of Water", "Transformers: Dark of the Moon", "Transformers: Revenger of the Fallen"], "images/Tom_Kenny.jpg", "Portrait of Tom Kenny", "https://www.imdb.com/name/nm0444786/"],
    ["Bill Fagerbake", 1957, ["SpongeBob SquarePants", "Sponge out of Water", "How I met your Mother", "Jennifer's Body"], "images/Bill_Fagerbakke.jpg", "Portrait of Bill Fagerbakke", "https://www.imdb.com/name/nm0265067/"],
    ["Clancy Brown", 1959, ["SpongeBob SquarePants", "The Shawshank Redemption", "A Nightmare on Elm Street", "Starship Troopers"], "images/Clancy_Brown.jpg", "Portrait of Clancy Brown", "https://www.imdb.com/name/nm0000317/"],
    ["Scarlett Johansson", 1984, ["Under the Skin", "Avengers", "Her", "Lost in Translation"], "images/Scarlett_Johansson.jpg", "Portrait of Clancy Brown", "https://www.imdb.com/name/nm0424060/"]
];

function tooltipActor(i){
    var otherWorks = ""
    for(t=0; t<actorInfo[i][2].length; t++){
        otherWorks += "\n -" + actorInfo[i][2][t];
    }
    return actorInfo[i][0] + " is born in " + actorInfo[i][1] + "\nOther works: " + otherWorks;
}

//list of all Actor class objects
let allActors = [];

//adding the actorInfo to the actor class
for(let i = 0; i<actorInfo.length; i++){
    let name = actorInfo[i][0];
    let x = new Actors(name, actorInfo[i][1], actorInfo[i][2], actorInfo[i][3], actorInfo[i][4], actorInfo[i][5], tooltipActor(i));
    allActors.push(x);
}