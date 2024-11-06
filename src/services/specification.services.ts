import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Specification from "@/src/Models/Specification";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import Product from "../Models/Product";
import SpecKey from "../Models/SpecKey";

class SpecificationServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Specification`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Specification.find({}).select("-__v");
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Specification`);
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
      response = await Specification.findOne(query);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Specification");
      }
    } catch (error) {
      esBackLogger.info("Specification Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Specification");

    try {
      await dbClient.dbConnect();
      response = await Specification.findById(id).select(["-__v"]);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Specification");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (specification: any) => {
    let addSpecification = null,
      status = false,
      msg = esResponseMessage.addFailed("Specification");
    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();

      const { product, spsKey } = specification;

      const newSpecification = new Specification();
      Object.assign(newSpecification, specification);

      const dbSpcKey = await SpecKey.findOne({ _id: spsKey });

      newSpecification.spsKey = dbSpcKey;
      newSpecification.name = dbSpcKey.name;

      addSpecification = await newSpecification.save();

      const dbProduct = await Product.findOne({ id: product }).populate(
        "specifications"
      );

      let { _id, specifications } = dbProduct;

      if (Array.isArray(specifications)) {
        specifications.push(newSpecification);
      } else {
        specifications = [newSpecification];
      }

      esBackLogger.info("Addd specifications via product ", specifications);
      const updateProdcut = await Product.updateOne(
        { _id },
        { $set: { specifications } }
      );

      if (!isEmptyOrNull(updateProdcut)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Product Specification");
      }

      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Product Specification Added Failed Error, ", error);

      status = false;
      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uSpecification: any) => {
    let specificationUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Specification");
    try {
      await dbClient.dbConnect();
      const { _id, ...specification } = uSpecification;
      specificationUpdate = await Specification.updateOne(
        { _id },
        { $set: specification }
      );

      if (!isEmptyOrNull(specificationUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Specification");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Specification Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uSpecifications: any[]) => {
    let updateSpecification = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Specification Failed Error, ", error);
    } finally {
      return updateSpecification;
    }
  };

  remove = async (query: any) => {
    let removeSpecification = null,
      status = false,
      msg = esResponseMessage.removeFailed("Specification");
    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();

      const { id, product } = query;

      esBackLogger.info("")
      const dbSpecification = await Specification.findOne({ _id: id });

      console.log("dbSpecification, ", dbSpecification);
      const dbProduct = await Product.findOne({ id: product }).populate(
        "specifications"
      );

      console.log("DB Product ", dbProduct);
      let { _id } = dbProduct;

      const specifications = [];

      for (const specification of dbProduct.specifications) {
        if (specification._id !== dbSpecification._id) {
          specifications.push(specification);
        }
      }

      console.log("Remove A specifications, ", specifications);
      const updateProdcut = await Product.updateOne(
        { _id },
        { $set: { specifications } }
      );

      if (!isEmptyOrNull(updateProdcut)) {
        const remove = await Specification.deleteOne({ _id: id });

        if (!isEmptyOrNull(remove)) {
          status = true;
          msg = esResponseMessage.addSuccessfully("Product Specification");
        }
      }

      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Product Specification Remove Failed Error, ", error);

      status = false;
      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let specification = null,
      status = false,
      msg = esResponseMessage.found("Specification");

    try {
      await dbClient.dbConnect();
      specification = await Specification.findOne({ _id: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Specification getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(specification, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let specification = null;

    try {
      await dbClient.dbConnect();
      specification = await Specification.findOne({ _id: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Specification getOneByPublicId Error ", error);
    } finally {
      return specification;
    }
  };
}

const specificationServices = new SpecificationServices();

export default specificationServices;
