import dbClient from "@/src/db/db.client";
import User from "@/src/Models/User";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import Role from "@/src/Models/Role";
import { esBackLogger } from "../utils/es-loger/es.back.logger";

import stakeholderServices from "./stakholder.services";
import Stakeholder from "../Models/Stakeholder";

class UserServices {
  getOne = async (id: string) => {
    let userResp = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound("User")
    );

    try {
      await dbClient.dbConnect();

      const dbUser = await User.findOne({ id })
        .select(["-__v", "-password"])
        .populate("role", ["-_id", "-__v", "-code", "-description"])
        .populate("organization", ["-_id", "-__v"]);

      delete dbUser._id;

      if (!isEmptyOrNull(dbUser)) {
        userResp.response = dbUser;
        userResp.status = true;
        userResp.message = esResponseMessage.found("User");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error ", error);
      userResp.response = null;
      userResp.status = false;
      userResp.message = esResponseMessage.notFound("User");
    } finally {
      return userResp;
    }
  };

  getByLgoinOne = async (query: Object) => {
    let user = null;

    try {
      await dbClient.dbConnect();
      user = await User.findOne(query).select([
        "-_id",
        "-__v",
        "-createdAt",
        "-updatedAt",
        "-role",
      ]);
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
    } finally {
      return user;
    }
  };

  getAllUser = async () => {
    let users = null;
    try {
      await dbClient.dbConnect();
      users = await User.find({}).select([
        "-_id",
        "-password",
        "-__v",
        "-createdAt",
        "-updatedAt",
        "-role",
      ]);
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error ", error);
    } finally {
      return users || [];
    }
  };

