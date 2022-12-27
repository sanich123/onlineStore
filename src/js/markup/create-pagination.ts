export function createPagination() {
    return `<section class="pagination">
    <button class="pagination__previous" type="button"><</button>
    <form class="pagination__page-btns page-btns">
    ${[1, 2, 3, 4, 5].map((number) => `<label class="page-btns__label">${number}
    <input class="page-btns__label" name="page-btns" type="radio" value="${number}"/>
    </label>`).join('')}</form>
    <button class="pagination__next" type="button">></button>
    </section>`
}