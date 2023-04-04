const castSections = document.getElementsByClassName("actors__information");
const imdbLinks = ["https://www.imdb.com/name/nm0444786/", "https://www.imdb.com/name/nm0265067/", "https://m.imdb.com/name/nm0424060/?ref_=m_ttfcd_cl10",
                    "https://www.imdb.com/name/nm0000317/", "https://m.imdb.com/name/nm0492951/?ref_=m_ttfcd_cl5", "https://m.imdb.com/name/nm0001787/?ref_=nv_sr_srsg_0"];
const charNames = ["spongebob", "patrick", "krabs", "plankton", "neptune", "mindy"];

function changeColor(castSection){ 
    for(t=0; t<castSections.length;t++){
        switch(castSection){
            case castSections[t]:   castSections[t].style.color = "yellow";
                                    castSections[t].style.transition = "0.6s";
                                    break;
        }   
    }
}

function changeColorBack(){
    for(let t=0; t < castSections.length; t++){
        castSections[t].style.color = "";
    };
}

function visitImdb(castSection){ 
    //1ms delay so when you click the character link it does not open the imdb page as well.
    // setTimeout(() => { 
        for(t=0; t<castSections.length; t++){
            switch(castSection){
                case castSections[t]: window.open(imdbLinks[t]);
            }
        }
    // }, 1)     
}

function saveKey(characterName){
    localStorage.setItem("character", characterName);
}

function registerEvents(){
    for(let t=0; t<castSections.length; t++){
        castSections[t].addEventListener("mouseenter", function(){changeColor(castSections[t])}, true);
        castSections[t].addEventListener("mouseleave", changeColorBack, true);
        castSections[t].addEventListener("click", function(e){
            if (!e.target.id) visitImdb(castSections[t])}, false);
    };
    for(let t = 0; t < charNames.length; t++){
        document.getElementById("actors__" + charNames[t]).addEventListener("click", function(){saveKey(charNames[t])}, true);
    }; 
}

window.addEventListener("load", registerEvents, false);












