import { hashListener } from "../utils/utils";

export function CreateCatalog() {
    const location = window.location.href;
    const url = new URL(location).hash;
    console.log(url);
    // const filtredParams = url.includes('?') ? url.slice(url.indexOf('?')) : '';

    // const searchParams = new URLSearchParams(filtredParams);
    // const result = {};
    // for (let [key, value] of searchParams) {
    //     result[key] = value;
    // }
    // console.log(result);

  const body = document.querySelector(".page");
  if (body) {
    body.innerHTML = `<p>Здесь будет страница каталога<p>`;
  }
  hashListener();
}
