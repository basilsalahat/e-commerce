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
  var addToCartButton = document.getElementById("add-to-cart");
  count.innerHTML = parseInt(count.innerHTML) + 1;
  addToCartButton.classList.remove("disabled");
}

function decreseCount() {
  var count = document.getElementById("product-count");
  console.log(count.innerHTML);
  if (parseInt(count.innerHTML) > 0) {
    count.innerHTML = parseInt(count.innerHTML) - 1;
    if (parseInt(count.innerHTML) == 0) {
      var addToCartButton = document.getElementById("add-to-cart");
      addToCartButton.classList.add("disabled");
    }
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

// Fill items if exists in cart items section when load the page

var items = [];
var itemsConverted = JSON.stringify(items);
localStorage.setItem("cart-items", itemsConverted);
window.addEventListener("load", fillCartItems());

function fillCartItems() {
  var itemsFromStorage = JSON.parse(localStorage.getItem("cart-items"));
  if (itemsFromStorage != null) {
    for (var i = 0; i < itemsFromStorage.length; i++) {
      console.log(itemsFromStorage);
    }
  }
}

function addCurrentItemToCart() {
  var cartItemsCountainer = document.getElementsByClassName("nav__items");
  var checkOutButton = document.getElementsByClassName("nav__checkOutButton");
  cartItemsCountainer[0].classList.remove("empty");
  checkOutButton[0].classList.remove("disabled");

  //  get the prooduct data
  var productID = document.getElementById("product-id").innerHTML;
  var productName = document.getElementById("product-name").innerHTML;
  var productPrice = document.getElementById("product-price").innerHTML;
  var productOridinalPrice = document.getElementById(
    "product-original-price"
  ).innerHTML;
  var productCount = document.getElementById("product-count").innerHTML;
  var productImage = document
    .getElementById("product-expanded-image")
    .getAttribute("src");
  var itemsContainer = document.getElementById("nav-items");
  const newItem = document.createElement("div");
  newItem.classList.add("nav__item");
  newItem.innerHTML =
    "<img src=" +
    productImage +
    ' alt="image-product" class="nav__cartItemPhoto" /> <div class="nav__cartItemDetails"> <p class="name">' +
    productName +
    ' <p class="color">' +
    productOridinalPrice +
    '</p> </p><p class="price">' +
    productPrice +
    '</p> </div> <div class="nav__cartItemNumberOfOrders"> <button class="nav__deleteItemFromCart"> <img src="imgs/icon-delete.svg" alt="icon-delete" /> </button> <div class="nav__cartItemCounter"> <img src="imgs/icon-minus.svg" alt="icon-minus" /> <p class="nav__numOfItem">' +
    productCount +
    '</p> <img src="imgs/icon-plus.svg" alt="icon-plus" /> </div> </div>';
  itemsContainer.appendChild(newItem);
  items.push([
    productID,
    productName.trim(),
    productPrice,
    productOridinalPrice.trim(),
    productCount,
    productImage,
  ]);
  var itemsConverted = JSON.stringify(items);
  localStorage.setItem("cart-items", itemsConverted);
}
