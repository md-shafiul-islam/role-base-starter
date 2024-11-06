import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import RoleAccess from "@/src/Models/RoleAccess";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import Role from "@/src/Models/Role";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { faL } from "@fortawesome/free-solid-svg-icons";

class AccessServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Role Access`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await RoleAccess.find({}).select("-_id");
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `RoleAccess`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("RoleAccess"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await RoleAccess.findOne(query);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("RoleAccess");
      }
    } catch (error) {
      esBackLogger.info("RoleAccess Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("RoleAccess");

    try {
      await dbClient.dbConnect();
      response = await RoleAccess.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("RoleAccess");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess Not found Error getByLgoinOne, ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (roleAccess: any) => {
    let addRoleAccess = null,
      status = false,
      msg = esResponseMessage.addFailed("RoleAccess");

    try {
      await dbClient.dbConnect();
      const newRoleAccess = new RoleAccess();
      Object.assign(newRoleAccess, roleAccess);
      const id = await this.getUniqId();
      if (id) {
        newRoleAccess.publicId = id;
      }

      addRoleAccess = await newRoleAccess.save();

      if (!isEmptyOrNull(addRoleAccess)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("RoleAccess");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uRole: any) => {
    let roleUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("RoleAccess");
    try {
      await dbClient.dbConnect();
      const { _id, ...roleAccess } = uRole;
      roleUpdate = await RoleAccess.updateOne({ _id }, { $set: roleAccess });

      if (!isEmptyOrNull(roleUpdate)) {
        status = true;
        msg = esResponseMessage.updated("RoleAccess");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateAll = async (uAccessReq: any) => {
    let updateAccess = null,
      status = false,
      message = esResponseMessage.updateFailed("Role Access all");
    try {
      await dbClient.dbConnect();

      const items = [];
      for (const uAccess of uAccessReq?.access) {
        const { id, ...access } = uAccess;
        const updateResp = await RoleAccess.updateOne(
          { publicId: id },
          { $set: access }
        );

        esBackLogger.info("Update Access Using Loop, ", updateResp);
        items.push(updateResp);
      }

      if (!isEmptyOrNull(items)) {
        status = true;
        message = esResponseMessage.updated(
          `${items.length} Role${items.length > 0 ? "'s" : ""} Access`
        );
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Role Failed Error, ", error);
      status = false;
      message = error.message;
    } finally {
      return getRespFormatte(updateAccess, status, message);
    }
  };

  updateOneViaRole = async (reqAccess: any) => {
    let updateAccess = null,
      status = false,
      message = esResponseMessage.updateFailed("Role Access");
    try {
      await dbClient.dbConnect();

      const { publicId, ...access } = reqAccess;

      updateAccess = await RoleAccess.updateOne({ publicId }, { $set: access });

      if (!isEmptyOrNull(updateAccess)) {
        status = true;
        message = esResponseMessage.updated("Role Access");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Role Access Failed Error, ", error);
      status = false;
      message = error.message;
    } finally {
      return getRespFormatte(updateAccess, status, message);
    }
  };

  remove = async (_id: any) => {
    let removeRoleAccess = null,
      status = true,
      msg = esResponseMessage.removeFailed("RoleAccess");
    try {
      await dbClient.dbConnect();
      removeRoleAccess = await RoleAccess.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeRoleAccess)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("RoleAccess Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let roleAccess = null,
      status = false,
      msg = esResponseMessage.found("RoleAccess");

    try {
      await dbClient.dbConnect();
      roleAccess = await RoleAccess.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(roleAccess, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let role = null;

    try {
      await dbClient.dbConnect();
      role = await RoleAccess.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("RoleAccess getOneByPublicId Error ", error);
    } finally {
      return role;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const role = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(role)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };

  preparedUpdateAccess = (dbRoleAccess, reqAccess) => {
    esBackLogger.info("dbRoleAccess ", dbRoleAccess);
    esBackLogger.info("reqAccess ", reqAccess);

    return [];
  };
}

const accessServices = new AccessServices();

export default accessServices;
