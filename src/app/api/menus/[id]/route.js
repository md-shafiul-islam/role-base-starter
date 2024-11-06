import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import roleController from "@/src/controller/role.controller";


export async function GET(request, ctx) {
  // const session = await auth();



  try {

    return await roleController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Get One User Response Error, ", error);
  } finally {
    return getResponseFormatter(null, false);

  }

}


export async function PUT(request, ctx) {
  // const session = await auth();
  try {

    return await roleController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("PUT Role Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }

}

export async function PATCH(request, ctx) {

  try {
    return await roleController.updateOne(request, ctx);
  } catch (error) {
    esBackLogger.info("PATCH Patch Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }

}

export async function DELETE(request, ctx) {
 

  try {
    return await roleController.remove(request, ctx);
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }

}



