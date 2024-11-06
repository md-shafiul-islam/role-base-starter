import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";
import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { setAxiosGlobalHeader } from "../../../components/initAxios";
import { auth } from "@/src/auth";

const authOrderActionUrl = `${process.env.API_BASE_LINK}/admin/orders`;

export async function GET(request, ctx) {
  let response = null,
    status = false,
    message = "Products not found",
    cSession = "Not Set";
  const { searchParams } = new URL(request.url);

  esBackLogger.info("Admin Order Search Query,  ", searchParams.get("type"));
  try {
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

    const ordersResp = await axios.get(
      `${authOrderActionUrl}?type=${searchParams.get("type")}`,
      {
        headers: REQUEST_HEADER,
      }
    );

    response = ordersResp.data.response;
    status = ordersResp.data.status;
    message = `API Msg: ${ordersResp.data.message}`;
    cSession = session?.accessToken;
  } catch (error) {
    //esBackLogger.info("Get All products Response Error, ", error);
    message = `API Error Coonection ${error.message}`;
  }

  message = { message, cSession };
  return getResponseFormatter(response, status, message);
}
