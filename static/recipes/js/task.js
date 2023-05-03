var daily_part = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
var weekdays_part = ["mon", "tue", "wed", "thu", "fri"];
var weekends_part = ["sat", "sun"];
var repeats = ["weekly", "monthly"];
var days_repeats = new Map();
days_repeats.set('weekdays', weekdays_part).set('weekends', weekends_part).set('daily', daily_part);

$('input[name=repeat-group]').click(function() {
    if (this.previous) {
        this.checked = false;
    }
    this.previous = this.checked;
});

function removeAll() {
  for (var i=0; i < daily_part.length; i++) {
    document.getElementById(daily_part[i]).checked = false;
  }
}

function setDays(part) {
  for (var i=0; i < part.length; i++) {
    document.getElementById(part[i]).checked = true;
  }
}

function changePartRepeat(part) {
  removeAll();
  setDays(part);
}

function changePartListener(repeater, part) {
  document.getElementById(repeater).addEventListener('click', () => {
    changePartRepeat(part);
  })
}

for (var [key, value] of days_repeats) {
  changePartListener(key, value);
}

for (var i=0; i < daily_part.length; i++) {
  document.getElementById(daily_part[i]).addEventListener('change', () => {
    daily.checked = false;
    weekdays.checked = false;
    weekends.checked = false;
  });
}

repeatBtn.addEventListener('click', () => {
  repeatSection.classList.toggle("d-none");
});


// let iconColors = document.getElementsByClassName('color-showout');
// let iconList = document.getElementsByClassName('icon-showout');
//
// var iconSetCurry = function(dropdown) {
//   return function(icon) {
//     iconPickDropdown.innerHTML = "<i class='fas " + icon + "' id='dropdownIcon'></i>";
//   }
// }
//
// var colorSetCurry = function(dropdownBtn) {
//   return function(color) {
//     dropdownBtn.style.color = color;
//   }
// }
//
// var colorSet = colorSetCurry(colorPickDropdown);
// var iconSet = iconSetCurry(dropdownIcon);
//
// for (let i=0; i < iconColors.length; i++) {
//   $('.color-showout').eq(i).on('click', {icColor : iconColors[i].dataset.iconColor}, function(event) {
//     event.preventDefault();
//     colorSet(event.data.icColor);
//   });
// }
//
// for (let i=0; i < iconList.length; i++) {
//   $('.icon-showout').eq(i).on('click', {icType : iconList[i].dataset.iconType}, function(event) {
//     event.preventDefault();
//     iconSet(event.data.icType);
//   });
// }

$('select').each(function() {

});
