//Writers class
class Writers extends Artist{
    constructor(name, yearOfBirth, previousMovies, link, tooltip){
        super(name, yearOfBirth, link, tooltip);
        this.firstName = seperateName(name)[0];
        this.previousMovies = previousMovies;
    }
}

//writer information
const writerInfo = [
    ["Derek Drymon", 1968, ["Kung Fu Panda", "Monsters vs. Aliens", "Shrek Forever After"], "https://www.imdb.com/name/nm0238757/"],
    ["Tim Hill", 1958, ["Action League Now!!", "Sponge on the Run", "Kenny the Shark"], "https://www.imdb.com/name/nm0384722/"]
];

function tooltipWriter(i){
    var otherWorks = ""
    for(t=0; t<writerInfo[i][2].length; t++){
        otherWorks += "\n -" + writerInfo[i][2][t];
    }
    return writerInfo[i][0] + " is born in " + writerInfo[i][1] + "\nOther works: " + otherWorks;
}

let allWriters = [];

//making the writers classe with info from writerInfo
for(let i = 0; i<writerInfo.length; i++){
    let name = writerInfo[i][0];
    let x = new Writers(name, writerInfo[i][1], writerInfo[i][2], writerInfo[i][3], tooltipWriter(i));
    allWriters.push(x);
}

