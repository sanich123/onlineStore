import { createCartItemsList } from "../markup/create-cart-item-list";
import { createHeader } from "../markup/create-header";
import { createPagination } from "../markup/create-pagination";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodesCart } from "../markup/get-nodes-cart";
import { getTotalSumAndCoupons } from "../utils/cart-helpers";
import { LS_KEYS, SEARCH_KEYS } from "../utils/const";
import { applyToLocalStorage, deleteAppliedCoupons, incrementDecrementCounter, localStorageCouponHelper, setAppliedToCoupons } from "../utils/local-storage";
import { getPaginatedData, setDefaultPagesAndAmount, setPaginationUrlParams } from "../utils/pagination";
import { createSearchUrl, getSearchParams, hashListener } from "../utils/utils";

export function CreateCart() {
  const { couponsInCart, withAmount, totalSum, totalAmountOfProducts, filtredDiscount, finalSum } = getTotalSumAndCoupons();
  const { urlPageNumber, urlAmountOfItems, searchParams } = getSearchParams();
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
    ${createPagination(urlPageNumber, urlAmountOfItems, amountPages)}
    ${createCartItemsList(paginatedData)}${createTotalInfo(totalSum, totalAmountOfProducts, couponsInCart, filtredDiscount, finalSum)}
    </section></main>`;

  const { productsList, couponInput, couponsList, totalSumHeader, paginationForm } = getNodesCart();
  totalSumHeader.textContent = `$${finalSum}`;

  productsList.addEventListener('click', ({ target }) => {
    const { value, name } = target as HTMLButtonElement;
    incrementDecrementCounter(name, value, withAmount);
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
  hashListener();
}
