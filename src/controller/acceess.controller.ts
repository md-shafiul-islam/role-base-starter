import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import accessServices from "@/src/services/access.services";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class AccessController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respAccesss = getRespFormatte(
      null,
      true,
      esResponseMessage.notFoundAll("Access")
    );

    try {
      esBackLogger.info("Get All User Context ", ctx);
      respAccesss = await accessServices.getAll();
    } catch (error) {
      esBackLogger.info("User Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respAccesss);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respAccess = getRespFormatte(
      null,
      true,
      esResponseMessage.notFound("Access")
    );

    try {
      esBackLogger.info("Get Access Context ", ctx);
      respAccess = await accessServices.getOne({ publicId: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Access Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respAccess);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let respAccess = getRespFormatte(
      null,
      true,
      esResponseMessage.notFound("Access")
    );

    try {
      const reqAccess = await req.json();

      if (!isEmptyOrNull(reqAccess)) {
        respAccess = await accessServices.add(reqAccess);
      }
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
    } finally {
      return getResponseFormatterObj(respAccess);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Access")
    );

    try {
      const reqAccess = await req.json();

      respUpdate = await accessServices.updateOne(reqAccess);
    } catch (error) {
      esBackLogger.info("Access Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  updateAll = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Access")
    );

    try {
      const reqAccess = await req.json();

      respUpdate = await accessServices.updateAll(reqAccess);
    } catch (error) {
      esBackLogger.info("Access Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  updateOneViaRole = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Role Access")
    );

    try {
      const reqAccess = await request.json();

      respUpdate = await accessServices.updateOneViaRole(reqAccess);
    } catch (error) {
      esBackLogger.info("Access Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let respRemove = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Access")
    );

    try {
      const reqAccess = await req.json();
      respRemove = await accessServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("Access Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respRemove);
    }
  };
}

const accessController = new AccessController();

export default accessController;
