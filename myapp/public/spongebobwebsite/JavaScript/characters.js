//create all variables for the audio files
var spongebob = new Audio("SFX/spongebob.mp3");
var patrick = new Audio("SFX/patrick.mp3");
var krabs = new Audio("SFX/krabs.mp3");
var plankton = new Audio("SFX/plankton.mp3");
var neptune = new Audio("SFX/neptune.mp3");
var mindy = new Audio("SFX/mindy.mp3");
const charNames = ["spongebob", "patrick", "krabs", "plankton", "neptune", "mindy"];
const charVars = [spongebob, patrick, krabs, plankton, neptune, mindy];
const charSections = document.getElementsByClassName("characters__character-section");
var charImages = [];

for(let t = 0; t < charNames.length; t++){
    charImages.push(document.getElementById(charNames[t]).firstChild.nextSibling);
};

//click events for cast page
function playAudio(characterName){
    //Prevents spamming every characters and all the audio files playing at once.
    for(let t=0; t < charVars.length; t++){
        charVars[t].pause();
        charVars[t].currentTime = 0;
    }
    for(t=0; t < charNames.length; t++){
        switch(characterName){
            case charNames[t]:  charVars[t].play();
                                break;
        }
    }
}

//load event for characters page
function highlightCharacter(){
    characterName = localStorage.getItem("character");
    for(t=0; t < charNames.length; t++){
        switch(characterName){
            case charNames[t]:  charSections[t].style.backgroundColor = "rgb(48, 104, 110)";
                                charSections[t].style.boxShadow = "7px 7px 7px";
                                charSections[t].style.borderRadius = "7px";    
                                break;
        }
    }
    localStorage.removeItem("character");
}

function fadeInImg(charName){
    for(t=0; t<charNames.length;t++){
    switch(charName){
        case charNames[t]:  charImages[t].style.cursor = "pointer";
                            charImages[t].style.backgroundColor = "rgb(42, 68, 71)";
                            charImages[t].style.borderRadius = "50%";
                            charImages[t].style.transition = "0.6s";
                            break;
    }   
}
}

function fadeOutImg(charName){
    for(t=0; t<charNames.length;t++){
    switch(charName){
        case charNames[t]:  charImages[t].style.backgroundColor = "";
                            charImages[t].style.borderRadius = "";
                            charImages[t].style.transition = "0.6s";
                            break;
    }   
}
}

function activeImg(charName){
    for(t=0; t<charNames.length;t++){
    switch(charName){
        case charNames[t]:  charImages[t].style.backgroundColor = "black";
                            break;
    }   
}
}

function deactiveImg(charName){
    for(t=0; t<charNames.length;t++){
    switch(charName){
        case charNames[t]:  charImages[t].style.backgroundColor = "rgb(42, 68, 71)";
                            break;
    }   
}
}

function registerEvents(){
    for(let t = 0; t < charNames.length; t++){
        charImages[t].addEventListener("click", function(){playAudio(charNames[t])}, false);
        charImages[t].addEventListener("mouseenter", function(){fadeInImg(charNames[t])}, true);
        charImages[t].addEventListener("mouseleave", function(){fadeOutImg(charNames[t])}, true);
        charImages[t].addEventListener("mousedown", function(){activeImg(charNames[t])}, true);
        charImages[t].addEventListener("mouseup", function(){deactiveImg(charNames[t])}, true);
        highlightCharacter();
    };
}
window.addEventListener("load", registerEvents, false);



