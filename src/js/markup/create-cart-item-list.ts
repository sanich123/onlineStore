export function createCartItemsList() {
    return `<ul class="cart__products-list cart-products-list">
            <li class="cart-products-list__item cart-item">
              <p class="cart-item__title">Iphone 9</p>
              <img
                class="cart-item__img"
                src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                alt="some_img"
              />
              <p class="cart-item__description">
                An apple mobile which is nothing like apple
              </p>
              <span class="cart-item__stock">In stock: 94</span>
              <span class="cart-item__price">Price: $549.99</span>
              <div class="cart-item__btns">
                <button class="cart-item__decrement" aria-label="decrement-amount">-</button>
                  <span class="cart-item__amount">1</span>
                <button class="cart-item__increment" aria-label="increment-amount">+</button>
              </div>
            </li>
          </ul>`
}