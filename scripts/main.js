import NavComponent from "./components/NavComponent.js";
import loadLandingPage from "./components/LandingPage.js";
import GameCardComponent from "./components/GameCard.js";
import PopupComponent from "./components/popup.js";
import { games } from "./data.js";

console.log("Welcome to GameWave!");

function setUpNavbar() {
    const button = document.getElementById("nav-toggle-button");
    const navTitle = document.getElementById("navbar-title");
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
            if (!isNotLaptopOrTablet.matches) {
                document.getElementById("landing-container").style.width =
                    "95vw";
            }
        } else {
            setTimeout(() => {
                navTitle.style.display = "block";
                bottom.style.visibility = "visible";
            }, 150);

            if (!isNotLaptopOrTablet.matches) {
                document.getElementById("landing-container").style.width =
                    "80vw";
            }
        }
    });
}

function setUpThemeToggle() {
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
}

function SetUpGameCards() {
    const landingContainer = document.getElementById("landing-container");

    // Creating Game Section
    for (let category in games) {
        const gameSectionWrapper = document.createElement("div");
        gameSectionWrapper.classList.add("game-section-wrapper");
        gameSectionWrapper.className = "game-section-wrapper";

        const gameSection = document.createElement("section");
        gameSection.classList.add("game-section");
        gameSection.id = category;

        const gameSectionTitle = document.createElement("h2");
        gameSectionTitle.innerHTML = category;

        gameSectionWrapper.appendChild(gameSectionTitle);
        gameSectionWrapper.appendChild(gameSection);

        const gameCardsContainer = document.createElement("div");
        gameCardsContainer.classList.add("game-cards-container");
        gameSection.appendChild(gameCardsContainer);

        // Creating Game Cards
        games[category].forEach((game) => {
            GameCardComponent().then((html) => {
                const gameCard = document.createElement("div");
                gameCard.classList.add("game-card");
                gameCard.innerHTML = html;
                gameCard.id = "game_" + game.id;

                gameCard.dataset.details = JSON.stringify(game);

                const gameImg = gameCard.getElementsByClassName("card-img")[0];
                gameImg.src = game.src;

                gameCard.style.cursor = "pointer";

                gameCardsContainer.appendChild(gameCard);
            });
        });

        landingContainer.appendChild(gameSectionWrapper);
    }
}

function setUpGameCardsPopup(popupContainer, popup) {
    const body = document.body;
    const gameCards = document.getElementsByClassName("game-card");
    for (let gameCard of gameCards) {
        gameCard.addEventListener("click", () => {
            body.classList.add("no-scroll");
            popupContainer.style.visibility = "visible";
            popupContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            popup.style.display = "block";
            popup.style.filter = "none";

            // Setting game details in popup
            const gameDetails = JSON.parse(gameCard.dataset.details);

            document.getElementById("popup-game-title").innerHTML =
                gameDetails.name;
            document.getElementById("popup-game-img").src = gameDetails.src;

            const popupSelect = document.getElementById("pop-up-pc");
            popupSelect.innerHTML = "";
            for (let i = 1; i <= gameDetails.total_players; i++) {
                let option = document.createElement("option");
                option.value = i;
                option.text = i;
                popupSelect.appendChild(option);
            }
        });
    }

    popupContainer.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.visibility = "hidden";
            popupContainer.style.filter = "none";
            popup.style.display = "none";
            body.classList.remove("no-scroll");
        }
    });
}

function initializeApp() {
    // Rendering Navbar
    NavComponent()
        .then((html) => {
            const navbar = document.getElementById("navbar");
            navbar.innerHTML = html;

            setUpNavbar();
            setUpThemeToggle();
        })
        .then(() => {
            // Rendering Landing Page
            return loadLandingPage().then((html) => {
                const landingPageContainer = document.getElementById(
                    "landing-page-container"
                );
                landingPageContainer.innerHTML = html;

                return SetUpGameCards();
            });
        })
        .then(() => {
            // Rendering Popup
            return PopupComponent().then((html) => {
                const popup = document.getElementById("popup");
                popup.innerHTML = html;
                popup.style.display = "none";

                const popupContainer =
                    document.getElementById("popup-container");
                popupContainer.style.visibility = "hidden";

                setUpGameCardsPopup(popupContainer, popup);
            });
        });
}

function setUpTheme() {
    // Default theme
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    prefersDarkScheme.addEventListener("change", (e) => {
        document.documentElement.classList.toggle("dark", e.matches);
    });
}

function main() {
    setUpTheme();
    initializeApp();
}

main();
