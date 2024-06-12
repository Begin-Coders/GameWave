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

        if (nav.style.width == "20vw" || nav.style.width == "") {
            navTitle.style.display = "none";
            nav.style.width = "5vw";
            button.innerHTML = ">";
        } else {
            nav.style.width = "20vw";
            navTitle.style.display = "block";
            button.innerHTML = "<";
        }
    });
});
