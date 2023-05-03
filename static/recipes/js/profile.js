function displayNone(forms) {
  for (var i=0; i < forms.length; i++) {
    if (forms[i].firstChild !== null) {
      forms[i].style.display = 'none';
    }
  }
}

function switchBetween(links, forms) {
  for (var i = 0; i < links.length; i++) {
    if (links[i].firstChild !== null) {
      links[i].addEventListener('click', function(e) {
        displayNone(forms);
        document.getElementById(e.target.getAttribute("data-container")).style.display = "block";
        for (var j = 0; j < links.length; j++) {
          if (links[j].firstChild !== null) {
              links[j].className = "nav-item profile-item";
          }
        }
        e.target.className = "nav-item profile-item profile-item__active";
      });
    }
  }
}

var section = document.getElementById("sections").childNodes;
var link = document.getElementById("switchBox").childNodes;

switchBetween(link, section);

var coll = document.getElementsByClassName("collapsible");
var chboxes = document.getElementsByClassName("checkbox-task");
var i;

function heightMarginJustify(target, heightCoeff, marginCoeff) {
  target.style.height = content.scrollHeight * heightCoeff + "px";
  target.style.marginTop = content.scrollHeight * marginCoeff + "px";
}

function heightMarginNull(target) {
  target.style.height = null;
  target.style.marginTop = null;
}

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle('active-collapse');
    var content = this.previousElementSibling;
    var taskText = content.parentNode;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
    if (taskText.style.height) {
      heightMarginNull(taskText);
    } else {
      if (window.matchMedia("(max-width: 575px)").matches) {
        heightMarginJustify(taskText, 2.6, 0.3);
      }
      else if (window.matchMedia("(max-width: 426px)").matches) {
        heightMarginJustify(taskText, 3.3, 0.3);
      }
      else {
        heightMarginJustify(taskText, 2.2, 0.3);
      }
    }

  });
}

for (i = 0; i < chboxes.length; i++) {
  chboxes[i].addEventListener('click', function() {
    this.dataset.checkedCheckbox *= -1;
  });
}

$('.open-popup').magnificPopup({
  removalDelay: 500, //delay removal by X to allow out-animation
  callbacks: {
    beforeOpen: function() {
       this.st.mainClass = this.st.el.attr('data-effect');
    }
  },
});

$(".dropdown-trigger").click(function() {
  $(this).toggleClass("dropdown-on");
  $(".dropdown-hidden").toggleClass('d-none');
  return false;
});
