import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";

import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import userController from "@/src/controller/user.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { auth } from "@/src/auth";
import { NextRequest } from "next/server";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

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
  let respUserAdd = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("User")
  );

  try {
    return await userController.add(request, ctx);
  } catch (error) {
    respUserAdd.message = error.message;
    respUserAdd.status = false;
    return getResponseFormatterObj(respUserAdd);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  const { searchParams } = new URL(request.url);

  const body = await request.json();

  // const session = await auth();

  let updateResp = getRespFormatte();
  try {
    if (searchParams.get("update") === "rule") {
      esBackLogger.info("Update body, Role, ", body);

      return await userController.userRuleUpdate(body);
    } else {
      esBackLogger.info("UpdateOne body, ", body);

      return await userController.update(body);
    }
  } catch (error) {
    esBackLogger.info("Update Error, ", error);
    updateResp.status = false;
    updateResp.message = error.message;
    return getResponseFormatterObj(updateResp);
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  // const session = await auth();
  let respUpdate = getRespFormatte();
  try {
    const user = await request.json();
    return await userController.update(user);
  } catch (error) {
    esBackLogger.info("Get Products Response Error, ", error);
    respUpdate.message = error.message;
    respUpdate.status = false;
    return getResponseFormatterObj(respUpdate);
  }
}
