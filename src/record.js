import {
  createRecordForm,
  recordGroup,
  recordRowTemplate,
  totalCost,
  totalNetTotal,
  totalTax,
} from "./selectors";
import { products } from "./states";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export const createRecordFormHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(createRecordForm);

  const currentProduct = products.find(
    ({ id }) => id == formData.get("product-select")
  );

  // recordGroup.append(createRecordRow(currentProduct, formData.get("quantity")));

  const isExcited = document.querySelector(
    `[product-id='${currentProduct.id}']`
  );
  if (!isExcited) {
    recordGroup.append(
      createRecordRow(currentProduct, formData.get("quantity"))
    );
  } else {
    updateRecordQuantity(isExcited.id, +formData.get("quantity"));
  }

  createRecordForm.reset();
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordName = recordRow.querySelector(".record-name");
  const recordPrice = recordRow.querySelector(".record-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.id = "record" + uuidv4();
  recordName.innerText = name;
  recordPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;
  return recordRow;
};

export const calculateTax = (amount, percentage = 5) =>
  (amount / 100) * percentage;

export const calculateTotalCost = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });

  return total;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure to delete this item?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      recordGroup.querySelector(`#${rowId}`).remove();
    }
  });
};

// export const quantityAdd = (rowId) => {
//   const currentRecordRow = recordGroup.querySelector(`#${rowId}`);
//   const recordPrice = currentRecordRow.querySelector(".record-price");
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordCost = currentRecordRow.querySelector(".record-cost");
//   recordQuantity.innerText = +recordQuantity.innerText + 1;
//   recordCost.innerText = recordPrice.innerText * recordQuantity.innerText;
// };

// export const quantitySub = (rowId) => {
//   const currentRecordRow = recordGroup.querySelector(`#${rowId}`);
//   const recordPrice = currentRecordRow.querySelector(".record-price");
//   const recordQuantity = currentRecordRow.querySelector(".record-quantity");
//   const recordCost = currentRecordRow.querySelector(".record-cost");
//   if (recordQuantity.innerText > 1) {
//     recordQuantity.innerText = +recordQuantity.innerText - 1;
//     recordCost.innerText = recordPrice.innerText * recordQuantity.innerText;
//   }
// };

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = recordGroup.querySelector(`#${rowId}`);

  const recordPrice = currentRecordRow.querySelector(".record-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = +recordQuantity.innerText + newQuantity;

    recordCost.innerText = recordQuantity.innerText * recordPrice.innerText;
  }
};

export const recordGroupHandler = (e) => {
  const currentRecordRow = e.target.closest(".record-row");
  if (e.target.classList.contains("record-remove")) {
    removeRecord(currentRecordRow.id);
  } else if (e.target.classList.contains("quantity-add")) {
    updateRecordQuantity(currentRecordRow.id, 1);
  } else if (e.target.classList.contains("quantity-sub")) {
    updateRecordQuantity(currentRecordRow.id, -1);
  }
};

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    let total = calculateTotalCost();
    let tax = calculateTax(total);

    totalCost.innerText = total;
    totalTax.innerText = tax;
    totalNetTotal.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, observerOptions);
};
