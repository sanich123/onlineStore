import { hashListener } from "../utils/utils";

export function CreateProduct() {
  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `<p>Здесь будет страница товара<p>`;
  }
  console.log("Я страница товара");

  hashListener();
}
