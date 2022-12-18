import { createHeader } from "../markup/create-header";
import { mocks } from "../mocks/mocks";
import { getFiltredData, getSearchParams, hashListener } from "../utils/utils";

export function CreateCatalog() {
  const searchParams = getSearchParams();

  console.log(getFiltredData(mocks, searchParams));

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = createHeader();
  }
  hashListener();
}
