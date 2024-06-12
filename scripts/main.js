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
