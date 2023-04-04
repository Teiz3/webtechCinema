//Directors class
class Director extends Artist{
    constructor(name, yearOfBirth, previousMovies, link, tooltip){
        super(name, yearOfBirth, link, tooltip);
        this.firstName = seperateName(name)[0];
        this.previousMovies = previousMovies;
    }
}

//director information
const directorInfo = [
    ["Stephen Hillenburg", 1961, ["Spongebob SquarePants", "Rocko's Modern Life", "Underwater"], "https://www.imdb.com/name/nm0384864/"],
    ["Mark Osborne", 1970, ["Kung Fu Panda", "Le Petit Prince", "Greener"], "https://www.imdb.com/name/nm0651706/"]
];

function tooltipDirector(i){
    var otherWorks = ""
    for(t=0; t<directorInfo[i][2].length; t++){
        otherWorks += "\n -" + directorInfo[i][2][t];
    }
    return directorInfo[i][0] + " is born in " + directorInfo[i][1] + "\nOther works: " + otherWorks;
}

let allDirectors = [];

//making the directors classe with info from directorinfo
for(let i = 0; i<directorInfo.length; i++){
    let name = directorInfo[i][0];
    let x = new Director(name, directorInfo[i][1], directorInfo[i][2], directorInfo[i][3], tooltipDirector(i));
    allDirectors.push(x);
}

