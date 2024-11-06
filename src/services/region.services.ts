import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Region from "@/src/Models/Region";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

import Zone from "@/src/Models/Area";
import City from "@/src/Models/City";
import axios from "axios";
import { REQUEST_HEADER } from "../app/components/utils/types";
import utilServices from "./util.services";

class RegionServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Region`),
      status = false;

    try {
      await dbClient.dbConnect();

      response = await Region.find({})
        .select(["-__v", "-areas"])
        .populate("city", ["-_id", "-__v", "-regions", "-name", "-key"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Region`);
        status = true;
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Region"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Region.findOne(query).select(["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Region");
      }
    } catch (error) {
      esBackLogger.info("Region Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Region");

    try {
      await dbClient.dbConnect();
      response = await Region.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Region");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (regionReq: any) => {
    let addRegion = null,
      status = false,
      msg = esResponseMessage.addFailed("Region");

    try {
      await dbClient.dbConnect();
      const newRegion = new Region();
      const { city, region } = regionReq;

      const dbCity = await City.findOne({ id: city });

      Object.assign(newRegion, region);
      newRegion.city = dbCity;

      const id = await this.getUniqId();
      newRegion.id = id;

      addRegion = await newRegion.save();

      if (!isEmptyOrNull(addRegion)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Region");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uRegion: any) => {
    let regionUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Region");
    try {
      await dbClient.dbConnect();
      const { id, slug, key, ...region } = uRegion;

      regionUpdate = await Region.updateOne({ id }, { $set: region });

      if (!isEmptyOrNull(regionUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Region");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uRegions: any[]) => {
    let updateRegion = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Region Failed Error, ", error);
    } finally {
      return updateRegion;
    }
  };

  remove = async (id: any) => {
    let removeRegion = null,
      status = true,
      msg = esResponseMessage.removeFailed("Region");
    try {
      await dbClient.dbConnect();

      const dbRegion = await Zone.findOne({ id }).populate("zone");

      if (!isEmptyOrNull(dbRegion.zones)) {
        throw new Error("Region has Zone, You can only remove parent Region");
      }
      const { _id } = dbRegion;
      removeRegion = await Region.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeRegion)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Region Delete Failed Error, ", error);
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let region = null,
      status = false,
      msg = esResponseMessage.found("Region");

    try {
      await dbClient.dbConnect();
      region = await Region.findOne({ id: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(region, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let region = null;

    try {
      await dbClient.dbConnect();
      region = await Region.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region getOneByPublicId Error ", error);
    } finally {
      return region;
    }
  };

  getOneByKeyPlane = async (key: null) => {
    let region = null;

    try {
      await dbClient.dbConnect();
      region = await Region.findOne({ key });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Region getOneByPublicId Error ", error);
    } finally {
      return region;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const region = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(region)) {
      return this.getUniqId();
    }

    return id;
  };

  loadAllRegion = async () => {
    const respAllRegion = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Region")
    );
    try {
      REQUEST_HEADER.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEzMmZiZDE1ZmEzNmM4YmNjZTE5Y2VlNmM0Y2IyMDEwMGE1ZWRmOTUwM2IxNGM4MTI1OGNjODU0ZDJkNmU0NGFkNWYwNzA3NTQ3NzJiMWRlIn0.eyJhdWQiOiIyNjciLCJqdGkiOiIxMzJmYmQxNWZhMzZjOGJjY2UxOWNlZTZjNGNiMjAxMDBhNWVkZjk1MDNiMTRjODEyNThjYzg1NGQyZDZlNDRhZDVmMDcwNzU0NzcyYjFkZSIsImlhdCI6MTcwOTgxMDYyMywibmJmIjoxNzA5ODEwNjIzLCJleHAiOjE3MTAyNDI2MjIsInN1YiI6IjM1MiIsInNjb3BlcyI6W119.s-hOKWypqsQwrKetsW8nOq6OdIsZXy1xuaTdGJ9cfDcUg3lZNtz2OOIo54p2TXjKH1pkqjY9Nfqn0qwFEGcpiWi26QQPsjPiVlVvQrV6CjYxwJdI5gbi5WGD2zaUA7zvGsUM6IEIfizlFPGZFVvW1mUB4wyxQtu6k8L9s_zgG5Jryu_4TzO9LTagewdfMB1gtWbEGAsdrfZvKQ3tm7rG7p6JgmmSkWSwjPX5-sJja-BgJCwd84g3e-y99yZDLlMxILYYk8r3Soc8ZBjSX5ykeBqYmiGNVjp8DBu6TQxlko1MvUPHrx1UJI7bo7ox8nPrGQ4wj1ahf7g2ZIx58lPKX2R5i_iUzxWXYBd8Aa36gMOI8sP3lil3uMqUOj6ay6JxkuOT_uLNeiCwhmWDdfufedg898W-tVh2M4wx94gqZw7HX-roDrX7FBIScIe9mmjVWNx-qVTxOuWw8pf_mAKe-ZEy2mpWQ9uFYl3xzrMnXOCqgBhhF2X0DaiS4us8RoI0DixB5U4pzbuKMbX-tLeYrVum3d4d_VlVC4Cyah4nMMZ-wNe3irWW5cyt86XFUwj9hZ9hzaAoBocaTQNkPK1cUMjh9akO_ZvT5FBa9oIGIfU2ISbjOVFTGuoOwzrdU9rxE2OP23iL-hKZQ6JAz2qrLLM5-zLNAu6vmmiLvS6VsjM`;
      const cities = await City.find({});
      const regions = [];
      const regionsQuery = [];
      let count = 0;
      for (const city of cities) {
        const respZones = await axios.get(
          `https://courier-api-sandbox.pathao.com/aladdin/api/v1/cities/${city.code}/zone-list`,
          { headers: REQUEST_HEADER }
        );
        console.log("City count, ", count);
        console.log("respZones, Size ", respZones.data.data.data.length);
        for (const zone of respZones.data.data.data) {
          console.log("Zone count, ", count);

          const regionQuery = new Region();

          regionQuery.name = zone.zone_name;
          regionQuery.key = utilServices.lowReplaceAll(zone.zone_name, " ");
          regionQuery.code = zone.zone_id;
          regionQuery.city = city;

          const addRegion = await regionQuery.save();
          regionsQuery.push(addRegion);

          regions.push(zone);
          count++;
        }
      }

      respAllRegion.response = { regions, regionsQuery };
      respAllRegion.status = true;
      respAllRegion.message = esResponseMessage.foundAll(
        regions.length,
        "Regions"
      );
    } catch (error) {
      console.log("LOad Regions ", error);
    } finally {
      return respAllRegion;
    }
  };
}

const regionServices = new RegionServices();

export default regionServices;
