export default async function LayoutPage() {
    const response = await fetch("../components/Layout.html");
    const html = await response.text();
    return html;
}