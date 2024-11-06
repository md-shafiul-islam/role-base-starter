import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { SET_ALL_BRAND, SET_NEWS_ADD, SET_NEWS_ALL, SET_PRODUCT_PRICE_BY_RANGE } from "../types";

const actionUrl = `/api/brands`;

/**
 *
 * @param {[0,0]} range
 * @returns
 */
export const getAllNews = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${actionUrl}`);

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_NEWS_ALL,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_NEWS_ALL,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};

export const addNewsAction = (blog) => async (dispatch) => {
  try {
    const resp = await axios.get(`${actionUrl}`);

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_NEWS_ADD,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_NEWS_ADD,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};
