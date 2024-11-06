import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import categoryController from "@/src/controller/category.controller";
import uploadController from "@/src/controller/upload.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let respCat = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Categorries")
  );

  try {
    respCat = await categoryController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Category router Resp Error ", error);
  } finally {
    return getResponseFormatterObj(respCat);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let respCat = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Signatures Image")
  );

  try {
    console.log("Image Upload Request ", request);

    return await uploadController.uploadImageByPathName(request, ctx, "signatures");
  } catch (error) {
    esBackLogger.info("Signatures Image Upload  router Resp Error ", error);
    return getResponseFormatterObj(respCat);
  }
}

export async function DELETE(request: NextRequest, ctx: any) {
  let respCat = getRespFormatte(
    null,
    false,
    esResponseMessage.notFoundAll("Categorries")
  );

  try {
    return await uploadController.remove(request, ctx);
  } catch (error) {
    esBackLogger.info("Category router Resp Error ", error);
    return getResponseFormatterObj(respCat);
  }
}
