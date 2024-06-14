import NavComponent from "./NavComponent.js";

console.log("Welcome to GameWave!");

// Default theme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

prefersDarkScheme.addEventListener("change", (e) => {
    document.documentElement.classList.toggle("dark", e.matches);
});

// Navbar Component
NavComponent().then((html) => {
    const navbar = document.getElementById("navbar");
    navbar.innerHTML = html;

    const button = document.getElementById("nav-toggle-button");
    const navTitle = document.getElementById("navbar-title");
    const landingPage = document.getElementById("landing-page-container");
    const bottom = document.getElementsByClassName("bottom")[0];

    // Check if the device is not a laptop or tablet
    const isNotLaptopOrTablet = window.matchMedia("(max-width: 768px)");

    console.log("isNotLaptopOrTablet:", isNotLaptopOrTablet);

    if (isNotLaptopOrTablet.matches) {
        navbar.style.width = "15vw";
        navbar.style.position = "fixed";
        navTitle.style.display = "none";
        bottom.style.visibility = "hidden";
        button.textContent = ">";
        navbar.style.zIndex = "1";
    }

    button.addEventListener("click", () => {
        console.log("Button clicked!");

        const isNavExpanded =
            navbar.style.width == "20vw" ||
            navbar.style.width == "" ||
            navbar.style.width == "80vw";

        navbar.style.width = isNavExpanded
            ? isNotLaptopOrTablet.matches
                ? "15vw"
                : "5vw"
            : isNotLaptopOrTablet.matches
            ? "80vw"
            : "20vw";
        button.textContent = isNavExpanded ? ">" : "<";

        if (isNavExpanded) {
            navTitle.style.display = "none";
            bottom.style.visibility = "hidden";
        } else {
            setTimeout(() => {
                navTitle.style.display = "block";
                bottom.style.visibility = "visible";
            }, 150);
        }
    });

    // Change theme
    const themeToggle = document.getElementById("theme-toggle-button");

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");

        const themeToggleImg = document.getElementById("theme-toggle-img");
        const githubLogo = document.getElementById("github-logo");

        if (document.documentElement.classList.contains("dark")) {
            themeToggleImg.src = "../static/assets/image/moon.svg";
            githubLogo.src = "../static/assets/image/github-white.svg";
        } else {
            themeToggleImg.src = "../static/assets/image/sun.svg";
            githubLogo.src = "../static/assets/image/github-black.svg";
        }
    });
});

// Load Landing Page
async function loadLandingPage() {
    try {
        const response = await fetch("../components/landingpage.html");
        const data = await response.text();
        document.getElementById("landing-page-container").innerHTML = data;
    } catch (error) {
        console.error("Error loading landing page:", error);
    }
}
document.addEventListener("DOMContentLoaded", loadLandingPage);
