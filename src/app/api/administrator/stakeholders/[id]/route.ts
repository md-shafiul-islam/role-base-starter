import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import stakholderController from "@/src/controller/stakholder.controller";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(
    null,
    false,
    esResponseMessage.notFound("Stakeholder Key")
  );

  try {
    return await stakholderController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Stakeholder One router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(
    null,
    false,
    esResponseMessage.removeFailed("Stakeholder")
  );

  try {
    return await stakholderController.remove(request, ctx);
  } catch (error) {
    esBackLogger.info("Stakeholder Key router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}
