export default async function NavComponent() {
    const response = await fetch("../components/Navbar.html");
    const html = await response.text();
    return html;
}
