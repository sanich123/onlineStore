import { createFilters } from "../markup/create-filters";
import { createHeader } from "../markup/create-header";
import { createProductsList } from "../markup/create-products-list";
import { mocks } from "../mocks/mocks";
import { getFiltredData, getSearchParams, hashListener } from "../utils/utils";

export function CreateCatalog() {
  const searchParams = getSearchParams();

  console.log(getFiltredData(mocks, searchParams));

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `${createHeader()}<main class="page__main main">${createFilters(mocks)}${createProductsList(mocks)}</main>`;
  }
  hashListener();
}
