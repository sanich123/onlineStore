import { createFooter } from "../markup/create-footer";
import { createHeader } from "../markup/create-header";

export function CreateSuccessMessage() {
   const body = document.querySelector(".page") as HTMLBodyElement;
   body.innerHTML = `${createHeader()}<main class="page__main">
   <section class="success">
   <div class="success__message">
   <span>Thanks for your order. Redirect to the store after few sec</span>
   </div>
   </section>
   </main>${createFooter()}`;
}