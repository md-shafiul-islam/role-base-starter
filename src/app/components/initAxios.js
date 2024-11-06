import axios from "axios";
import { REQUEST_HEADER } from "./utils/types";

axios.defaults.baseURL = "http://localhost:9500/api/v1";
axios.defaults.headers.common["Authorization"] = ``;

export const setAxiosGlobalHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
  REQUEST_HEADER.Authorization = token;
};
