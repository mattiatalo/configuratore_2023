var menuOuter = document.querySelector(".table-container");
var title = document.querySelector(".titolo-tabella");

/* menuOuter.addEventListener('click', function() {
  menuOuter.classList.toggle('open-table');

}); */
document.addEventListener("click", function (event) {
  var isClickInside = title.contains(event.target);
  console.log(isClickInside);
  if (isClickInside && menuOuter.classList.contains("open-table")) {
    menuOuter.classList.remove("open-table");
  } else if (isClickInside && !menuOuter.classList.contains("open-table")) {
    menuOuter.classList.add("open-table");
  } else if (!isClickInside && menuOuter.classList.contains("open-table")) {
    menuOuter.classList.add("open-table");
  }
});
