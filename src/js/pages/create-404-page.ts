
import { createFooter } from "../markup/create-footer";
import { createHeader } from "../markup/create-header";

/*
import { createCartItemsList } from "../markup/create-cart-item-list";
import { createPagination } from "../markup/create-pagination";
import { createTotalInfo } from "../markup/create-total-info";
import { getNodes } from "../markup/get-nodes";
import { getNodesCart } from "../markup/get-nodes-cart";
import { getTotalSumAndCoupons } from "../utils/cart-helpers";
import { LS_KEYS, routes, SEARCH_KEYS } from "../utils/const";
import { applyToLocalStorage, deleteAppliedCoupons, incrementDecrementCounter, localStorageCouponHelper, setAppliedToCoupons } from "../utils/local-storage";
import { getPaginatedData, setDefaultPagesAndAmount, setPaginationUrlParams } from "../utils/pagination";
import { createSearchUrl, getSearchParams, hashListener } from "../utils/utils";
import CreateCatalog from "./create-catalog";
import CreateProduct from "./create-product";
*/

export function Create404Page() {
    const body = document.querySelector(".page") as HTMLBodyElement;
    body.innerHTML = `${createHeader()}<main class="page__main">
    <section class="page404">
    <div class="title404">
    <span>404</span>
    </div>
    <div class="subtitle404">
    <span>OOPS! THE PAGE WAS NOT FOUND</span>
    </div>
    </section>
    </main>${createFooter()}`;
}