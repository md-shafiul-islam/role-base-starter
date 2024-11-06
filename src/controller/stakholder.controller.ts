import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import stakholderServices from "@/src/services/stakholder.services";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class StakholderController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Stakholder")
    );

    try {
      respStakholder = await stakholderServices.getAll();
    } catch (error) {
      esBackLogger.info("Stakholder Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respStakholder);
    }
  };

  getByQuery = async (request: NextRequest, ctx: any) => {
    let respStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Stakholder Query`)
    );

    try {
      const query = await request.json();

      respStakholder = await stakholderServices.getByQuery(query);
    } catch (error) {
      esBackLogger.info("Stakeholder Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respStakholder);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Stakholder`)
    );

    try {
      esBackLogger.info("Get Stakeholder Context ", ctx);
      respStakholder = await stakholderServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Stakeholder Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respStakholder);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Stakholder"));

    try {
      const reqStakholder = await req.json();

      response = await stakholderServices.add(reqStakholder);
    } catch (error) {
      esBackLogger.info("CN Add Stakholder Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  createViaUser = async (request: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Stakholder"));

    try {
      const { id } = await request.json();

      response = await stakholderServices.addUsingUser(id);
    } catch (error) {
      esBackLogger.info("User Add Stakholder Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  addTypeToStakeholder = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(
      esResponseMessage.addFailed("Add Stakholder Type ")
    );

    try {
      const reqStakholderType = await req.json();

      response = await stakholderServices.addTypeToStake(reqStakholderType);
    } catch (error) {
      esBackLogger.info("CN Add Stakholder Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Stakholder ")
    );
    try {
      const reqStakeholder = await req.json();

      respUpdate = await stakholderServices.updateOne(reqStakeholder);
    } catch (error) {
      esBackLogger.info("Stakholder Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Stakholder")
    );

    try {
      removeStakholder = await stakholderServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveStakholder CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeStakholder);
    }
  };

  //Stakeholder Types Key Start

  getAllType = async (req: NextRequest, ctx: any) => {
    let respStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Stakholder Type")
    );

    try {
      respStakholder = await stakholderServices.getAllType();
    } catch (error) {
      esBackLogger.info("Stakholder Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respStakholder);
    }
  };

  getOneType = async (req: NextRequest, ctx: any) => {
    let respStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Stakholder Type`)
    );

    try {
      esBackLogger.info("Get Stakeholder Context ", ctx);
      respStakholder = await stakholderServices.getOneType({
        id: ctx.params?.id,
      });
    } catch (error) {
      esBackLogger.info("Stakeholder Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respStakholder);
    }
  };

  addType = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("Stakholder Type")
    );

    try {
      const reqStakholderType = await req.json();

      response = await stakholderServices.addType(reqStakholderType);
    } catch (error) {
      esBackLogger.info("Add Stakholder Type Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOneType = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Stakholder Type")
    );
    try {
      const reqStakeholderType = await req.json();

      respUpdate = await stakholderServices.updateOneType(reqStakeholderType);
    } catch (error) {
      esBackLogger.info("Stakholder Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  removeType = async (req: NextRequest, ctx: any) => {
    let removeStakholder = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Stakholder Type")
    );

    try {
      removeStakholder = await stakholderServices.removeType(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("Remove Stakholder Type CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeStakholder);
    }
  };

  //Stakeholder Types Key End
}

const stakholderController = new StakholderController();
export default stakholderController;
