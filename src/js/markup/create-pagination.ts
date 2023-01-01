import { DEFAULT_AMOUNT_ITEMS } from "../utils/const";

export function createPagination(urlPageNumber: string, urlAmountOfItems: string, amountPages: number) {
    const pages = [...Array(amountPages).keys()].map((e) => ++e) || [];
    const pageNumber = urlPageNumber ? Number(urlPageNumber) : 1;
    const isFirstPage = pageNumber === 1 ? 'disabled' : '';
    return `<section class="pagination">
    <form class="pagination__page-btns">
    <button class="page-btns__label" type="button" value="previous" name="prev-btn" ${isFirstPage}><</button>
    ${pages.map((number) => `
    <input class="page-btns__radio visually-hidden " id="${number}-page-input" name="page-btns" type="radio" value="${number}"/>
    <label for="${number}-page-input" class="page-btns__label ${pageNumber === number ? 'checked' : ''}">${number}</label>`).join('')}    
    <button class="page-btns__label" type="button" value="next" name="next-btn" ${pageNumber === pages[pages.length - 1] ? 'disabled' : ''}>></button>
    <input class="page-btns-number__input" type="number" name="amount-items" value="${urlAmountOfItems || DEFAULT_AMOUNT_ITEMS}"/> 
    </form>
    </section>`
}
