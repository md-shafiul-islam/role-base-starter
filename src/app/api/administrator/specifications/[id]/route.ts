import { getResponseFormatterObj, getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import specificationController from "@/src/controller/specification.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(null, false, esResponseMessage.notFound("Specification"));

  try {

    return await specificationController.getOne(request, ctx);

  } catch (error) {

    esBackLogger.info("Specification router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }

}


export async function DELETE(request: NextRequest, ctx: any) {

  let respUnit = getRespFormatte(null, false, esResponseMessage.removeFailed("Specification"));

  try {

    return await specificationController.remove(request, ctx);

  } catch (error) {

    esBackLogger.info("Specification router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }


}
