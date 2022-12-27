export function createPagination() { 
    return `<section class="pagination">
    <form class="pagination__page-btns page-btns">
    <input class="page-btns__radio visually-hidden" type="radio" name="page-btns" value="previous" id="prev-page"/>
    <label for="prev-page" class="page-btns__label"><</label>
    ${[1, 2, 3, 4, 5].map((number) => `
    <input class="page-btns__radio visually-hidden" id="${number}-page-input" name="page-btns" type="radio" value="${number}"/>
    <label for="${number}-page-input" class="page-btns__label">${number}</label>`).join('')}

    <input class="page-btns-number__input" type="number" name="amount-items" value="1"/> 
    
    <input class="page-btns__radio visually-hidden" id="next-page" type="radio" name="page-btns" value="next"/>
    
    <label for="next-page" class="page-btns__label">></label></form>
    </section>`
}
