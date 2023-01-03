import { createBreadcrumbs } from "../markup/create-breadcrumbs";
import { createHeader } from "../markup/create-header";
import { createProductExample } from "../markup/create-product-example";
import { createFooter } from "../markup/create-footer";
import { hashListener } from "../utils/utils";
import { getNodes } from "../markup/get-nodes";
import { routes } from "../utils/const";
import CreateCart from "./create-cart";
import CreateCatalog from "./create-catalog";
import { mocks } from "../mocks/mocks";
import { getNodesProduct } from "../markup/get-nodes-product";

export default function CreateProduct() {
  const location = window.location.href;
  const productId = Number(location.slice(-3).match(/[0-9]/gi)?.join(''));
  const filtredData = mocks.filter((product) => product.id === productId);
  
  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main>${createBreadcrumbs(filtredData)}${createProductExample(filtredData)}</main>${createFooter()}`;

  const { modal, trigger, closeButton, smallPictures, bigPicture, cartBtn } = getNodesProduct();
  const { logo, cart } = getNodes();

  cartBtn?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.cart}`);
    CreateCart();
  })
  smallPictures?.addEventListener('click', ({ target }) => {
    const { src } = target as HTMLImageElement;
    bigPicture.src = src;
  })
  trigger.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
  });
  closeButton.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
  });
  cart?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.cart}`);
    document.location.reload();
    CreateCart();
  });
  logo?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.catalog}`);
    document.location.reload();
    CreateCatalog();
  });

  hashListener();
}
