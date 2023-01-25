function showMobileMenu() {
    var mobileMenu = document.getElementById("mobile-menu");
    var closeMenu = document.getElementById("closeMenu");
    var openMenu = document.getElementById("openMenu");
    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        closeMenu.classList.remove("hidden");
        openMenu.classList.add("hidden");
    } else {
        mobileMenu.classList.add("hidden");
        closeMenu.classList.add("hidden");
        openMenu.classList.remove("hidden");
    }
}