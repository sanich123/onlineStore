export function getNodesProduct() {
    const modal = document.querySelector(".modal") as HTMLDivElement;
    const trigger = document.querySelector(".modal_func") as HTMLButtonElement;
    const closeButton = document.querySelector(".close-button") as HTMLButtonElement;
    const smallPictures = document.getElementById('navigation') as HTMLUListElement;
    const bigPicture = document.querySelector('.big-picture') as HTMLImageElement;
    const cartBtn = document.querySelector('.btn_product');
    return {
        modal, trigger, closeButton, smallPictures, bigPicture, cartBtn
    }
}