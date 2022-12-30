import { CreateCart } from "../pages/create-cart";
import { DataType } from "../types/types";
import { DEFAULT_AMOUNT_ITEMS, DEFAULT_NUMBER_OF_PAGE, PAGINATION_NAMES, SEARCH_KEYS } from "./const";
import { createSearchUrl } from "./utils";

export function getPaginatedData(cartItems: DataType[], urlAmount: number = DEFAULT_AMOUNT_ITEMS, urlPage: number = DEFAULT_NUMBER_OF_PAGE) {
    const amountPages = Math.ceil(cartItems.length / urlAmount);
    const start = (urlPage - 1) * urlAmount;
    const last = start + urlAmount;
    const paginatedData = cartItems.slice(start, last);
    return { amountPages, paginatedData }
}

export function setPaginationUrlParams(name: string, value: string, searchParams: URLSearchParams, urlPageNumber: string) {
    if (name === PAGINATION_NAMES.pageBtns) {
        searchParams.set(SEARCH_KEYS.pageNumber, value);
    }
    if (name === PAGINATION_NAMES.prevBtn) {
        searchParams.set(SEARCH_KEYS.pageNumber, `${Number(urlPageNumber) - 1}`);
    }
    if (name === PAGINATION_NAMES.nextBtn) {
        searchParams.set(SEARCH_KEYS.pageNumber, `${Number(urlPageNumber) + 1}`);
    }
    if (name === PAGINATION_NAMES.amountItems) {
        searchParams.set(SEARCH_KEYS.amountOfItems, value);
    }
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
        CreateCart();
    }
}
