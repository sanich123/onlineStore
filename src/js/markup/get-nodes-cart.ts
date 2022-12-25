export function getNodesCart() {
    const productsList = document.querySelector('.cart__products-list') as HTMLUListElement;
    return {
        productsList
    }
}