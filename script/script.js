function sideMenu() {
  var sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("active");
}

function cartMenu() {
  var cartMenu = document.getElementById("nav__cartMenu");
  cartMenu.classList.toggle("active");
}

window.addEventListener("resize", function hideMenuOnResize() {
  if (window.innerWidth >= 992) {
    document.getElementById("side-menu").classList.remove("active");
  }
});
