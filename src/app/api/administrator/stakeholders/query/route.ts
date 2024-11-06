import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";

import stakholderController from "@/src/controller/stakholder.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Stakeholder by Query")
  );

  try {
    return stakholderController.getByQuery(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Stakeholder Query, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
