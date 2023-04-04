//Function to make element nodes
function makeElNode(elementType, parent=document.body, text, className, idName){
    var newNode = document.createElement(elementType);
    if(className){newNode.className = className;}
    if(idName){newNode.setAttribute("id", idName)}
    if(text){
        var newTxt = document.createTextNode(text);
        newNode.appendChild(newTxt);
        }
    parent.appendChild(newNode);
}

function artistInfoLinks(parent, title, artistArray){
    makeElNode("hr", parent);
    //adds a link for each artist
    makeElNode("p", parent, title);
    let maxArtistSize = Math.min(artistArray.length, 6);
    for(let i = 0; i < maxArtistSize; i++){
        //Adds dot between artists
        let artName = artistArray[i].firstName.toLowerCase();
        if(i < maxArtistSize-1){
            makeElNode("a", parent, artistArray[i].name + " ", "spongebob-movie__" + artName + "-link");
            getElClass("spongebob-movie__" + artName + "-link").title=artistArray[i].tooltip;
            let textDot = document.createTextNode(" \267 ");
            parent.appendChild(textDot);
            getElClass("spongebob-movie__" + artName + "-link").href="#" + artName;
        }else{
            makeElNode("a", parent, artistArray[i].name + " ", "spongebob-movie__" + artName + "-link");
            getElClass("spongebob-movie__" + artName + "-link").title=artistArray[i].tooltip;
            getElClass("spongebob-movie__" + artName + "-link").href="#" + artName;
        }   
    }
}

function artistInfoDisplay(artistType, artistArray){

    for(let i = 0; i < artistArray.length; i++){
        let artName = artistArray[i].firstName.toLowerCase();
        makeElNode("section", getElClass(artistType+"__grid"), "", "artists__sectionbox", artName);
        let currentArtistSection = getElId(artName);
        if(artistArray == allActors){
            makeElNode("img", currentArtistSection, "", "actors__image", artName + "image");
            getElId(artName + "image").setAttribute("src", artistArray[i].photoLink);
            getElId(artName + "image").setAttribute("alt", artistArray[i].photoAlt);
        }
        makeElNode("div", currentArtistSection, "", "artists__info", artName + "info-div");
        let currentArtistInfoDiv = getElId(artName + "info-div"); 
        makeElNode("h5", currentArtistInfoDiv, artistArray[i].name);
        makeElNode("p",  currentArtistInfoDiv, artistArray[i].name + " is born in " + artistArray[i].yearOfBirth);
        makeElNode("br", currentArtistInfoDiv);
        makeElNode("b", currentArtistInfoDiv, artistArray[i].firstName + "'s other works:");
        makeElNode("ul", currentArtistInfoDiv, "", artistType + "__" + artName + "-movielist");
        for(let movies = 0; movies < artistArray[i].previousMovies.length; movies++){
            makeElNode("li", getElClass(artistType + "__" + artName + "-movielist"), artistArray[i].previousMovies[movies]);
        }
        makeElNode("br", currentArtistInfoDiv);
        makeElNode("a", currentArtistInfoDiv, "Visit IMDb Page >", "artists__imdb", artName + "imdb");
        getElId(artName + "imdb").setAttribute("href", artistArray[i].link);
        getElId(artName + "imdb").setAttribute("target", "_blank");
    }
}

//returns first element with the classname provided
function getElClass(name){
    return(document.getElementsByClassName(name)[0]);
}

//returns element with the id name provided
function getElId(name){
    return(document.getElementById(name));
}

//returns element with the id name provided
function getElTag(name){
    return(document.getElementsByTagName(name)[0]);
}

//seperates a full name into an array with firstname, lastname(including middle names)
function seperateName(name){
    let names = name.split(" ");
    let firstName = names[0];
    let lastName = "";
    for(let i = 1; i<names.length; i++){
        lastName = lastName + names[i] + " ";
    }
    names = [firstName, lastName]
    return(names);
}

function tryGetName(element){
    if(element.id){
        return element.id;
    }
    if(element.className){
        return element.className;
    }
    return "";
}