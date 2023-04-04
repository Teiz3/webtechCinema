//function to make element nodes
function makeElNode(elementType, parent=document.body, text, className, idName, attributes){
    var newNode = document.createElement(elementType);
    if(className){newNode.className = className;}
    if(idName){newNode.setAttribute("id", idName)}
    if(text){
        var newTxt = document.createTextNode(text);
        newNode.appendChild(newTxt);
    }
    if(attributes){
        for(var attribute in attributes){
            newNode.setAttribute(attribute, attributes[attribute]);
        }
    }
    parent.appendChild(newNode);
}

//returns first element with the classname provided
function getElClass(name){
    return(document.getElementsByClassName(name)[0]);
}

//returns element with the id name provided
function getElId(name){
    return(document.getElementById(name));
}

//returns element with the tag name provided
function getElTag(name){
    return(document.getElementsByTagName(name)[0]);
}