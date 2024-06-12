import NavComponent from "./NavComponent.js";

console.log("Welcome to GameWave!");

// Default theme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

prefersDarkScheme.addEventListener("change", (e) => {
    const root = document.documentElement;

    if (e.matches) {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
});

// Navbar Component
NavComponent().then((html) => {
    document.getElementById("navbar").innerHTML = html;

    const button = document.getElementById("nav-toggle-button");

    button.addEventListener("click", () => {
        console.log("Button clicked!");

        const nav = document.getElementById("navbar");
        const navTitle = document.getElementById("navbar-title");
        const landingPage = document.getElementById("landing-page-container");

        if (nav.style.width == "20vw" || nav.style.width == "") {
            navTitle.style.display = "none";
            nav.style.width = "5vw";
            button.innerHTML = ">";
            landingPage.addclassName("dark");
            //-----Landing Page resizing-----
            if (landingPage.length > 0) {
                    const landingPage = elements[0];
                    if (landingPage.style.width === '80vw' || landingPage.style.width == '') {
                        landingPage.style.width = '100vw';
                        landingPage.style.left = '0';
                    } else {
                        landingPage.style.width = '80vw';
                        landingPage.style.left = '20vw';
                    }
            }
            //-----Landing Page resizing-----
        } else {
            nav.style.width = "20vw";
            navTitle.style.display = "block";
            button.innerHTML = "<";
        }
    });
});

// -- Landing page component --

function loadLandingPage() {
    fetch('../components/landingpage.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('landing-page-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading landing page:', error));
}
document.addEventListener('DOMContentLoaded', loadLandingPage);