export function getNodesCart() {
    const productsList = document.querySelector('.cart__products-list') as HTMLUListElement;
    const couponInput = document.querySelector('.coupon-form__input') as HTMLInputElement;
    const couponsList = document.querySelector('.coupon-form__list') as HTMLUListElement;
    const totalSumHeader = document.querySelector('.total__summary') as HTMLDivElement;
    const paginationForm = document.querySelector('.pagination__page-btns') as HTMLFormElement;

    return {
        productsList, couponInput, couponsList, totalSumHeader, paginationForm,
    }
}