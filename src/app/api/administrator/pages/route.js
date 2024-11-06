import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";

const actionUrl = `${process.env.API_BASE_LINK}`;

export async function GET(request, ctx) {
  let response = null,
    status = false,
    message = "categories not found";

  try {
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

    //esBackLogger.info("categories, ");
    const categoryResp = await axios.get(`${actionUrl}/categories`, {
      headers: REQUEST_HEADER,
    });

    response = categoryResp.data.response;
    status = categoryResp.data.status;
    message = categoryResp.data.message;
  } catch (error) {
    //esBackLogger.info("Get All Category Resp Response Error, ", error);
    message = error.message;
  }

  return getResponseFormatter(response, status, message);
}

export async function PUT(request, ctx) {
  return getResponseFormatter(null, false, "Update failed found");
}

export async function POST(request, ctx) {
  let message = "Pathao POST failed",
    status = false;

  try {
    const data = await request.json();

    // const cartResp = await axios.post(actionUrl, data, REQUEST_HEADER);
  } catch (error) {
    //esBackLogger.info("Error Pathao, ", error);
    message = error.message;
  }

  return getResponseFormatter(null, false, status);
}
