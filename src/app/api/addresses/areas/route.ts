
import { getResponseFormatterObj, getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import regionController from "@/src/controller/region.controller";
import zoneController from "@/src/controller/zone.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from "next/server";



export async function GET(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.notFoundAll("City"));
  try {

    return zoneController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}



export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.addFailed("Zone"));
  try {

    return zoneController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}



export async function PUT(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.updateFailed("Zone"));
  try {

    return zoneController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}
