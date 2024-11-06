import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Role from "@/src/Models/Role";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import Menu from "@/src/Models/Menu";
import RoleAccess from "@/src/Models/RoleAccess";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class RoleServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Role`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Role.find({}).select(["-_id", "-access", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Role`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("role Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Role"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Role.findOne(query)
        .select(["-_id", "-__v"])
        .populate("access", ["-_id", "-__v", "-role", "-menu"]);

      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Role");
      }
    } catch (error) {
      esBackLogger.info("Role Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Role");

    try {
      await dbClient.dbConnect();
      response = await Role.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Role");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (role: any) => {
    let addRole = null,
      status = false,
      msg = esResponseMessage.addFailed("Role");
    await dbClient.dbConnect();
    const session = await dbClient.getConnect().startSession();
    try {
      await session.startTransaction();

      const menus = await Menu.find({});

      const newRole = new Role();
      Object.assign(newRole, role);
      const id = await this.getUniqId();
      const code = await this.getUniqCode();
      newRole.publicId = id;
      newRole.code = code;

      addRole = await newRole.save();
      esBackLogger.info("After Save addRole, ", addRole);
      esBackLogger.info("After newRole, ", newRole);

      const accessItems = [];
      if (!isEmptyOrNull(menus)) {
        menus.forEach((item, idx) => {
          const nAccess = new RoleAccess();
          nAccess.publicId = `${this.getUniqAccesId(code)}`;
          nAccess.role = newRole;
          nAccess.menu = item;
          nAccess.menuKey = item.key;
          nAccess.title = item.title;
          nAccess.key = `${role.title}-${item.key}`;
          nAccess.isView = true;
          nAccess.isActive = true;

          accessItems.push(nAccess);
        });
      }
      newRole.access = accessItems;

      const accessResp = await RoleAccess.insertMany(accessItems);
      await newRole.save();
      esBackLogger.info("Access List Save, ", accessResp);
      if (!isEmptyOrNull(addRole)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Role");
      }
      await session.commitTransaction();
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role Added Failed Error, ", error);
      status = false;
      await session.abortTransaction();
      await dbClient.disconnect();
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  addRoleAccess = async (roleAccess: any) => {
    let roleAccessAdd = null,
      status = false,
      msg = esResponseMessage.addFailed("Role Access");
    try {
      const role = await Role.findOne({ publicId: roleAccess.role });
      await dbClient.dbConnect();

      const menu = await Menu.findOne({ publicId: roleAccess.menu });

      if (isEmptyOrNull(role) || isEmptyOrNull(menu)) {
        throw new Error("Role Or Menu Not found :)");
      }

      const newRoleAccess = new RoleAccess();
      Object.assign(newRoleAccess, roleAccess);

      const id = await this.getUniqId();
      newRoleAccess.publicId = id;
      newRoleAccess.menu = menu;
      newRoleAccess.role = role;

      roleAccessAdd = await newRoleAccess.save();
      role.access.push(roleAccessAdd);
      role.save();
      if (!isEmptyOrNull(roleAccessAdd)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Role Access");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role Access Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uRole: any) => {
    let roleUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Role");
    try {
      await dbClient.dbConnect();
      const { _id, ...role } = uRole;
      roleUpdate = await Role.updateOne({ _id }, { $set: role });

      if (!isEmptyOrNull(roleUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Role");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateKey = async (uRole: any) => {
    let roleUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Role Key");
    try {
      await dbClient.dbConnect();
      const { id, roleKey } = uRole;
      roleUpdate = await Role.updateOne(
        { publicId: id },
        { $set: { roleKey } }
      );

      if (!isEmptyOrNull(roleUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Role Key");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uRoles: any[]) => {
    let updateRole = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Role Failed Error, ", error);
    } finally {
      return updateRole;
    }
  };

  remove = async (_id: any) => {
    let removeRole = null,
      status = true,
      msg = esResponseMessage.removeFailed("Role");
    try {
      await dbClient.dbConnect();
      removeRole = await Role.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeRole)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Role Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let role = null,
      status = false,
      msg = esResponseMessage.found("Role");

    try {
      await dbClient.dbConnect();
      role = await Role.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(role, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let role = null;

    try {
      await dbClient.dbConnect();
      role = await Role.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role getOneByPublicId Error ", error);
    } finally {
      return role;
    }
  };

  getOneByCodePlane = async (code: number) => {
    let role = null;

    try {
      await dbClient.dbConnect();
      role = await Role.findOne({ code });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Role getOneByCodePlane Error ", error);
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

    return id;
  };

  getUniqAccesId = (code: number) => {
    const id = `${code}-${uuidv7()}`;
    esBackLogger.info("Code ID ", id);
    return id;
  };

  getUniqCode = async () => {
    const randDigit = Math.floor(100000 + Math.random() * 999999);
    esBackLogger.info("Role Uniq ID ", randDigit);
    const role = await this.getOneByCodePlane(randDigit);

    if (!isEmptyOrNull(role)) {
      return this.getUniqCode();
    }

    return randDigit;
  };
}

const roleServices = new RoleServices();

export default roleServices;
