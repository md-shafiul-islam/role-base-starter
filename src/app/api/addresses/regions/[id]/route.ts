import { getResponseFormatterObj, getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import regionController from "@/src/controller/region.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, ctx: any) {
  let respUnit = getRespFormatte(null, false, esResponseMessage.notFound("Region"));

  try {

    return await regionController.getOne(request, ctx);

  } catch (error) {

    esBackLogger.info("Region router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }

}


export async function DELETE(request: NextRequest, ctx: any) {

  let respUnit = getRespFormatte(null, false, esResponseMessage.removeFailed("Region"));

  try {

    return await regionController.remove(request, ctx);

  } catch (error) {

    esBackLogger.info("Region router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }


}
