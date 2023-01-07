import { createCartItemsList } from "../markup/create-cart-items-list";
import { createFooter, createHeader } from "../markup/create-header-footer";
import { createModal } from "../markup/create-modal";
import { createPagination } from "../markup/create-pagination";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodes } from "../markup/get-nodes";
import { getNodesCart } from "../markup/get-nodes-cart";
import { getNodesProduct } from "../markup/get-nodes-product";
import { getCardLogo, getTotalSumAndCoupons } from "../utils/cart-helpers";
import { LS_KEYS, routes, SEARCH_KEYS } from "../utils/const";
import { applyToLocalStorage, deleteAppliedCoupons, incrementDecrementCounter, localStorageCouponHelper, setAppliedToCoupons } from "../utils/local-storage";
import { getPaginatedData, setDefaultPagesAndAmount, setPaginationUrlParams } from "../utils/pagination";
import { createSearchUrl, getSearchParams, hashListener } from "../utils/utils";
import CreateCatalog from "./create-catalog";
import CreateProduct from "./create-product";
import { CreateSuccessMessage } from "./create-success-message";

export default function CreateCart() {
  const { couponsInCart, withAmount, totalSum, totalAmountOfProducts, filtredDiscount, finalSum } = getTotalSumAndCoupons();
  const { urlPageNumber, urlAmountOfItems, urlIsModalOpen, searchParams } = getSearchParams();
  const { amountPages, paginatedData } = getPaginatedData(withAmount, Number(urlAmountOfItems), Number(urlPageNumber));

  if (Number(urlPageNumber) > amountPages) {
    searchParams.set(SEARCH_KEYS.pageNumber, `${amountPages}`);
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCart();
    return;
  }
  setDefaultPagesAndAmount(urlPageNumber, urlAmountOfItems, searchParams);

  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main class="page__main"><section class="cart">
    ${withAmount.length ? `${createPagination(urlPageNumber, urlAmountOfItems, amountPages)}` : ''}
    ${createCartItemsList(paginatedData)}
    ${createTotalInfo(totalSum, totalAmountOfProducts, couponsInCart, filtredDiscount, finalSum)}
    ${createModal(urlIsModalOpen)}
    </section></main>${createFooter()}`;

  const { productsList, couponInput, couponsList, paginationForm, purchaseBtn } = getNodesCart();
  const { logo, cart } = getNodes();
  const { modal, closeButton, cardNumberInput, imgPaySystem, expirationDate, invalidExpiration, modalForm } = getNodesProduct();

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    CreateSuccessMessage();
    setInterval(() => {
      localStorage.clear();
      window.history.pushState({}, "", `${routes.catalog}`);
      CreateCatalog();
    }, 3000);
  });
  expirationDate?.addEventListener('input', ({ target }) => {
    const input = target as HTMLInputElement;
    if (Number(input.value.replace('/', ''))) {
      if (input.value.length === 2 && (Number(input.value) > 12 || Number(input.value) < 1)) {
        invalidExpiration.textContent = 'You typed the wrong month';
        setInterval(() => invalidExpiration.textContent = '', 2000);
        return input.value = '';
      }
      if (input.value.length === 2 && Number(input.value.slice(0, 2)) < 13) {
        input.value = `${input.value.slice(0, 2)}/`;
      }
      if (input.value.length > 5) {
        return input.value = input.value.slice(0, 5);
      }
    } else {
      input.value = '';
    }
  });
  cardNumberInput?.addEventListener('input', ({ target }) => {
    const { value } = target as HTMLInputElement;
    const firstChar = value[0];
    imgPaySystem.src = getCardLogo(firstChar);
  });
  closeButton?.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
    searchParams.delete(SEARCH_KEYS.modal);
    window.history.pushState({}, '', `${routes.cart}?${searchParams.toString()}`);
  });
  productsList.addEventListener('click', ({ target }) => {
    const { value, name, id } = target as HTMLButtonElement || HTMLImageElement;
    incrementDecrementCounter(name, value, withAmount);
    if (name === 'image') {
      window.history.pushState({}, '', `${routes.product}/${id}`);
      CreateProduct();
    }
  });
  couponInput.addEventListener('input', ({ target }) => {
    const { value } = target as HTMLInputElement;
    localStorageCouponHelper(value);
  });
  couponsList?.addEventListener('click', ({ target }) => {
    const { name } = target as HTMLButtonElement;
    if (target instanceof HTMLElement) {
      if (target.classList.contains('applied')) {
        return deleteAppliedCoupons(couponsInCart, name);
      }
    }
    const appliedCoupons = setAppliedToCoupons(couponsInCart, name);
    applyToLocalStorage(LS_KEYS.promocode, appliedCoupons);
    CreateCart();
  });
  paginationForm?.addEventListener('click', ({ target }) => {
    const { name, value } = target as HTMLInputElement;
    if (name && value) {
      setPaginationUrlParams(name, value, searchParams, urlPageNumber);
      window.history.pushState({}, "", createSearchUrl(searchParams));
      CreateCart();
    }
  });
  cart?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.cart}`);
    CreateCart();
  });
  logo?.addEventListener('click', () => {
    window.history.pushState({}, '', `${routes.catalog}`);
    CreateCatalog();
  });
  purchaseBtn.addEventListener('click', () => {
    searchParams.set(SEARCH_KEYS.modal, 'true');
    window.history.pushState({}, "", createSearchUrl(searchParams));
    CreateCart();
  });
  hashListener();
}
