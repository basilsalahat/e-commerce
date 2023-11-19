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
  addToCartButton.addEventListener("click", addCurrentItemToCart);
  addToCartButton.classList.remove("disabled");
}

function decreseCount() {
  var count = document.getElementById("product-count");
  var addToCartButton = document.getElementById("add-to-cart");
  if (parseInt(count.innerHTML) > 0) {
    count.innerHTML = parseInt(count.innerHTML) - 1;
  }
  if (parseInt(count.innerHTML) == 0) {
    addToCartButton.classList.add("disabled");
    addToCartButton.removeEventListener("click", addCurrentItemToCart);
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
  expandImg.src = img.src;
}

// ---------------------------  Cart items section  --------------------------- //
var items = [];

window.addEventListener("load", retriveItemsFromLS());

function retriveItemsFromLS() {
  var itemsFromStorage = JSON.parse(localStorage.getItem("cart-items"));
  var cartItemsCountainer = document.querySelector(".nav__items");

  if (itemsFromStorage != null) {
    cartItemsCountainer.classList.remove("empty");
    itemsFromStorage.forEach((element) => {
      items.push(element);
    });
    fillItems();
  } else {
    cartItemsCountainer.classList.add("empty");
  }
}

function fillItems() {
  var oldItems = document.querySelectorAll(".nav__item");
  var cartItemsCountainer = document.querySelector(".nav__items");
  var checkOutButton = document.querySelector(".nav__checkOutButton");
  for (var i = 0; i < oldItems.length; i++) {
    oldItems[i].remove();
  }
  if (items.length > 0) {
    checkOutButton.classList.remove("disabled");
    items.forEach((element) => {
      createNewItem(element);
    });
  } else {
    checkOutButton.classList.add("disabled");
    cartItemsCountainer.classList.add("empty");
  }
}

function addCurrentItemToCart() {
  var cartItemsCountainer = document.querySelector(".nav__items");
  cartItemsCountainer.classList.remove("empty");
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

  if (items.find((element) => element.productID == productID)) {
    alert("Product Already added in Cart");
    return;
  } else {
    items.push({
      productID: productID,
      productName: productName.trim(),
      productPrice: productPrice,
      productOridinalPrice: productOridinalPrice.trim(),
      productCount: productCount,
      productImage: productImage,
    });
    var itemsConverted = JSON.stringify(items);
    localStorage.setItem("cart-items", itemsConverted);
    fillItems();
  }
}

function createNewItem(itemDetails) {
  var itemsContainer = document.getElementById("nav-items");
  const newItem = document.createElement("div");
  newItem.classList.add("nav__item");
  newItem.innerHTML =
    "<img src=" +
    itemDetails.productImage +
    ' alt="image-product" class="nav__cartItemPhoto" /> <div class="nav__cartItemDetails"> <p class="name">' +
    itemDetails.productName +
    ' <p class="originalPrice">' +
    itemDetails.productOridinalPrice +
    '</p><p class="price">' +
    itemDetails.productPrice +
    '</p> <p class="id" style = "display:none">' +
    itemDetails.productID +
    '</p> </div> <div class="nav__cartItemNumberOfOrders"> <button class="nav__deleteItemFromCart"> <img src="imgs/icon-delete.svg" alt="icon-delete" class="delete-from-cart" onclick = "deleteFromCart(this) "/> </button> <div class="nav__cartItemCounter"> <img src="imgs/icon-minus.svg" alt="icon-minus" onclick = "changeCartCount(this,-1)" /> <p class="nav__numOfItem">' +
    itemDetails.productCount +
    '</p> <img src="imgs/icon-plus.svg" alt="icon-plus" onclick = "changeCartCount(this,+1)" /> </div> </div>';
  itemsContainer.appendChild(newItem);
}

function changeCartCount(item, action) {
  var parent = item.parentNode.parentNode.parentNode;
  var productId = parent.querySelector("p.id").innerHTML;

  if (action == +1) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].productID == productId) {
        items[i].productCount = parseInt(items[i].productCount) + 1;
      }
    }
  } else {
    for (var i = 0; i < items.length; i++) {
      if (items[i].productID == productId) {
        if (items[i].productCount > 1) {
          items[i].productCount = parseInt(items[i].productCount) - 1;
        } else {
          items[i].productCount = 1;
        }
      }
    }
  }
  localStorage.setItem("cart-items", JSON.stringify(items));
  fillItems();
}

function deleteFromCart(item) {
  var parent = item.parentNode.parentNode.parentNode;
  var productId = parent.querySelector("p.id").innerHTML;

  if (confirm("Are you sure you want to delete this product?")) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].productID == productId) {
        items.splice(i, 1);
      }
    }
    localStorage.setItem("cart-items", JSON.stringify(items));
    fillItems();
  }
}
