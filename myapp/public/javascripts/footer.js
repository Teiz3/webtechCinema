//little script to set the copyright in the footer to the current year
var now = new Date();
var newTxt = document.createTextNode(now.getUTCFullYear());
document.getElementsByClassName("footer__copyright")[0].appendChild(newTxt);