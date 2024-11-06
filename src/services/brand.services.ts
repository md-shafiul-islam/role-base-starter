import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Brand from "@/src/Models/Brand";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class BrandServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Brand`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Brand.find({}).select("-_id");
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Brand`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Brand Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Brand"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Brand.findOne(query).select([
        "-_id",
        "-__v",
        "-createdAt",
        "-updatedAt",
      ]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Brand");
      }
    } catch (error) {
      esBackLogger.info("Brand Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Brand");

    try {
      await dbClient.dbConnect();
      response = await Brand.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Brand");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (brand: any) => {
    let addBrand = null,
      status = false,
      msg = esResponseMessage.addFailed("Brand");

    try {
      await dbClient.dbConnect();
      const newBrand = new Brand();
      Object.assign(newBrand, brand);
      const id = await this.getUniqId();
      if (id) {
        newBrand.id = id;
      }

      addBrand = await newBrand.save();

      if (!isEmptyOrNull(addBrand)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Brand");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Brand Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uBrand: any) => {
    let brandUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Brand");
    try {
      await dbClient.dbConnect();
      const { id, ...brand } = uBrand;
      brandUpdate = await Brand.updateOne({ id }, { $set: brand });

      if (!isEmptyOrNull(brandUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Brand");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Brand Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uBrands: any[]) => {
    let updateBrand = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Brand Failed Error, ", error);
    } finally {
      return updateBrand;
    }
  };

  remove = async (id: any) => {
    let removeBrand = null,
      status = true,
      msg = esResponseMessage.removeFailed("Brand");
    try {
      await dbClient.dbConnect();
      removeBrand = await Brand.deleteOne({ id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeBrand)) {
        status = true;
        msg = esResponseMessage.removeSuccessfully("Brand");
      }
    } catch (error) {
      esBackLogger.info("Brand Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let brand = null,
      status = false,
      msg = esResponseMessage.found("Brand");

    try {
      await dbClient.dbConnect();
      brand = await Brand.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Brand getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(brand, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let brand = null;

    try {
      await dbClient.dbConnect();
      brand = await Brand.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Brand getOneByPublicId Error ", error);
    } finally {
      return brand;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const brand = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(brand)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const brandServices = new BrandServices();

export default brandServices;
