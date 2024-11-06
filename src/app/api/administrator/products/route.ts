import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { NextRequest } from "next/server";
import productController from "@/src/controller/product.controller";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Product")
  );

  try {
    return await productController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All products Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Product")
  );

  try {
    return await productController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All products Response Error, ", error);
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let message = esResponseMessage.addFailed("Product"),
    response = null,
    status = false;

  try {
    return await productController.add(request, ctx);
  } catch (error) {
    //esBackLogger.info("Error Product add Error , ", error);
    return getResponseFormatter(response, status, message);
  }
}
