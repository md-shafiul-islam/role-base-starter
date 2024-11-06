import { getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';

import menuController from "@/src/controller/menu.controller";

export async function GET(request, ctx) {

  try {

    return await menuController.getAll(request, ctx);

  } catch (error) {
    esBackLogger.info("Get Menus Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function POST(request, ctx) {


  try {
    return await menuController.add(request, ctx);

  } catch (error) {
    esBackLogger.info("Get Menu Response Error, ", error);
    return getResponseFormatterObj();
  }
}


export async function PUT(request, ctx) {

  // const session = await auth();
  try {
    return await menuController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("PUT Menu Update Response Error, ", error);
  } finally {
    return getResponseFormatterObj();
  }

}

export async function PATCH(request, ctx) {
  // const session = await auth();
  try {
    return await menuController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("PATCH Menu Response Error, ", error);
  } finally {
    return getResponseFormatterObj();
  }

}

