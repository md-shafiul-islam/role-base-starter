import { getResponseFormatterObj, getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import zoneController from "@/src/controller/zone.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(null, false, esResponseMessage.notFound("Zone"));

  try {

    return await zoneController.getOne(request, ctx);

  } catch (error) {

    esBackLogger.info("Zone router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }

}


export async function DELETE(request: NextRequest, ctx: any) {

  let respUnit = getRespFormatte(null, false, esResponseMessage.removeFailed("Zone"));

  try {

    return await zoneController.remove(request, ctx);

  } catch (error) {

    esBackLogger.info("Zone router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }


}
