import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { DataType } from "../types/types";
import { DEFAULT_AMOUNT_ITEMS, DEFAULT_NUMBER_OF_PAGE, PAGINATION_NAMES, routes, SEARCH_KEYS } from "./const";
import { createSearchUrl } from "./utils";

export function getPaginatedData(cartItems: DataType[], urlAmount?: number, urlPage?: number) {
    const safeAmount = urlAmount || DEFAULT_AMOUNT_ITEMS;
    const safePage = urlPage || DEFAULT_NUMBER_OF_PAGE;
    const amountPages = Math.ceil(cartItems.length / safeAmount);
    const start = (safePage - 1) * safeAmount;
    const last = start + safeAmount;
    const paginatedData = cartItems.slice(start, last);
    return { amountPages, paginatedData }
}

export function setPaginationUrlParams(name: string, value: string, searchParams: URLSearchParams, urlPageNumber: string) {
    if (name === PAGINATION_NAMES.pageBtns) searchParams.set(SEARCH_KEYS.pageNumber, value);
    if (name === PAGINATION_NAMES.prevBtn) searchParams.set(SEARCH_KEYS.pageNumber, `${Number(urlPageNumber) - 1}`);
    if (name === PAGINATION_NAMES.nextBtn) searchParams.set(SEARCH_KEYS.pageNumber, `${Number(urlPageNumber) + 1}`);
    if (name === PAGINATION_NAMES.amountItems) searchParams.set(SEARCH_KEYS.amountOfItems, value);
}

export function setDefaultPagesAndAmount(urlPageNumber: string, urlAmountOfItems: string, searchParams: URLSearchParams) {
    if (!urlPageNumber || !urlAmountOfItems) {
        if (!urlPageNumber) {
            searchParams.set(SEARCH_KEYS.pageNumber, `${DEFAULT_NUMBER_OF_PAGE}`);
        }
        if (!urlAmountOfItems) {
            searchParams.set(SEARCH_KEYS.amountOfItems, `${DEFAULT_AMOUNT_ITEMS}`);
        }
        window.history.pushState({}, '', createSearchUrl(searchParams));
        const location = window.location.href;
        location.includes(routes.cart) ? CreateCart() : CreateCatalog();
    }
}
