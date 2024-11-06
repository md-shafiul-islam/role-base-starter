import { getResponseFormatterObj } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import accessController from "@/src/controller/acceess.controller";
import roleController from "@/src/controller/role.controller";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  // const session = await auth();
  try {
    return await roleController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get One User Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  try {
    return await accessController.updateOneViaRole(request, ctx);
  } catch (error) {
    esBackLogger.info("PUT Role Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  try {
    return await roleController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("PATCH Patch Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  try {
    return await roleController.remove(request, ctx);
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
    return getResponseFormatterObj();
  }
}
