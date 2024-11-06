import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import SecificationServices from "@/src/services/specification.services";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class SpecificationController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respSecification = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Secification")
    );

    try {
      respSecification = await SecificationServices.getAll();
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
      esResponseMessage.notFound(`Secification`)
    );

    try {
      esBackLogger.info("Get Secification Context ", ctx);
      respSecification = await SecificationServices.getOne(ctx.params?.id);
    } catch (error) {
      esBackLogger.info("Secification Controller, Get One Error, ", error);
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

      response = await SecificationServices.add(reqSecification);
    } catch (error) {
      esBackLogger.info("CN Add Secification Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Secification ")
    );
    try {
      const reqSecification = await req.json();

      respUpdate = await SecificationServices.updateOne(reqSecification);
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
      esResponseMessage.removeFailed("Secification ")
    );

    try {
      console.log("Remove Spc ", req);
      console.log("Remove ctx ", ctx);

      const refererUrl = new URL(req.headers.get("referer"));
      const pathVar = refererUrl.pathname.split("/");
      const deleteQuery = { id: "", product: "" };
      if (pathVar.length > 0) {
        deleteQuery.product = pathVar[pathVar.length - 1];
      }
      const { params } = ctx;

      deleteQuery.id = params.id;

      removeSecification = await SecificationServices.remove(deleteQuery);
    } catch (error) {
      esBackLogger.info("RemoveSecification CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeSecification);
    }
  };
}

const specificationController = new SpecificationController();
export default specificationController;
