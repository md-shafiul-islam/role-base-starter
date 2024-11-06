import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { SET_ALL_BRAND, SET_BRAND_ADD, SET_PRODUCT_PRICE_BY_RANGE } from "../types";

const actionUrl = `/api/brands`;

/**
 *
 * @param {[0,0]} range
 * @returns
 */
export const getAllBrand = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${actionUrl}`);

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_ALL_BRAND,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_ALL_BRAND,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};

export const addBlogAction = (blog) => async (dispatch) => {
  try {
    const resp = await axios.get(`${actionUrl}`);

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_BRAND_ADD,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_BRAND_ADD,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};
