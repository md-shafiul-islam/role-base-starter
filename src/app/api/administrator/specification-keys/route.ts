import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import specificationKeyController from "@/src/controller/spckey.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Specification Key")
  );

  try {
    const session = await auth();

    return specificationKeyController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All Brand Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Brand")
  );

  try {
    const session = await auth();

    return specificationKeyController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Update Brand Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Brand")
  );

  try {
    return specificationKeyController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Brand Add, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
