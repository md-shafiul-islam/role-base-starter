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
    esResponseMessage.notFound("Organization Products")
  );

  try {
    return await organizationController.getAllProduct(request, ctx);
  } catch (error) {
    esBackLogger.info("Brand One router Resp Error ", error);
    return getResponseFormatterObj(respOrganization);
  }
}
