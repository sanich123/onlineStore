import { CreateCart } from "../pages/create-cart";
import { DataType } from "../types/types";
import { DEFAULT_AMOUNT_ITEMS, DEFAULT_NUMBER_OF_PAGE, PAGINATION_NAMES, SEARCH_KEYS } from "./const";
import { createSearchUrl } from "./utils";

export function getPaginatedData(cartItems: DataType[], urlAmount: string, urlPage: string, searchParams: URLSearchParams) {
    const amountUrl = Number(urlAmount) || DEFAULT_AMOUNT_ITEMS;
    const pageUrl = Number(urlPage) || DEFAULT_NUMBER_OF_PAGE;
    const amountPages = Math.ceil(cartItems.length / amountUrl);
    const start = (pageUrl - 1) * amountUrl;
    const last = start + amountUrl;
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

export function setRightUrlPage(urlPageNumber: string, amountPages: number, searchParams: URLSearchParams) {
    if (Number(urlPageNumber) > amountPages) {
        console.log(Number(urlPageNumber), amountPages);
        searchParams.set(SEARCH_KEYS.pageNumber, `${amountPages}`);
        window.history.pushState({}, "", createSearchUrl(searchParams));
        CreateCart();
    }
    return;
}