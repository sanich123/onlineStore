import { createBreadcrumbs } from "../markup/create-breadcrumbs";
import { createHeader } from "../markup/create-header";
import { createProductExample } from "../markup/create-product-example";
import { createFooter } from "../markup/create-footer";
import { hashListener } from "../utils/utils";
import { vasilyExampleOfFunction } from "../utils/vasily-utils";

export function CreateProduct() {
  //здесь какая-то логика по получению id товара window.location.href, слайсить последние 3 символа, фильтровать знак / => вот и id получили const productId = window.location.href.slice().filer().join() (чисто рандомно идеи говорю)
  //здесь получаем отфильтрованные значения const filtredData = mocks.filter(({id}) => id === предыдущий пункт);
  //получаем проперти этого объекта const [{id, description, img, anotherProps}] = filtredData;
  //эти проперти передаем в функцию по отрисовке этого элемента, createHeader, createBreadcrumbs, createProductExample. Названия я чисто рандомно ща назвал, к примеру createProductExample надо разбить на более маленькие функции, и вообще бить на более маленькие кусочки, чтобы можно было с ними работать. Логика - эти функции принимают параметры, которые отрисовывают, соответственно, разный id разные данные вставятся. Смотри как работают мои компоненты, createCatalog, createCart.
  
  
  const body = document.querySelector(".page") as HTMLBodyElement;
  body.innerHTML = `${createHeader()}<main>${createBreadcrumbs()}${createProductExample()}</main>${createFooter()}`;
  //не отрисовываются картинки - посмотри, как я их импортировал в createHeader(), по аналогии сделай, все будет работать

  //здесь можно получить уже отрисованные элементы и навешивать на них обработчики
  const modal = document.querySelector(".modal") as HTMLDivElement;
  const trigger = document.querySelector(".modal_func") as HTMLButtonElement;
  const closeButton = document.querySelector(".close-button") as HTMLButtonElement;

  trigger.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
  });
  closeButton.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
  });

  //нужно кнопку добавления в корзину здесь получить и в нее по аналогии с моим файлами сделать window.history.pushState({}, '', routes.cart), я правда увидел там в html onclick - так не надо делать, здесь все обрабатываем, в js, и там класс надо добавить, чтобы ее отсюда достать

  //на window listener точно не надо было вешать
  vasilyExampleOfFunction('здесь я типа просто функцию написал, для примера, как работает с typeScript, как импортируется');//типа вот так вот создаешь функцию и ее импортируешь и вызываешь, гораздо удобнее чем в <script> писать
  hashListener();//это важная функция, не удаляй ее
}
