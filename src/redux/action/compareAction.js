import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import {
  CLEAR_ITEMS_FROM_COMPARE_LIST,
  SET_ITEM_TO_COMPARE_LIST,
  SET_REMOVE_ITEM_TO_COMPARE_LIST,
} from "../types";

export const getClearCompareItemsAction = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ITEMS_FROM_COMPARE_LIST,
    payload: true,
  });
};

export const setCompareItemAction = (product) => async (dispatch) => {
  if (!isEmptyOrNull(product)) {
    dispatch({
      type: SET_ITEM_TO_COMPARE_LIST,
      payload: product,
    });
  }
};

export const removeCompareItemAction = (productId) => async (dispatch) => {
  if (!isEmptyOrNull(productId)) {
    dispatch({
      type: SET_REMOVE_ITEM_TO_COMPARE_LIST,
      payload: productId,
    });
  }
};
