import { type NextRequest } from "next/server";
import roleServices from "@/src/services/role.services";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { isEmptyOrNull } from "../app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class RoleController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respRoles = getRespFormatte(
      null,
      true,
      esResponseMessage.notFoundAll("Role")
    );

    try {
      esBackLogger.info("Get All User Context ", ctx);
      respRoles = await roleServices.getAll();
    } catch (error) {
      esBackLogger.info("User Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respRoles);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respRole = getRespFormatte(
      null,
      true,
      esResponseMessage.notFound("Role")
    );

    try {
      esBackLogger.info("Get Role Context ", ctx);
      respRole = await roleServices.getOne({ publicId: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Role Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respRole);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let respRole = getRespFormatte(
      null,
      true,
      esResponseMessage.notFound("Role")
    );

    try {
      const reqRole = await req.json();

      if (!isEmptyOrNull(reqRole)) {
        respRole = await roleServices.add(reqRole);
      }
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
    } finally {
      return getResponseFormatterObj(respRole);
    }
  };

  addRoleAccess = async (req: NextRequest, ctx: any) => {
    let respRole = getRespFormatte(
      null,
      true,
      esResponseMessage.notFound("Role")
    );

    try {
      const reqRoleAccess = await req.json();

      if (!isEmptyOrNull(reqRoleAccess)) {
        respRole = await roleServices.addRoleAccess(reqRoleAccess);
      }
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
    } finally {
      return respRole;
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Role")
    );

    try {
      const reqRole = await req.json();
      respUpdate = await roleServices.updateOne(reqRole);
    } catch (error) {
      esBackLogger.info("Role Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  updateKey = async (request: NextRequest, ctx: any)=> {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Role Key")
    );

    try {
      const reqRole = await request.json();
      respUpdate = await roleServices.updateKey(reqRole);
    } catch (error) {
      esBackLogger.info("Role Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  }
  remove = async (req: NextRequest, ctx: any) => {
    let respRemove = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Role")
    );

    try {
      const reqRole = await req.json();
      respRemove = await roleServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("Role Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respRemove);
    }
  };
}

const roleController = new RoleController();

export default roleController;
