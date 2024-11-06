import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";

import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import userController from "@/src/controller/user.controller";
import { NextRequest } from "next/server";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

export async function GET(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
    const users = await userController.getAll(request, ctx);
    if (!isEmptyOrNull(users)) {
      response = users;
      message = `${users.length} User found`;
      status = true;
    }
  } catch (error) {
    esBackLogger.info("Get Users Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "User register failed";

  try {
    const user = await userController.register(request, ctx);
    if (user) {
      status = true;
      message = "User register successfully";
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
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
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

export async function DELETE(request: NextRequest, ctx: any) {
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
