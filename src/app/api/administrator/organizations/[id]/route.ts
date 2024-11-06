import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import organizationController from "@/src/controller/organization.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let respOrganization = getRespFormatte(
    null,
    false,
    esResponseMessage.notFound("Organization")
  );

  try {
    return await organizationController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Brand One router Resp Error ", error);
    return getResponseFormatterObj(respOrganization);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let respOrganization = getRespFormatte(
    null,
    false,
    esResponseMessage.toogleStatusFailed("Organization verified")
  );

  try {
    console.log("verified Req !!");
    return await organizationController.verified(request, ctx);
  } catch (error) {
    esBackLogger.info("Brand One router Resp Error ", error);
    return getResponseFormatterObj(respOrganization);
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  let respOrganization = getRespFormatte(
    null,
    false,
    esResponseMessage.toogleStatusFailed("Organization Active toggle")
  );

  try {
    console.log("toggleActive Req !!");

    return await organizationController.toggleActive(request, ctx);
  } catch (error) {
    esBackLogger.info("Brand One router Resp Error ", error);
    return getResponseFormatterObj(respOrganization);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let respOrganization = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Organization")
  );

  try {
    return await organizationController.remove(request, ctx);
  } catch (error) {
    esBackLogger.info("Brand router Resp Error ", error);
    return getResponseFormatterObj(respOrganization);
  }
}
