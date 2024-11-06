import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";

const actionUrl = `${process.env.API_BASE_LINK}/addresses`;

export async function GET(request, ctx) {
  //esBackLogger.info("Context Address Get One ", ctx);
  const session = await auth();
  let response = null,
    status = false,
    message = "Cart Not found";
  setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

  try {
    const respCart = await axios.get(
      `${actionUrl}/${ctx?.params?.cart}`,
      REQUEST_HEADER
    );

    response = respCart.data.response;
    message = respCart.data.message;
    status = respCart.data.status;

    //esBackLogger.info("Resp Cart data, ", respCart.data);
  } catch (error) {
    //esBackLogger.info("Get One Cart Response Error, ", error);
  }

  return getResponseFormatter(response, status, message);
}

export async function PUT(request, ctx) {
  return getResponseFormatter(null, false, "Update failed found");
}

export async function POST(request, ctx) {
  let message = "Add Or Update failed",
    status = false;

  try {
    const session = await auth();

    const data = await request.json();

    setAxiosGlobalHeader(session?.accessToken);

    const addressResp = await axios.post(
      `${actionUrl}/search`,
      { words: data },
      REQUEST_HEADER
    );
    //esBackLogger.info("Address API Response A ", addressResp.data);
  } catch (error) {
    //esBackLogger.info("Error Address API , ", error);
    message = error.message;
  }

  return getResponseFormatter(null, false, status);
}
