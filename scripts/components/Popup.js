export default async function PopupComponent() {
    const response = await fetch("../components/Popup.html");
    const html = await response.text();
    return html;
}
