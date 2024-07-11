import { productRender } from "./Inventory";
import { productSiderbar } from "./selectors";
import { products } from "./states";

const initialRender = () => {
  productRender(products);
};

export default initialRender;
