import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import regionServices from "@/src/services/region.services";

class RegionController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respRegion = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Region")
    );

    try {
      respRegion = await regionServices.getAll();
    } catch (error) {
      esBackLogger.info("Region Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respRegion);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let regionResp = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Region`)
    );

    try {
      esBackLogger.info("Get Region Context ", ctx);
      regionResp = await regionServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Region Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(regionResp);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Region "));

    try {
      const reqRegion = await req.json();

      response = await regionServices.add(reqRegion);
    } catch (error) {
      esBackLogger.info("CN Add Region Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Region ")
    );
    try {
      const reqRegion = await req.json();

      respUpdate = await regionServices.updateOne(reqRegion);
    } catch (error) {
      esBackLogger.info("Region Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeRegion = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Region ")
    );

    try {
      removeRegion = await regionServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveRegion CN Error ", error);
      removeRegion.status = false;
      removeRegion.message = error.message;
    } finally {
      return getResponseFormatterObj(removeRegion);
    }
  };
}

const regionController = new RegionController();
export default regionController;
