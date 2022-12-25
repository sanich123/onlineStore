export function getNodesCart() {
    const productsList = document.querySelector('.cart__products-list') as HTMLUListElement;
    const couponInput = document.querySelector('.coupon-form__input') as HTMLInputElement;
    const couponsList = document.querySelector('.coupon-form__list') as HTMLUListElement;

    return {
        productsList, couponInput, couponsList,
    }
}