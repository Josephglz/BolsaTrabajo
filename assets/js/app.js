function showMobileMenu() {
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
    } else {
        mobileMenu.classList.add("hidden");
    }
}