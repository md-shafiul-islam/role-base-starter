
import { getResponseFormatterObj, getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import specificationController from "@/src/controller/specification.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from "next/server";



export async function GET(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.notFoundAll("Specifications"));
  try {

    return specificationController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Specification Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}



export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.addFailed("Specifications"));
  try {

    return specificationController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Specification Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}



export async function PUT(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(null, false, esResponseMessage.updateFailed("Specifications"));
  try {

    return specificationController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Specification Response Error, ", error);
    return getResponseFormatterObj(response);
  }


}
