function showSideMenu(){
    var sideMenu = document.getElementById("nav__sideMenu");
    sideMenu.classList.add("active");
}
function hideSideMenu(){
    var sideMenu = document.getElementById("nav__sideMenu");
    sideMenu.classList.remove("active");
}

function showCartMenu(){
    var cartMenu = document.getElementById("nav__cartMenu");
    cartMenu.classList.add("active");
}
function hideCartMenu(){
    var cartMenu = document.getElementById("nav__cartMenu");
    cartMenu.classList.remove("active");
}

window.addEventListener("resize", (
    function hideMenuOnResize(){
        if (window.innerWidth >= 992){
            hideSideMenu();
        }
    }
));

function showCartItems(){
    var cartItems = document.getElementById("nav__cartItems");
    cartItems.classList.remove("active");
}
