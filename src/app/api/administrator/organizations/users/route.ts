import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import organizationController from "@/src/controller/organization.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Organization Add User")
  );

  try {
    return await organizationController.addUser(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Organization Add User, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
