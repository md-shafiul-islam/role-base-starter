import {
  getResponseFormatterObj,
  getRespFormatte,
} from "@/src/app/components/utils/router/responseAction";
import regionController from "@/src/controller/region.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Region")
  );
  try {
    return regionController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Region Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Region")
  );
  try {
    return regionController.add(request, ctx);
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
    esResponseMessage.updateFailed("Region")
  );
  try {
    return regionController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get City Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}
