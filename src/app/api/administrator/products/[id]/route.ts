import axios from "axios";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";

import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";
import { NextRequest } from "next/server";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import productController from "@/src/controller/product.controller";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

const actionUrl = `${process.env.API_BASE_LINK}`;

export async function GET(request: NextRequest, ctx: any) {
  let response = null,
    status = false,
    message = "Product not found";

  try {
    esBackLogger.info("Admin Product ctx Id ", ctx.params.id);

    return await productController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get product Response Error, ", error);
    return getResponseFormatter(response, status, message);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  let response = null,
    status = false,
    message = esResponseMessage.toogleStatusFailed("Product");

  try {
    return await productController.activeToggle(request, ctx);
  } catch (error) {
    esBackLogger.info("Get product Response Error, ", error);
    return getResponseFormatter(response, status, message);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let message = esResponseMessage.removeFailed("Product"),
    status = false;

  try {
    return await productController.remove(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Product Remove , ", error);
    message = error.message;
    return getResponseFormatter(null, status, message);
  }
}
