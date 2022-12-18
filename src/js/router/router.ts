import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { routes } from "../utils/const";

export function Router(location: string) {
  const url = new URL(location);
  if (url.hash === routes.catalog) {
    CreateCatalog();
  } else if (url.hash === routes.product) {
    CreateProduct();
  } else if (url.hash === routes.cart) {
    CreateCart();
  }
}
