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

    button.addEventListener("click", () => {
        console.log("Button clicked!");

        const isNavExpanded =
            navbar.style.width == "20vw" || navbar.style.width == "";
        navbar.style.width = isNavExpanded ? "5vw" : "20vw";
        navTitle.style.display = isNavExpanded ? "none" : "block";
        bottom.style.display = isNavExpanded ? "none" : "block";
        button.textContent = isNavExpanded ? ">" : "<";

        // Expand landing page
        if (landingPage.length > 0) {
            const isLandingPageExpanded =
                landingPage.style.width === "80vw" ||
                landingPage.style.width == "";
            landingPage.style.width = isLandingPageExpanded ? "100vw" : "80vw";
            landingPage.style.left = isLandingPageExpanded ? "0" : "20vw";
        }
    });

    // Change theme
    const themeToggle = document.getElementById("theme-toggle-button");

    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
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
