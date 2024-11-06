import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import brandController from "@/src/controller/brand.controller";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

export async function GET(request, ctx) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.foundAll("Brand")
  );

  try {
    const session = await auth();

    return brandController.getAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get All Brand Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request, ctx) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Brand")
  );

  try {
    const session = await auth();

    return brandController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Update Brand Response Error, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}

export async function POST(request, ctx) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.addFailed("Brand")
  );

  try {
    return brandController.add(request, ctx);
  } catch (error) {
    esBackLogger.info("Error Brand Add, ", error);
    response.message = error.message;
    return getResponseFormatterObj(response);
  }
}
