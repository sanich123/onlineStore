export function Create404Page() {
    const body = document.querySelector(".page");
    if (body) {
        body.innerHTML = `<p>Мы не смогли найти такую страницу<p>`;
    }
    console.log("Я страница 404");
}