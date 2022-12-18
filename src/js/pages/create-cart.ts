import { hashListener } from "../utils/utils";

export function CreateCart() {
  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `<p>Здесь будет страница корзины<p>`;
  }

hashListener();
}
