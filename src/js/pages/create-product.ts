import { createBreadcrumbs } from "../markup/create-breadcrumbs";
import { createHeader, createFooter } from "../markup/create-header-footer";
import { createProductExample } from "../markup/create-product-markup";
import { createSearchUrl, getSearchParams, hashListener } from "../utils/utils";
import { getNodes } from "../markup/get-nodes";
import { LS_KEYS, routes, SEARCH_KEYS } from "../utils/const";
import CreateCart from "./create-cart";
import CreateCatalog from "./create-catalog";
import { mocks } from "../mocks/mocks";
import { getNodesProduct } from "../markup/get-nodes-product";
import { getFromLocalStorage, localStorageHelper } from "../utils/local-storage";

export default function CreateProduct() {
  const location = window.location.href;
  const productId = Number(location.slice(-3).match(/[0-9]/gi)?.join(''));
  const filtredData = mocks.filter((product) => product.id === productId);
  const isInCart = getFromLocalStorage(LS_KEYS.cart);
  const ids = isInCart.map(({ id }: { id: number }) => id);
  const { searchParams } = getSearchParams();

  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main>${createBreadcrumbs(filtredData)}${createProductExample(filtredData)}</main>${createFooter()}`;

  const { addToCartAndGoBuy, smallPictures, bigPicture, cartBtn } = getNodesProduct();
  const { logo, cart } = getNodes();

  cartBtn?.addEventListener('click', ({ target }) => {
    const { name, value } = target as HTMLButtonElement;
    localStorageHelper(name, value, ids, isInCart);
  })
  smallPictures?.addEventListener('click', ({ target }) => {
    const { src } = target as HTMLImageElement;
    bigPicture.src = src;
  })
  addToCartAndGoBuy.addEventListener('click', ({ target }) => {
    const { name, value } = target as HTMLButtonElement;
    localStorageHelper(name, value, ids, isInCart);
    searchParams.set(SEARCH_KEYS.modal, 'true');
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCart();
  });
  cart?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.cart}`);
    CreateCart();
  });
  logo?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.catalog}`);
    CreateCatalog();
  });

  hashListener();
}
