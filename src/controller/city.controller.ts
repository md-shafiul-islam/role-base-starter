import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import cityServices from "@/src/services/city.services";

class CityController {
  
  getAll = async (req: NextRequest, ctx: any) => {
    let respCity = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("City")
    );

    try {
      respCity = await cityServices.getAll();
    } catch (error) {
      esBackLogger.info("City Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respCity);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let cityResp = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`City`)
    );

    try {
      cityResp = await cityServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("City Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(cityResp);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("City "));

    try {
      const reqCity = await req.json();

      response = await cityServices.add(reqCity);
    } catch (error) {
      esBackLogger.info("CN Add City Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("City ")
    );
    try {
      const reqCity = await req.json();

      respUpdate = await cityServices.updateOne(reqCity);
    } catch (error) {
      esBackLogger.info("City Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeCity = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("City ")
    );

    try {
      removeCity = await cityServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveCity CN Error ", error);
      removeCity.status = false;
      removeCity.message = error.message;
    } finally {
      return getResponseFormatterObj(removeCity);
    }
  };
}

const cityController = new CityController();
export default cityController;
