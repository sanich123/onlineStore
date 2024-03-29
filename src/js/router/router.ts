import { Create404Page } from "../pages/create-404-page";
import CreateCart from "../pages/create-cart";
import CreateCatalog from "../pages/create-catalog";
import CreateProduct from "../pages/create-product";
import { routes } from "../utils/const";

export function Router(location: string) {
  if (location.includes(routes.catalog) || !location.includes('#')) {
    CreateCatalog();
  } else if (location.includes(routes.product)) {
    CreateProduct();
  } else if (location.includes(routes.cart)) {
    CreateCart();
  } else {
    Create404Page();
  }
}
