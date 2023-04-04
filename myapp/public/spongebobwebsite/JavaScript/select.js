//select elements container:
// makeElNode("section", getElTag("footer"), "", "change-elements");
var elContainer = document.createElement("div");
elContainer.className = "change-elements";
getElTag("footer").insertBefore(elContainer, getElClass("footer__ul"))
//the three different selects: element, option and value
makeElNode("select", getElClass("change-elements"), "", "select-element");
makeElNode("select", getElClass("change-elements"), "", "select-option");
makeElNode("select", getElClass("change-elements"), "", "select-value");
const parentElement = getElClass("select-element");
const parentOption = getElClass("select-option");
const parentValue = getElClass("select-value");

//button to activate change
makeElNode("button", getElClass("change-elements"), "Change element", "change-button");

//all selectables, options and values
const selectableElements = ["body", "header", "footer", "aside", "article", "section"];
const changeableOptions = ["color", "font-size", "background-color"];
const changeableValues = [
    ["red", "green", "blue", "black", "yellow", "white",""],
    ["16px", "24px","32px", "48px",""],
    ["red", "green", "blue", "black", "yellow", "white",""]
];

//array with all (selectabele) elements on the page
let allElements = [];

//populate allElements
for(let i = 0; i < selectableElements.length; i++){
    let elementType = selectableElements[i];
    let x = Array.from(document.getElementsByTagName(elementType));
    allElements = allElements.concat(x);
}


//generate option elements of select element
let elementType;
let elementTypeIndex = 1;
for(let i = 0; i < allElements.length; i++){
    if(elementType != allElements[i].tagName.toLowerCase()){elementTypeIndex = 1;} //compare elementtype from last loop itteration to its new value
    elementType = allElements[i].tagName.toLowerCase();
    makeElNode("option", parentElement, elementType + " " + elementTypeIndex + "-" + tryGetName(allElements[i]));
    elementTypeIndex++;
}

//generate option elements of option select
for(let i = 0; i < changeableOptions.length; i++){
    makeElNode("option", parentOption, changeableOptions[i], changeableOptions[i]);
    getElClass(changeableOptions[i]).setAttribute("value", changeableOptions[i]);
}

//generate option elements of value select
changeValueOptions(); //call function once on loading the page
function changeValueOptions(){
    while(parentValue.hasChildNodes()){
        parentValue.removeChild(parentValue.firstChild);
    }
    let selectedOptionIndex = parentOption.selectedIndex;
    for(let i = 0; i < changeableValues[selectedOptionIndex].length; i++){
        let valueName = changeableValues[selectedOptionIndex][i]; //name shown in the select on page
        if(valueName == ""){valueName = "default";}
        makeElNode("option", parentValue, valueName);
    }
}

//change the selected element with the selected parameters
function changeElement(){
    let selectedOptionIndex = parentOption.selectedIndex;
    let selectedOption = changeableOptions[selectedOptionIndex];
    let selectedValue = changeableValues[selectedOptionIndex][parentValue.selectedIndex];
    allElements[parentElement.selectedIndex].style[selectedOption] = selectedValue;
    changeAllStupidChildren(allElements[parentElement.selectedIndex], selectedOption, selectedValue);
}

function highlightElement(){
    allElements[parentElement.selectedIndex].style.outline = "solid";
    allElements[parentElement.selectedIndex].style.outlineColor = "red";
    setTimeout(removeHighlight, 500);
}

function removeHighlight(){
    allElements[parentElement.selectedIndex].style.outline = "none";
}

//add eventlisteners
parentElement.addEventListener("change", highlightElement, false);
parentOption.addEventListener("change", changeValueOptions, false);
getElClass("change-button").addEventListener("click", changeElement, false);

function changeAllStupidChildren(element, thingToChange, value){
    let allTheChildren = element.getElementsByTagName("*");
    for(let i = 0; i < allTheChildren.length; i++){
        allTheChildren[i].style[thingToChange] = value;
    }
}