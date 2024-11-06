import roleController from "@/src/controller/role.controller";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";

import authConfig from "@/src/auth.config";
import NextAuth from "next-auth";
import userController from "@/src/controller/user.controller";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import accessController from "@/src/controller/acceess.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { NextRequest } from "next/server";

export const { auth } = NextAuth(authConfig);
export async function GET(request: NextRequest, ctx: any) {
  try {
    const session = await auth();
    const userId = !isEmptyOrNull(session?.user?.id)
      ? session?.user?.id
      : "019271dc-6b5c-7553-b669-6714bbb50a70";
    return await userController.getUserRoleAccess(userId);
  } catch (error) {
    esBackLogger.info("Get Users Response Error, ", error);
    return getResponseFormatterObj();
  }
}

export async function POST(request: NextRequest, ctx: any) {
  // const session = await auth();

  let roleAddAccess = getRespFormatte();
  try {
    roleAddAccess = await roleController.addRoleAccess(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatterObj(roleAddAccess);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  const session = await auth();

  let accessUpdate = getResponseFormatterObj();

  try {
    return accessController.updateAll(request, ctx);
  } catch (error) {
    esBackLogger.info("Get Products Response Error, ", error);
    return accessUpdate;
  }
}

export async function PATCH(request: NextRequest, ctx: any) {
  // const session = await auth();
  let responseAccess = getRespFormatte(
    null,
    false,
    esResponseMessage.updateFailed("Role Access")
  );

  try {
    
  } catch (error) {
    esBackLogger.info("Get Products Response Error, ", error);
    return getResponseFormatterObj(responseAccess);
  }
}
