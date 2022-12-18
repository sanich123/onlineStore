import { mocks } from "../mocks/mocks";
import { getFiltredData, getSearchParams, hashListener } from "../utils/utils";

export function CreateCatalog() {
  const searchParams = getSearchParams();

  console.log(getFiltredData(mocks, searchParams));

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `<p>Здесь будет страница каталога<p>`;
  }
  hashListener();
}
