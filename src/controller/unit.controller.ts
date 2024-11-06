import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import unitServices from "@/src/services/unit.services";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class UnitController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respUnit = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Unit")
    );

    try {
      const { searchParams } = new URL(req.url);
      esBackLogger.info("Get All Unit ", searchParams);

      respUnit = await unitServices.getAll(searchParams.get("type"));
    } catch (error) {
      esBackLogger.info("Unit Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respUnit);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respUnit = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Unit`)
    );

    try {
      respUnit = await unitServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Unit Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respUnit);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Unit "));

    try {
      const reqUnit = await req.json();

      response = await unitServices.add(reqUnit);
    } catch (error) {
      esBackLogger.info("CN Add Unit Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Unit ")
    );
    try {
      const reqUnit = await req.json();

      respUpdate = await unitServices.updateOne(reqUnit);
    } catch (error) {
      esBackLogger.info("Unit Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeUnit = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Unit ")
    );

    try {
      removeUnit = await unitServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveUnit CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeUnit);
    }
  };
}

const unitController = new UnitController();

export default unitController;
