import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { routes } from "../utils/const";

export function Router(location: string) {
  const url = new URL(location);
  console.log(url);
  if (location.includes(routes.catalog) || !url.hash) {
    CreateCatalog();
  } else if (location.includes(routes.product)) {
    CreateProduct();
  } else if (url.hash === routes.cart) {
    CreateCart();
  }
}
