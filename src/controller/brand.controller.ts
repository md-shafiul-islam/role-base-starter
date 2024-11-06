import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import brandServices from "@/src/services/brand.services";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class BrandController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respBrand = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Brand")
    );

    try {
      respBrand = await brandServices.getAll();
    } catch (error) {
      esBackLogger.info("Brand Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respBrand);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respBrand = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Brand`)
    );

    try {
      esBackLogger.info("Get Brand Context ", ctx);
      respBrand = await brandServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Brand Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respBrand);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Brand "));

    try {
      const reqBrand = await req.json();

      response = await brandServices.add(reqBrand);
    } catch (error) {
      esBackLogger.info("CN Add Brand Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Brand ")
    );
    try {
      const reqBrand = await req.json();

      respUpdate = await brandServices.updateOne(reqBrand);
    } catch (error) {
      esBackLogger.info("Brand Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeBrand = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Brand ")
    );

    try {
      removeBrand = await brandServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveBrand CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeBrand);
    }
  };
}

const brandController = new BrandController();
export default brandController;
