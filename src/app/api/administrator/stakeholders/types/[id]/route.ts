import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import specificationKeyController from "@/src/controller/spckey.controller";
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
    esBackLogger.info("Stake Type By ID")
    return await stakholderController.getOneType(request, ctx);
  } catch (error) {
    esBackLogger.info("Stakeholder One router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Stakeholder Key")
  );

  try {
    return await stakholderController.removeType(request, ctx);
  } catch (error) {
    esBackLogger.info("Stakeholder Key router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}
