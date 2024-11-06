import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { SET_FILTER_BRANDS, SET_PRODUCT_PRICE_BY_RANGE } from "../types";

const actionUrl = `/api/products`;

/**
 *
 * @param {[0,0]} range
 * @returns
 */
export const getAllProductByPriceRange = (range, type) => async (dispatch) => {
  try {
    const resp = await axios.get(
      `${actionUrl}/query/range?start=${range[0]}&end=${range[1]}&cat=${type}`
    );

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_PRODUCT_PRICE_BY_RANGE,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_PRODUCT_PRICE_BY_RANGE,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};

export const getAllProductByPriceRangeWithBrands =
  (filterData) => async (dispatch) => {
    

    try {
      const pUrl = `${actionUrl}/query/filter`;
      const resp = await axios.post(pUrl, filterData);
      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          dispatch({
            type: SET_PRODUCT_PRICE_BY_RANGE,
            payload: { errStatus: false, ...resp.data },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: SET_PRODUCT_PRICE_BY_RANGE,
        payload: {
          status: false,
          message: error.message,
          response: null,
          errStatus: true,
        },
      });
    }
  };
