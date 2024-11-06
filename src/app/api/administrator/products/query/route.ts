import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { NextRequest } from "next/server";
import productController from "@/src/controller/product.controller";

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Product By Query")
  );

  try {
    return await productController.getAllQuery(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All products Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}
