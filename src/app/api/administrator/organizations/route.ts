import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import organizationController from "@/src/controller/organization.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Organization")
  );

  try {
    const session = await auth();

    return organizationController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All Organization Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Organization")
  );

  try {
    const session = await auth();

    return organizationController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Update Organization Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Organization")
  );

  try {
    return organizationController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Organization Add, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
