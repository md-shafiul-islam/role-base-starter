import roleController from "@/src/controller/role.controller";
import {
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  try {
    return await roleController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Users Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "User add failed";

  try {
    const user = await roleController.add(request, ctx);
    if (user) {
      status = true;
      message = "User added successfully";
    }
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
    return roleController.updateKey(request, ctx);
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
    return getResponseFormatter(response, status, message);
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}
