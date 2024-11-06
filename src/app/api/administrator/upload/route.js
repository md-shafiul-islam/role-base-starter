import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import path from "path";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
const actionUrl = `${process.env.API_BASE_LINK}`;

export async function GET(request, ctx) {
  let response = null,
    status = false,
    message = "Sizes not found";

  try {
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

    const uploadImage = await axios.get(`${actionUrl}/sizes`, {
      headers: REQUEST_HEADER,
    });

    //esBackLogger.info("Get All upload Response ", sizes);

    response = uploadImage.data.response;
    status = uploadImage.data.status;
    message = uploadImage.data.message;
  } catch (error) {
    //esBackLogger.info("Get All sizes Response Error, ", error);
    message = error.message;
  }

  return getResponseFormatter(response, status, message);
}

export async function PUT(request, ctx) {
  return getResponseFormatter(null, false, "Update failed found");
}

export async function POST(request, ctx) {
  let message = "Upload Image POST failed",
    status = false,
    response = null;

  try {
    const formData = await request.formData();
    const session = await auth();
    setAxiosGlobalHeader(session?.accessToken ? session?.accessToken : "");

    const uploadResp = await axios.postForm(
      `${actionUrl}/upload/products`,
      formData,
      { headers: REQUEST_HEADER }
    );

    response = uploadResp.data.response;
    status = uploadResp.data.status;
    message = uploadResp.data.message;
  } catch (error) {
    esBackLogger.info("Error Uploade File, ", error);
    message = error.message;
  }

  return getResponseFormatter(response, status, message);
}
