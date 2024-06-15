export default async function GameCardComponent() {
    const response = await fetch("../components/GameCard.html");
    const html = await response.text();
    return html;
}
