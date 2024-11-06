import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import specificationKeyController from "@/src/controller/spckey.controller";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(
    null,
    false,
    esResponseMessage.notFound("Specification Key")
  );

  try {
    return await specificationKeyController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Specification Key One router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Specification Key")
  );

  try {
    return await specificationKeyController.remove(request, ctx);
  } catch (error) {
    esBackLogger.info("Specification Key router Resp Error ", error);
    return getResponseFormatterObj(respUnit);
  }
}
