import { manageInventoryBtn, productSiderbar } from "./selectors";

export const manageInventoryBtnHandler = (event) => {
  event.stopPropagation();
  productSiderbar.classList.remove("translate-x-full");
  productSiderbar.classList.add("duration-300");
};

export const closeSiderbarBtnHandler = (event) => {
  event.stopPropagation();
  productSiderbar.classList.add("translate-x-full");
};

export const checkoutBtnHandler = () => {
  window.print();
};
