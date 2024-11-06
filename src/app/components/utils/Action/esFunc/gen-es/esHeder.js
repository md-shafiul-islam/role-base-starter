import axios from "axios";
import { REQUEST_HEADER } from "../../redux/types";
import { isEmptyOrNull } from "./esCheckFunc";

export const setGlobalTokenToHeader = (data) => {

  if (isEmptyOrNull(REQUEST_HEADER.Authorization)) {
    axios.defaults.headers.common['Authorization'] = data?.accessToken;
    REQUEST_HEADER.Authorization = data?.accessToken;

  }


};
