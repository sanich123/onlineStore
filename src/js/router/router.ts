import { CreateCart } from "../pages/create-cart";
import { CreateCatalog } from "../pages/create-catalog";
import { CreateProduct } from "../pages/create-product";
import { routes } from "../utils/const";

export function Router(location: string) {
  console.log(location);
  const url = new URL(location);
  if (location.includes('#catalog')) {
    CreateCatalog();
  } else if (url.hash === routes.product) {
    CreateProduct();
  } else if (url.hash === routes.cart) {
    CreateCart();
  }
}
