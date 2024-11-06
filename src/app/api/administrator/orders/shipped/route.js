import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";

const orderActionUrl = `${process.env.API_BASE_LINK}/admin/orders`;

export async function POST(request, ctx) {
  let message = "Order Shipped failed",
    status = false,
    response = null;

  try {
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken);

    const data = await request.json();

    //esBackLogger.info("Order Shipped ", data);

    const orderResp = await axios.put(
      orderActionUrl,
      { id: data?.order, status: "shipped" },
      {
        headers: REQUEST_HEADER,
      }
    );

    //esBackLogger.info("Order shipped Resp, ", orderResp);
    response = orderResp.data.response;
    status = orderResp.data.status;
    message = orderResp.data.message;
  } catch (error) {
    //esBackLogger.info("Error Ordar shipped Error, ", error.message);
    message = error.message;
  }

  return getResponseFormatter(response, status, message);
}
