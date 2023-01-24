import { createHeader, createFooter } from "../markup/create-header-footer";
import { getNodes } from "../markup/get-nodes";
import { routes } from "../utils/const";
import CreateCart from "./create-cart";
import CreateCatalog from "./create-catalog";

export function Create404Page() {
    const body = document.querySelector(".page") as HTMLBodyElement;
    body.innerHTML = `${createHeader()}<main class="page__main">
    <section class="page404">
    <div class="title404">
    <span>404</span>
    </div>
    <div class="subtitle404">
    <div>OOPS! THE PAGE WAS NOT FOUND</div>
    <div>If you love react, your native js can be really  similar to react)))<a href="/#catalog">the main page</a></div>
    </div>
    </section>
    </main>${createFooter()}`;
    const { logo, cart } = getNodes();
    cart?.addEventListener('click', () => {
        window.history.pushState({}, '', `${routes.cart}`);
        CreateCart();
    });
    logo?.addEventListener('click', () => {
        window.history.pushState({}, '', `${routes.catalog}`);
        CreateCatalog();
    });
}
