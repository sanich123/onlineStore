
import { createFooter } from "../markup/create-footer";
import { createHeader } from "../markup/create-header";

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