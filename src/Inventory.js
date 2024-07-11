import {
  newProductName,
  newProductPrice,
  productCartTemplate,
  productGroup,
  productSelect,
} from "./selectors";
import { v4 as uuidv4 } from "uuid";
import { products } from "./states";

export const addProductBtnHandler = () => {
  const creatId = uuidv4();
  productGroup.append(
    createProduct(creatId, newProductName.value, newProductPrice.valueAsNumber)
  );
  productSelect.append(
    new Option(
      `${newProductName.value} - ${newProductPrice.valueAsNumber}`,
      creatId
    )
  );

  products.push({
    id: creatId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });

  newProductName.value = null;
  newProductPrice.value = null;
};

export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createProduct(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};

export const createProduct = (id, name, price) => {
  const newProductCard = productCartTemplate.content.cloneNode(true);
  const productName = newProductCard.querySelector(".product-name");
  const productPrice = newProductCard.querySelector(".product-price");
  const productCard = newProductCard.querySelector(".productCard");

  productCard.id = id;

  productName.innerText = name;
  productPrice.innerText = price;

  return newProductCard;
};
