import { DataType } from "../types/types";

export function createBreadcrumbs(filtredData: DataType[]) {
  const [{category, title, brand}] = filtredData;
    return `<section class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#catalog">Catalog</a></li>
          <li class="breadcrumb-item"><a href="#catalog">${category}</a></li>
          <li class="breadcrumb-item"><a href="#catalog">${brand}</a></li>
          <li class="breadcrumb-item active">${title}</li>
        </ol>
      </section>`;
}