function toggleSideMenu() {
  var sideMenu = document.getElementById("side-menu");
  sideMenu.classList.toggle("active");
}

function toggleCartMenu() {
  var cartMenu = document.getElementById("nav__cartMenu");
  cartMenu.classList.toggle("active");
}

window.addEventListener("resize", function hideMenuOnResize() {
  if (window.innerWidth >= 992) {
    document.getElementById("side-menu").classList.remove("active");
  }
});

function increseCount() {
  var count = document.getElementById("product-count");
  count.innerHTML = parseInt(count.innerHTML) + 1;
}

function decreseCount() {
  var count = document.getElementById("product-count");
  if (parseInt(count.innerHTML) > 0) {
    count.innerHTML = parseInt(count.innerHTML) - 1;
  }
}

// Slideshow code
var slideNumber = 1;
showSlides(slideNumber);

function changeSlide(n) {
  showSlides((slideNumber += n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("product__slide");
  if (n > slides.length) {
    slideNumber = 1;
  }
  if (n < 1) {
    slideNumber = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideNumber - 1].style.display = "block";
}

//  Show small images when screen larger than 768px

function slidesApperanceControl() {
  let slides = document.getElementsByClassName("product__slide");
  if (window.innerWidth >= 768) {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "block";
      slides[i].classList.remove("fade");
    }
  } else {
    showSlides(slideNumber);
    for (i = 0; i < slides.length; i++) {
      slides[i].classList.add("fade");
    }
  }
}

window.addEventListener("resize", slidesApperanceControl);
window.addEventListener("load", slidesApperanceControl);

// Tap image gallery
function changeExpandedImg(img) {
  var expandImg = document.getElementById("product-expanded-image");
  console.log(expandImg);
  expandImg.src = img.src;
}
