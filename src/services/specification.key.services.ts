import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import SpecKey from "@/src/Models/SpecKey";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class SpecificationKeyServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Specification Key`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await SpecKey.find({}).select("-__v");
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Specification Key`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Specification Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Specification"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await SpecKey.findOne(query).select(["-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Specification Key");
      }
    } catch (error) {
      esBackLogger.info("Specification Key Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Specification Key");

    try {
      await dbClient.dbConnect();
      response = await SpecKey.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Specification Key");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("SpecKey Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (specKey: any) => {
    let addSpecKey = null,
      status = false,
      msg = esResponseMessage.addFailed("Specification");

    try {
      await dbClient.dbConnect();
      const newSpecKey = new SpecKey();
      Object.assign(newSpecKey, specKey);
      const id = await this.getUniqId();
      newSpecKey.id = id;

      addSpecKey = await newSpecKey.save();

      if (!isEmptyOrNull(addSpecKey)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Specification Key");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("SpecKey Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uSpecKey: any) => {
    let specKeyUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("SpecKey Key");
    try {
      await dbClient.dbConnect();
      const { id, ...specKey } = uSpecKey;
      specKeyUpdate = await SpecKey.updateOne({ id }, { $set: specKey });

      if (!isEmptyOrNull(specKeyUpdate)) {
        status = true;
        msg = esResponseMessage.updated("SpecKey Key");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("SpecKey Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uSpecKey: any[]) => {
    let updateSpecKey = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Specification Failed Error, ", error);
    } finally {
      return updateSpecKey;
    }
  };

  remove = async (id: any) => {
    let removeSpecKey = null,
      status = true,
      msg = esResponseMessage.removeFailed("Specification Key");
    try {
      await dbClient.dbConnect();
      removeSpecKey = await SpecKey.deleteOne({ id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeSpecKey)) {
        status = true;
        msg = esResponseMessage.removeSuccessfully("Specification Key");
      }
    } catch (error) {
      esBackLogger.info("SpecKey Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let specKey = null,
      status = false,
      msg = esResponseMessage.found("SpecKey");

    try {
      await dbClient.dbConnect();
      specKey = await SpecKey.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("SpecKey getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(specKey, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let specKey = null;

    try {
      await dbClient.dbConnect();
      specKey = await SpecKey.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("SpecKey getOneByPublicId Error ", error);
    } finally {
      return specKey;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const specKey = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(specKey)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const specificationKeyServices = new SpecificationKeyServices();

export default specificationKeyServices;
