import axios from "axios";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";
import { SET_BOLOG_ALL, SET_BOLOG_ADD, SET_BOLOG_UPDATE } from "../types";

const actionUrl = `/api/blogs`;

/**
 *
 * @param {[0,0]} range
 * @returns
 */
export const getAllBlog = () => async (dispatch) => {
  try {
    const resp = await axios.get(`${actionUrl}`);

    if (!isEmptyOrNull(resp.data)) {
      if (resp.data.status) {
        dispatch({
          type: SET_BOLOG_ALL,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_BOLOG_ALL,
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
          type: SET_BOLOG_ADD,
          payload: { errStatus: false, ...resp.data },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: SET_BOLOG_ADD,
      payload: {
        status: false,
        message: error.message,
        response: null,
        errStatus: true,
      },
    });
  }
};
