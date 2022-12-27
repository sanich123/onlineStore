import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { routes } from "../utils/const";

export function Router(location: string) {
  if (location.includes(routes.catalog)) {
    CreateCatalog();
  } else if (location.includes(routes.product)) {
    CreateProduct();
  } else if (location.includes(routes.cart)) {
    CreateCart();
  }
}
