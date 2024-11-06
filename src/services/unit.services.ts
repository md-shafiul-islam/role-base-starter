import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Unit from "@/src/Models/Unit";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import utilServices from "./util.services";

class UnitServices {
  createNestedUnits(units: any[], parent = null): any[] {
    const unitItems = [];
    let lUnits = [];
    if (!parent) {
      lUnits = units.filter((item) => item.parent === null);
    } else {
      lUnits = units.filter((item) =>
        utilServices.isEqualObjId(item.parent, parent)
      );
    }

    for (let unit of lUnits) {
      const { _id, id, name, value, num, parent, totalValue, isSub } = unit;
      const subUnits = this.createNestedUnits(units, _id);
      unitItems.push({
        id,
        name,
        value,
        num,
        parent,
        totalValue,
        subs: subUnits,
      });
    }

    return unitItems;
  }

  getAll = async (type = "all") => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Unit`),
      status = false;
    try {
      await dbClient.dbConnect();
      const units = await Unit.find({}).select(["-__v", "-_id"]);
      if (!isEmptyOrNull(units)) {
        msg = esResponseMessage.foundAll(units.length, `unit`);
        status = true;
      }

      if (type === "sub") {
        response = this.createNestedUnits(units, null);
      } else {
        response = units;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Unit Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Unit"),
      status = false;
    console.log("Unit Get One ", query);
    try {
      await dbClient.dbConnect();
      const dbUnit = await Unit.findOne(query)
        .select(["-__v"])
        .populate("parent");

      const { id, name, description, value, num, parent, totalValue, isSub } =
        dbUnit;
      response = {
        id,
        name,
        description,
        value,
        num,
        parent: null,
        totalValue,
        isSub,
      };

      if (parent !== null) {
        response.parent = parent.id;
        response.parentName = parent?.name;
        if (!isSub) {
          dbUnit.isSub = true;
          await dbUnit.save();
        }
      }
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Unit");
      }
    } catch (error) {
      esBackLogger.info("unit Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Unit");

    try {
      await dbClient.dbConnect();
      response = await Unit.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Unit");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Unit Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (unitReq: any) => {
    let addunit = null,
      status = false,
      msg = esResponseMessage.addFailed("unit");

    try {
      console.log("Unit Added in ", unitReq);

      await dbClient.dbConnect();
      const newUnit = new Unit();
      const { parent, ...unit } = unitReq;

      const dbunit = await Unit.findOne({ id: parent });
      unit.parent = dbunit;

      Object.assign(newUnit, unit);
      const id = await this.getUniqId();
      newUnit.id = id;
      if (dbunit) {
        newUnit.isSub = true;
      }
      addunit = await newUnit.save();

      if (!isEmptyOrNull(addunit)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Unit");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Unit Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uUnit: any) => {
    let unitUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Unit");
    try {
      await dbClient.dbConnect();
      const { id, parent, ...unit } = uUnit;

      const dbUnit = await Unit.findOne({ id: parent });
      unit.parent = dbUnit;

      unitUpdate = await Unit.updateOne({ id }, { $set: unit });

      console.log("Update Unit ", unitUpdate);

      if (!isEmptyOrNull(unitUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Unit");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Unit Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uUnits: any[]) => {
    let updateunit = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update unit Failed Error, ", error);
    } finally {
      return updateunit;
    }
  };

  remove = async (id: any) => {
    let removeUnit = null,
      status = true,
      msg = esResponseMessage.removeFailed("Unit");
    try {
      await dbClient.dbConnect();

      const dbUnit = await Unit.findOne({ id });

      const dbUnits = await Unit.find({ parent: dbUnit._id });
      if (!isEmptyOrNull(dbUnits)) {
        throw new Error("unit has sub unit, You can only remove parent unit");
      }
      const { _id } = dbUnit;
      removeUnit = await Unit.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeUnit)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("unit Delete Failed Error, ", error);
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let unit = null,
      status = false,
      msg = esResponseMessage.found("Unit");

    try {
      await dbClient.dbConnect();
      unit = await Unit.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("unit getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(unit, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let unit = null;

    try {
      await dbClient.dbConnect();
      unit = await Unit.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("unit getOneByPublicId Error ", error);
    } finally {
      return unit;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const unit = await this.getOneByPublicIdPlane(id);

    console.log("unit ID, ", id);
    if (!isEmptyOrNull(unit)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const unitServices = new UnitServices();

export default unitServices;
