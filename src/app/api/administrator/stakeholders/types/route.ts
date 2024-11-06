import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import stakholderController from "@/src/controller/stakholder.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Stakeholder Key")
  );

  try {
    const session = await auth();
    
    return stakholderController.getAllType(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All Stakeholder Key Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Stakeholder Key")
  );

  try {
    const session = await auth();

    return stakholderController.updateOneType(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Update Stakeholder Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Stakeholder Key")
  );

  try {
    return stakholderController.addType(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Stakeholder Key Add, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
