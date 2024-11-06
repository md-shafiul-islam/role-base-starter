import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { SET_SEARCH_PRODUCT_OPTIONS } from "../types";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const productSearchUrl = `/api/products/query/search`;

export const initSearchItemsAction = () => async (dispatch) => {
  try {
    const optionsResp = await axios.get(productSearchUrl);

    if (!isEmptyOrNull(optionsResp.data)) {
      if (optionsResp.data.status) {
        dispatch({
          type: SET_SEARCH_PRODUCT_OPTIONS,
          payload: { ...optionsResp.data, errorStatus: false },
        });
      }
    }
  } catch (error) {
    esFrontLogger.info("Product Search Options Error ", error);
    dispatch({
      type: SET_SEARCH_PRODUCT_OPTIONS,
      payload: {
        response: null,
        status: false,
        message: error.message,
        errorStatus: true,
      },
    });
  }
};
