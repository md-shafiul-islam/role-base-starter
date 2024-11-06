import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";

const orderActionUrl = `${process.env.API_BASE_LINK}/admin/orders`;

export async function GET(request, ctx) {
  const { searchParams } = new URL(request.url);

  const session = await auth();
  let response = null,
    status = false,
    message = "Orders Not found";

  setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

  try {
    const respOrder = await axios.get(
      `${orderActionUrl}/printables?status=${searchParams.get("status")}`,
      {
        headers: REQUEST_HEADER,
      }
    );

    esBackLogger.info("Order Printable Response ", respOrder);
    response = respOrder.data.response;
    status = respOrder.data.status;
    message = respOrder.data.message;
  } catch (error) {
    esBackLogger.info("Get One Cart Response Error, ", error);
  }

  return getResponseFormatter(response, status, message);
}

export async function PUT(request, ctx) {
  return getResponseFormatter(null, false, "Update failed found");
}

export async function POST(request, ctx) {
  let message = "Order Place failed",
    status = false,
    response = null;

  try {
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken);

    const data = await request.json();

    const orderResp = await axios.post(orderActionUrl, data, {
      headers: REQUEST_HEADER,
    });

    response = orderResp.data.response;
    status = orderResp.data.status;
    message = orderResp.data.message;
  } catch (error) {
    //esBackLogger.info("Error Ordar Place Error, ", error.message);
    message = error.message;
  }
  return getResponseFormatter(response, status, message);
}
