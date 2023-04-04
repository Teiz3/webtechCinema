var now = new Date();
var newTxt = document.createTextNode(now.getUTCFullYear());
document.getElementsByClassName("footer__copyright")[0].appendChild(newTxt);