  add = async (user: any) => {
    let addUser = null,
      status = false,
      message = "";
    try {
      await dbClient.dbConnect();
      const newUser = new User();
      Object.assign(newUser, user);
      const id = await this.getUniqId();
      newUser.id = id;

      if (!isEmptyOrNull(user.role)) {
        const dbUserRole = await Role.findOne({ publicId: user?.role });
        if (!isEmptyOrNull(dbUserRole)) {
          newUser.role = dbUserRole;
        }
      }

      addUser = await newUser.save();

      if (!isEmptyOrNull(addUser)) {
        status = true;
        message = esResponseMessage.addSuccessfully("User");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
      status = false;
      message = error.message;
    } finally {
      return getRespFormatte(null, status, message);
    }
  };

  register = async (user: any) => {
    let addUser = null;
    try {
      await dbClient.dbConnect();
      const newUser = new User();
      Object.assign(newUser, user);
      const id = await this.getUniqId();

      newUser.id = id;

      const dbRole = await Role.findOne({ roleKey: "user" });

      if (!isEmptyOrNull(dbRole)) {
        newUser.role = dbRole;
      }
      newUser.userName = newUser.phoneNo;
      addUser = await newUser.save();

      if (!isEmptyOrNull(addUser)) {
        const hasStakholder = await stakeholderServices.addStakholderViaUser(
          newUser
        );

        console.log("User Stakeholder Created ", hasStakholder);
        await User.updateOne({ _id: newUser._id }, { $set: { hasStakholder } });
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
    } finally {
      return addUser;
    }
  };

  updateOne = async (uUser: any) => {
    let addUser = null,
      status = false,
      message = esResponseMessage.updateFailed("User");

    try {
      await dbClient.dbConnect();

      const { id, role, ...user } = uUser;

      if (!isEmptyOrNull(role)) {
        const dbRole = await Role.findOne({ publicId: role });
        user.role = dbRole;
      }
      addUser = await User.updateOne({ id }, { $set: user });

      if (!isEmptyOrNull(addUser)) {
        status = true;
        message = esResponseMessage.updated("User");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(addUser, status, message);
    }
  };

  updateUserRule = async (uUser: any) => {
    let updateUser = null,
      status = false,
      message = esResponseMessage.updateFailed("User Role");

    try {
      await dbClient.dbConnect();
      const { id, role } = uUser;

      const dbRole = await Role.findOne({ publicId: role });
      const dbUser = await User.findOne({ id });

      if (!isEmptyOrNull(dbUser)) {
        dbUser.role = dbRole;
        updateUser = await dbUser.save();

        if (!isEmptyOrNull(updateUser)) {
          status = true;
          message = esResponseMessage.updated("User Role");
        }
      }

      await dbClient.disconnect();
    } catch (error) {
      status = false;
      message = error.message;
    } finally {
      return getRespFormatte(null, status, message);
    }
  };

  update = async (user: any) => {
    let addUser = null;
    try {
      await dbClient.dbConnect();
      const newUser = new User();
      Object.assign(newUser, user);
      addUser = await newUser.save();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
    } finally {
      return addUser;
    }
  };

  userToggleActive = async (activeReq: any) => {
    let activeUser = getRespFormatte();
    try {
      await dbClient.dbConnect();

      console.log("userToggleActive, ", activeReq);
      const dbUser = await User.findOne({ id: activeReq.id });
      const { _id, isActive } = dbUser;

      const updateUser = await User.updateOne(
        { _id },
        { $set: { isActive: !isActive } }
      );

      if (!isEmptyOrNull(updateUser)) {
        activeUser.status = true;

        if (isActive) {
          activeUser.message =
            esResponseMessage.toogleStatusSuccessfully("User Deactivate");
        } else {
          activeUser.message =
            esResponseMessage.toogleStatusFailed("User Deactivate");
        }
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
      activeUser.message = error.message;
    } finally {
      return activeUser;
    }
  };

  getUserVerified = async (verifyReq: any) => {
    let verifyUser = getRespFormatte();
    try {
      await dbClient.dbConnect();

      console.log("PATCH verifyReq Obj, ", verifyReq);
      const { id } = verifyReq;
      const dbUser = await User.findOne({ id });
      const { _id, isVerified, ...user } = dbUser;

      console.log("User _id, ", _id);
      console.log("User isVerified, ", isVerified);
      if (!isVerified) {
        const updateUser = await User.updateOne(
          { _id },
          { $set: { isVerified: true } }
        );

        console.log("updateUser ", updateUser);
        if (!isEmptyOrNull(updateUser)) {
          verifyUser.status = true;

          if (isVerified) {
            verifyUser.message =
              esResponseMessage.toogleStatusSuccessfully("User Verified");
          } else {
            verifyUser.message =
              esResponseMessage.toogleStatusFailed("User Verified");
          }
        }
      } else {
        verifyUser.status = true;
        verifyUser.message = `${esResponseMessage.addAlready(
          "User "
        )} Verified`;
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
      verifyUser.message = error.message;
    } finally {
      return verifyUser;
    }
  };

  remove = async (user: any) => {
    let addUser = null;
    try {
      await dbClient.dbConnect();
      const newUser = new User();
      Object.assign(newUser, user);
      addUser = await newUser.save();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Added Failed Error, ", error);
    } finally {
      return addUser;
    }
  };

  getOneByPublicId = async (id: string) => {
    let user = null;

    try {
      await dbClient.dbConnect();
      user = await User.findOne({ id });

      esBackLogger.info("GET getOneByPublicId, ", user);

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("getOneByPublicId Error ", error);
    } finally {
      return user;
    }
  };

  getAllUserRoleAccess = async (id: string) => {
    let roleAccess = [],
      status = false,
      message = "";
    try {
      const dbUser = await User.findOne({ id });
      esBackLogger.info("User ID ", dbUser?.role);
      const dbRole = await Role.findOne({ _id: dbUser.role }).populate(
        "access",
        ["-_id", "-role", "-menu", "-__v", "-createdAt", "-updatedAt"]
      );
      esBackLogger.info("DB Role access, ", dbRole);

      roleAccess = dbRole?.access;

      if (!isEmptyOrNull(roleAccess)) {
        status = true;
        message = "Acccess Found";
      }
    } catch (error) {
      esBackLogger.error("Role Access ", error.message);
    } finally {
      return getRespFormatte(roleAccess, status, message);
    }
  };
  getUniqId = async () => {
    esBackLogger.info("Uniq ID ... ");
    const id = uuidv7();

    const user = await this.getOneByPublicId(id);

    if (!isEmptyOrNull(user)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const userServices = new UserServices();

export default userServices;
