import { hashListener } from "../utils/utils";

export function CreateCatalog() {
  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `<p>Здесь будет страница каталога<p>`;
  }
  hashListener();
}
