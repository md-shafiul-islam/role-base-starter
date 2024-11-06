import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import stakholderController from "@/src/controller/stakholder.controller";

import userController from "@/src/controller/user.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  // const session = await auth();

  let response = null,
    status = false,
    message = "User Not found";

  try {
    return await userController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get One User Response Error, ", error);

    return getResponseFormatter(response, status, message);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = esResponseMessage.addFailed("User Stakeholder");

  try {
    return await stakholderController.createViaUser(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Products Response Error, ", error);
    return getResponseFormatter(response, status, message);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.toogleStatusFailed("User Active")
  );

  try {
    return await userController.userToggleActive(request, ctx);
  } catch (error) {
    return getResponseFormatterObj(response);
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.toogleStatusFailed("User Verified")
  );

  try {
    return await userController.userVerified(request, ctx);
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatterObj(response);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "User Can't Delete, Please Inactive User";

  return getResponseFormatter(response, true, message);
}
