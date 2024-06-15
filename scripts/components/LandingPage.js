export default async function loadLandingPage() {
    const response = await fetch("../components/landingpage.html");
    const html = await response.text();
    return html;
}
