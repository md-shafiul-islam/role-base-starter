import locationReducer from "./locationReducer";
import addressReducer from "./addressReducer";
import invoiceReducer from "./invoiceReducer";
import menuReducer from "./menuReducer";
import roleReducer from "./roleReducer";
import productReducer from "./productReducer";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import unitReducer from "./unitReducer";
import specKeyReducer from "./specKeyReducer";
import specificationReducer from "./specificationReducer";
import stakeholderReducer from "./stakeholderReducer";
import stakeholderTypeReducer from "./stakeholderTypeReducer";
import userReducer from "./userReducer";
import organizationReducer from "./organizationReducer";

export default function reducer() {
  return {
    address: addressReducer,
    location: locationReducer,
    invoice: invoiceReducer,
    menu: menuReducer,
    role: roleReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    unit: unitReducer,
    spcKey: specKeyReducer,
    specification: specificationReducer,
    stakeType: stakeholderTypeReducer,
    stakeholder: stakeholderReducer,
    user: userReducer,
    organization: organizationReducer,
  };
}
