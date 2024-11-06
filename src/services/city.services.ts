import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import City from "@/src/Models/City";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class CityServices {
  getAll = async () => {
    let cityResp = getRespFormatte(
      [],
      false,
      esResponseMessage.notFoundAll(`City`)
    );
    try {
      await dbClient.dbConnect();
      const response = await City.find({}).select(["-__v", "-_id", "-regions"]);
      if (!isEmptyOrNull(response)) {
        cityResp.message = esResponseMessage.foundAll(response.length, `City`);
        cityResp.status = true;
        cityResp.response = response;
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City Not found Error ", error);
      cityResp.status = false;
      cityResp.message = error.message;
    } finally {
      return cityResp;
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("City"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await City.findOne(query).select(["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("City");
      }
    } catch (error) {
      esBackLogger.info("City Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("City");

    try {
      await dbClient.dbConnect();
      response = await City.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("City");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (cityReq: any) => {
    let addCity = null,
      status = false,
      msg = esResponseMessage.addFailed("City");

    try {
      await dbClient.dbConnect();
      const newCity = new City();
      Object.assign(newCity, City);
      const id = await this.getUniqId();
      newCity.id = id;

      addCity = await newCity.save();

      if (!isEmptyOrNull(addCity)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("City");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uCity: any) => {
    let CityUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("City");
    try {
      await dbClient.dbConnect();
      const { id, slug, key, ...City } = uCity;

      CityUpdate = await City.updateOne({ id }, { $set: City });

      if (!isEmptyOrNull(CityUpdate)) {
        status = true;
        msg = esResponseMessage.updated("City");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uCitys: any[]) => {
    let updateCity = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update City Failed Error, ", error);
    } finally {
      return updateCity;
    }
  };

  remove = async (id: any) => {
    let removeCity = null,
      status = true,
      msg = esResponseMessage.removeFailed("City");
    try {
      await dbClient.dbConnect();

      const dbCity = await City.findOne({ id }).populate("regions");

      const dbRegions = await City.find({ parent: dbCity._id });
      if (!isEmptyOrNull(dbRegions)) {
        throw new Error("City has sub City, You can only remove parent City");
      }
      const { _id } = dbCity;
      removeCity = await City.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeCity)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("City Delete Failed Error, ", error);
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let City = null,
      status = false,
      msg = esResponseMessage.found("City");

    try {
      await dbClient.dbConnect();
      City = await City.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(City, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let city = null;

    try {
      await dbClient.dbConnect();
      city = await city.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("City getOneByPublicId Error ", error);
    } finally {
      return city;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const city = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(city)) {
      return this.getUniqId();
    }

    return id;
  };
}

const cityServices = new CityServices();

export default cityServices;
