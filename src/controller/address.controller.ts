import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import addressServices from "@/src/services/address.services";

class AddressController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respAddress = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Address")
    );

    try {
      respAddress = await addressServices.getAll();
    } catch (error) {
      esBackLogger.info("Address Controller, Get All Error, ", error);
    } finally {
      return respAddress;
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let AddressResp = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Address`)
    );

    try {
      esBackLogger.info("Get Address Context ", ctx);
      AddressResp = await addressServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Address Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(AddressResp);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Address "));

    try {
      const reqAddress = await req.json();

      response = await addressServices.add(reqAddress);
    } catch (error) {
      esBackLogger.info("CN Add Address Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Address ")
    );
    try {
      const reqAddress = await req.json();

      respUpdate = await addressServices.updateOne(reqAddress);
    } catch (error) {
      esBackLogger.info("Address Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeAddress = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Address ")
    );

    try {
      removeAddress = await addressServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveAddress CN Error ", error);
      removeAddress.status = false;
      removeAddress.message = error.message;
    } finally {
      return getResponseFormatterObj(removeAddress);
    }
  };

  //City Start
  addAllCity = async (cities: { city_id: number; city_name: string }[]) => {
    let respCity = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("Address City")
    );

    try {

        respCity = await addressServices.addAllCity(cities);
    } catch (error) {
      esBackLogger.info("Address City ", error);
      respCity.status = false;
      respCity.message = error.message;
    } finally {
      return getResponseFormatterObj(respCity);
    }
  };

  //City End
}

const addressController = new AddressController();
export default addressController;
