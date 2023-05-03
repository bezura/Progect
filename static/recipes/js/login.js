function switchBetween(links, forms) {
  for (var i = 0; i < links.length; i++) {
    if (links[i].firstChild !== null) {
      links[i].addEventListener('click', function(e) {
        for (var i=0; i < forms.length; i++) {
          if (forms[i].firstChild !== null) {
            forms[i].style.display = 'none';
          }
        }
        document.getElementById(e.target.getAttribute("data-container")).style.display = "block";
        for (var j = 0; j < links.length; j++) {
            if (links[j].firstChild !== null) {
                links[j].className = "";
            }
        }
        e.target.className = "active";
      });
    }
  }
}

var forms = document.getElementById("forms").childNodes;
var link = document.getElementById("formLinks").childNodes;

switchBetween(link, forms);
