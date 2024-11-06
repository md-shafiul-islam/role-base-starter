import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Address from "@/src/Models/Address";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import Zone from "../Models/Area";
import City from "../Models/City";
import utilServices from "./util.services";

class AddressServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Address`),
      status = false;
    try {
      await dbClient.dbConnect();
      const addresses = await Address.find({}).select("-__v");
      if (!isEmptyOrNull(addresses)) {
        msg = esResponseMessage.foundAll(addresses.length, `Address`);
        status = true;
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Address"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Address.findOne(query).select(["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Address");
      }
    } catch (error) {
      esBackLogger.info("Address Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Address");

    try {
      await dbClient.dbConnect();
      response = await Address.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Address");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (addressReq: any) => {
    let addAddress = null,
      status = false,
      msg = esResponseMessage.addFailed("Address");

    try {
      await dbClient.dbConnect();
      const newAddress = new Address();

      let dbZone = await Zone.findOne({ id: addressReq.zone }).populate(
        "region"
      );

      if (isEmptyOrNull(dbZone)) {
      }

      Object.assign(newAddress, addressReq);
      const id = await this.getUniqId();
      newAddress.id = id;

      addAddress = await newAddress.save();

      if (!isEmptyOrNull(addAddress)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Address");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uAddress: any) => {
    let AddressUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Address");
    try {
      await dbClient.dbConnect();
      const { id, slug, key, ...Address } = uAddress;

      AddressUpdate = await Address.updateOne({ id }, { $set: Address });

      if (!isEmptyOrNull(AddressUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Address");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uAddresss: any[]) => {
    let updateAddress = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Address Failed Error, ", error);
    } finally {
      return updateAddress;
    }
  };

  remove = async (id: any) => {
    let removeAddress = null,
      status = true,
      msg = esResponseMessage.removeFailed("Address");
    try {
      await dbClient.dbConnect();

      const dbAddress = await Address.findOne({ id });

      if (isEmptyOrNull(dbAddress)) {
        throw new Error("Address not found, Remove Address failed");
      }
      const { _id } = dbAddress;
      removeAddress = await Address.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeAddress)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Address Delete Failed Error, ", error);
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let address = null,
      status = false,
      msg = esResponseMessage.found("Address");

    try {
      await dbClient.dbConnect();
      address = await Address.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(address, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let address = null;

    try {
      await dbClient.dbConnect();
      address = await Address.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address getOneByPublicId Error ", error);
    } finally {
      return address;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const address = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(address)) {
      return this.getUniqId();
    }
    return id;
  };

  //City Start
  addAllCity = async (cities: { city_id: number; city_name: string }[]) => {
    let cityAddResp = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("Address City")
    );

    try {
      await dbClient.dbConnect();
      const items = [];
      for (const reqCity of cities) {
        const item = new City();
        item.name = reqCity.city_name;
        item.code = reqCity.city_id;
        item.key = utilServices.lowReplaceAll(reqCity.city_name, "_");

        await item.save();

        items.push(item);
      }
      cityAddResp.response = items;
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Address getOneByPublicId Error ", error);
    } finally {
      return cityAddResp;
    }
  };
  //City End
}

const addressServices = new AddressServices();

export default addressServices;
