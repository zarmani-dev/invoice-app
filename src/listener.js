import {
  checkoutBtnHandler,
  closeSiderbarBtnHandler,
  manageInventoryBtnHandler,
} from "./handlers";
import { addProductBtnHandler } from "./Inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import {
  addProductBtn,
  checkoutBtn,
  closeSiderbarBtn,
  createRecordForm,
  heroTemplate,
  manageInventoryBtn,
  recordGroup,
} from "./selectors";

const listener = () => {
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
  closeSiderbarBtn.addEventListener("click", closeSiderbarBtnHandler);
  heroTemplate.addEventListener("click", closeSiderbarBtnHandler);
  addProductBtn.addEventListener("click", addProductBtnHandler);
  createRecordForm.addEventListener("submit", createRecordFormHandler);
  recordGroup.addEventListener("click", recordGroupHandler);
  checkoutBtn.addEventListener("click", checkoutBtnHandler);
};

export default listener;
