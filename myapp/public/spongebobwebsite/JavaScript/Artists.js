//the class where all data of artists is stored
class Artist{
    constructor(name, yearOfBirth, link, tooltip){
        this.name = name;
        this.firstName = seperateName(name)[0];
        this.yearOfBirth = yearOfBirth;
        this.link = link;
        this.tooltip = tooltip;
    }
}

//defining the artists
const artistInfo = [
];

//list of all Artist class objects
let allArtists = [];

//adding the artistInfo to the artist class
for(let i = 0; i<artistInfo.length; i++){
    let name = artistInfo[i][0];
    let x = new Artist(name, artistInfo[i][1]);
    allArtists.push(x);
}