import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import secificationKeyServices from "@/src/services/specification.key.services";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class SpecificationKeyController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respSecification = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Secification")
    );

    try {
      respSecification = await secificationKeyServices.getAll();
    } catch (error) {
      esBackLogger.info("Secification Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respSecification);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respSecification = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Secification Key`)
    );

    try {
      esBackLogger.info("Get Secification Key Context ", ctx);
      respSecification = await secificationKeyServices.getOne({
        id: ctx.params?.id,
      });
    } catch (error) {
      esBackLogger.info("Secification Key Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respSecification);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(
      esResponseMessage.addFailed("Secification ")
    );

    try {
      const reqSecification = await req.json();

      response = await secificationKeyServices.add(reqSecification);
    } catch (error) {
      esBackLogger.info("CN Add Secification Key Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Secification Key")
    );
    try {
      const reqSecificationKey = await req.json();

      respUpdate = await secificationKeyServices.updateOne(reqSecificationKey);
    } catch (error) {
      esBackLogger.info("Secification Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeSecification = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Secification Key")
    );

    try {
      removeSecification = await secificationKeyServices.remove(
        ctx?.params?.id
      );
    } catch (error) {
      esBackLogger.info("RemoveSecification CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeSecification);
    }
  };
}

const specificationKeyController = new SpecificationKeyController();
export default specificationKeyController;
