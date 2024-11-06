import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Stakeholder from "@/src/Models/Stakeholder";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import StakeType from "../Models/StakeType";
import User from "../Models/User";
import utilServices from "./util.services";

class StakeholderServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Stakeholder`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Stakeholder.find({})
        .select(["-_id", "-__v"])
        .populate("stakeType", ["-_id", "-__v"]);

      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Stakeholder`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getByQuery = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Stakeholder Query"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Stakeholder.findOne(query)
        .select(["-_id", "-__v"])
        .populate("stakeType", ["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Stakeholder Query");
      }
    } catch (error) {
      esBackLogger.info("Stakeholder Query Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Stakeholder"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Stakeholder.findOne(query)
        .select(["-_id", "-__v"])
        .populate("stakeType", ["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Stakeholder");
      }
    } catch (error) {
      esBackLogger.info("Stakeholder Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Stakeholder");

    try {
      await dbClient.dbConnect();
      response = await Stakeholder.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Stakeholder");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (stakeholder: any) => {
    let addStakeholder = null,
      status = false,
      msg = esResponseMessage.addFailed("Stakeholder");

    try {
      console.log("stakeholder Add, ", stakeholder);
      await dbClient.dbConnect();

      const dbUser = await User.findOne({
        id: "019271dc-6b5c-7553-b669-6714bbb50a70",
      });

      const dbStakType = await StakeType.findOne({
        id: stakeholder?.stakeType,
      });
      const newStakeholder = new Stakeholder();
      Object.assign(newStakeholder, stakeholder);

      const id = await this.getUniqId();
      newStakeholder.stakeType = dbStakType;
      newStakeholder.user = dbUser;
      newStakeholder.id = id;
      console.log("Add Stakeholder ", newStakeholder);

      addStakeholder = await newStakeholder.save();

      if (!isEmptyOrNull(addStakeholder)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Stakeholder");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  addUsingUser = async (id: any) => {
    const response = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("User Stakeholder")
    );
    try {
      await dbClient.dbConnect();
      const dbUser = await User.findOne({ id });
      if (!isEmptyOrNull(dbUser)) {
        const isCreate = await this.addStakholderViaUser(dbUser);
        if (isCreate) {
          const updateUser = await User.updateOne(
            { id },
            { $set: { hasStakholder: true } }
          );

          if (!isEmptyOrNull(updateUser)) {
            response.status = true;
            response.message =
              esResponseMessage.addSuccessfully("User Stakeholder");
          }
        }
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Stakeholder Failed Error, ", error);
      response.status = false;
      response.message = error.message;
    } finally {
      return response;
    }
  };

  updateOne = async (uStakeholder: any) => {
    let stakeholderUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Stakeholder");
    try {
      await dbClient.dbConnect();
      const { id, stakeType, ...stakeholder } = uStakeholder;

      const dbStakType = await StakeType.findOne({ id: stakeType });
      stakeholder.stakeType = dbStakType;

      stakeholderUpdate = await Stakeholder.updateOne(
        { id },
        { $set: stakeholder }
      );

      if (!isEmptyOrNull(stakeholderUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Stakeholder");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  addTypeToStake = (reqStakholder: any) => {
    throw new Error("Method not implemented.");
  };

  update = async (uStakeholders: any[]) => {
    let updateStakeholder = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Stakeholder Failed Error, ", error);
    } finally {
      return updateStakeholder;
    }
  };

  remove = async (id: any) => {
    let removeStakeholder = null,
      status = true,
      msg = esResponseMessage.removeFailed("Stakeholder");
    try {
      await dbClient.dbConnect();
      removeStakeholder = await Stakeholder.deleteOne({ id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeStakeholder)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Stakeholder Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let stakeholder = null,
      status = false,
      msg = esResponseMessage.found("Stakeholder");

    try {
      await dbClient.dbConnect();
      stakeholder = await Stakeholder.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(stakeholder, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let stakeholder = null;

    try {
      await dbClient.dbConnect();
      stakeholder = await Stakeholder.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder getOneByPublicId Error ", error);
    } finally {
      return stakeholder;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const stakeholder = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(stakeholder)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };

  getStakeholderGenUniqId = async () => {
    const genId = `${utilServices.getRandomChar(3)}${utilServices.getRandomNum(
      5
    )}`;

    const stakeholder = await Stakeholder.findOne({ genId });

    if (!isEmptyOrNull(stakeholder)) {
      return this.getStakeholderGenUniqId();
    }

    return genId;
  };

  addStakholderViaUser = async (user: any) => {
    let status = false;
    try {
      if (!isEmptyOrNull(user)) {
        const stakeholder = new Stakeholder();
        stakeholder.firstName = user.name;
        stakeholder.phoneNo = user.phoneNo;
        stakeholder.email = user.email;

        const dbUser = await User.findOne({ _id: user._id });
        stakeholder.user = dbUser;
        const dbStakType = await StakeType.findOne({ value: "user" });
        const genId = await this.getStakeholderGenUniqId();
        const id = await this.getUniqId();

        stakeholder.genId = genId;
        stakeholder.id = id;
        stakeholder.stakeType = dbStakType;

        const stakeResp = await stakeholder.save();

        if (!isEmptyOrNull(stakeResp)) {
          status = true;
        }
      }
    } catch (error) {
      console.log("addStakholderViaUser Error,", error);
    } finally {
      return status;
    }
  };

  //Start Stakeholder Type

  updateOneType = async (uStakeType: any) => {
    let stakeholderUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Stakeholder Type");
    try {
      await dbClient.dbConnect();
      const { id } = uStakeType;
      stakeholderUpdate = await StakeType.updateOne(
        { id },
        { $set: uStakeType }
      );

      if (!isEmptyOrNull(stakeholderUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Stakeholder Type");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  removeType = async (id: string) => {
    let removeStakeholder = null,
      status = true,
      msg = esResponseMessage.removeFailed("Stakeholder Type");
    try {
      await dbClient.dbConnect();
      removeStakeholder = await StakeType.deleteOne({ id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeStakeholder)) {
        status = true;
        msg = esResponseMessage.removeSuccessfully("StakeType");
      }
    } catch (error) {
      esBackLogger.info("Stakeholder Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  addType = async (reqStakholderType: any) => {
    let addStakeType = null,
      status = false,
      message = esResponseMessage.addFailed("Stakeholder Type");
    try {
      await dbClient.dbConnect();
      const newStakType = new StakeType();
      Object.assign(newStakType, reqStakholderType);
      const id = await this.getStakeTypeUniqId();
      newStakType.id = id;

      addStakeType = await newStakType.save();

      if (!isEmptyOrNull(addStakeType)) {
        status = true;
        message = esResponseMessage.addSuccessfully("Stakeholder Type");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Type Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, message);
    }
  };

  getOneType = async (query: { id: string }) => {
    let response = null,
      msg = esResponseMessage.notFound("Stakeholder Type"),
      status = false;

    try {
      await dbClient.dbConnect();
      console.log("StakType ID ", query);
      response = await StakeType.findOne(query).select(["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Stakeholder Type");
      }
    } catch (error) {
      esBackLogger.info("Stakeholder Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getAllType = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Stakeholder Type`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await StakeType.find({}).select(["-_id", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Stakeholder Type`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Stakeholder Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getStakeTypeUniqId = async () => {
    const id = uuidv7();

    const stakeType = await StakeType.findOne({ id });

    if (!isEmptyOrNull(stakeType)) {
      return this.getUniqId();
    }
    esBackLogger.info("StakeType Uniq ID ", id);
    return id;
  };

  //End Stakeholder Type
}

const stakeholderServices = new StakeholderServices();

export default stakeholderServices;
