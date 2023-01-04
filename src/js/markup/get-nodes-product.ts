export function getNodesProduct() {
    const modal = document.querySelector(".modal") as HTMLDivElement;
    const addToCartAndGoBuy = document.querySelector(".modal_func") as HTMLButtonElement;
    const closeButton = document.querySelector(".close-button") as HTMLButtonElement;
    const smallPictures = document.getElementById('navigation') as HTMLUListElement;
    const bigPicture = document.querySelector('.big-picture') as HTMLImageElement;
    const cartBtn = document.querySelector('.btn_product') as HTMLButtonElement;
    const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
    const imgPaySystem = document.querySelector('.card__img') as HTMLImageElement;
    const expirationDate = document.getElementById('expiration-date') as HTMLInputElement;
    return {
        modal, addToCartAndGoBuy, closeButton, smallPictures, bigPicture, cartBtn, cardNumberInput, imgPaySystem, expirationDate,
    }
}