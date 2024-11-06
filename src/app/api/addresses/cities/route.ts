import {
  getResponseFormatterObj,
  getRespFormatte,
} from "@/src/app/components/utils/router/responseAction";
import cityController from "@/src/controller/city.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("City")
  );
  try {
    return await cityController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Citys")
  );
  try {
    return cityController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Citys")
  );
  try {
    return cityController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}
