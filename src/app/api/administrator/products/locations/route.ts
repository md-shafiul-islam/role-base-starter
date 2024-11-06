import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";

import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { NextRequest } from "next/server";
import productController from "@/src/controller/product.controller";

export async function PUT(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Product Location")
  );

  try {
    return await productController.updateOneProductLocation(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All products Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let message = esResponseMessage.addFailed("Product Location"),
    response = null,
    status = false;

  try {
    return await productController.addProductLocation(request, ctx);
  } catch (error) {
    //esBackLogger.info("Error Product add Error , ", error);
    return getResponseFormatter(response, status, message);
  }
}


export async function DELETE(request: NextRequest, ctx: any) {
  let message = esResponseMessage.removeFailed("Product Location"),
    response = null,
    status = false;

  try {
    return await productController.removeProductLocation(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Product Remove location Error , ", error);
    return getResponseFormatter(response, status, message);
  }
}
