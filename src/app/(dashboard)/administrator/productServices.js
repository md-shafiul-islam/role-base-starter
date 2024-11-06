import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

const actionUrl = `${process.env.API_BASE_LINK}/products`;

export const getAllProductByStatus = async (status) => {
  //esBackLogger.info("Geting Product By Status ", status);
  let productResp = null;
  try {
    productResp = await axios.get(`${actionUrl}/type=${min}`, {
      headers: REQUEST_HEADER,
    });
    productResp = productResp.data;
  } catch (error) {
    productResp = { errorStatus: true, status: false, message: error.message };
  }

  return productResp;
};
