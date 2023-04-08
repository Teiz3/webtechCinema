//Adds an identifier to the body so we can give a different color to navbar button of the current page
var indexPage = document.getElementsByTagName("body")[0];
var urlId = window.location.pathname;
urlIdCss = urlId.replace('/', '-');
indexPage.setAttribute("id", "page" + urlIdCss);