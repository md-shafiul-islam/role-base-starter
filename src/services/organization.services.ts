import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Organization from "@/src/Models/Organization";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import User from "../Models/User";

class OrganizationServices {
  getAllProduct = async (id: any) => {
    let response = null,
      msg = esResponseMessage.foundAll(0, `Organization Product`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Organization.findOne({ id })
        .select(["-_id", "-__v"])
        .populate("products", ["-_id", "-__v"]);

      if (!isEmptyOrNull(response)) {
        if (!isEmptyOrNull(response.products)) {
          msg = esResponseMessage.foundAll(
            response.products.length,
            `Organization Product`
          );
          status = true;
        }
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Organization`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Organization.find({}).select(["-_id", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Organization`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Organization"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Organization.findOne(query)
        .select(["-_id", "-__v", "-createdAt", "-updatedAt"])
        .populate("users", [
          "-_id",
          "-__v",
          "-password",
          "-role",
          "-createdAt",
          "-updatedAt",
          "-userName",
        ]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Organization");
      }
    } catch (error) {
      esBackLogger.info("Organization Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Organization");

    try {
      await dbClient.dbConnect();
      response = await Organization.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Organization");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (reqOrganization: any) => {
    let addOrganization = null,
      status = false,
      msg = esResponseMessage.addFailed("Organization");

    try {
      await dbClient.dbConnect();
      const newOrganization = new Organization();
      Object.assign(newOrganization, reqOrganization);
      const id = await this.getUniqId();
      newOrganization.id = id;

      addOrganization = await newOrganization.save();

      if (!isEmptyOrNull(addOrganization)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Organization");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uOrganization: any) => {
    let organizationUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Organization");
    try {
      await dbClient.dbConnect();
      const { id, ...organization } = uOrganization;
      organizationUpdate = await Organization.updateOne(
        { id },
        { $set: organization }
      );

      if (!isEmptyOrNull(organizationUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Organization");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uOrganizations: any[]) => {
    let updateOrganization = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Organization Failed Error, ", error);
    } finally {
      return updateOrganization;
    }
  };

  verified = async (reqVerified: any) => {
    let verifiedResp = getRespFormatte(
      null,
      false,
      esResponseMessage.toogleStatusFailed("Organization verifiy")
    );
    try {
      await dbClient.dbConnect();
      const { id } = reqVerified;
      const dbOrg = await Organization.findOne({ id });
      if (!isEmptyOrNull(dbOrg)) {
        const { _id, isVerified } = dbOrg;

        console.log("Organization ", dbOrg);
        if (!isVerified) {
          const updateOrg = await Organization.updateOne(
            { _id },
            { $set: { isVerified: true } }
          );

          if (!isEmptyOrNull(updateOrg)) {
            verifiedResp.message = esResponseMessage.toogleStatusSuccessfully(
              "Organization verifiy"
            );
            verifiedResp.status = true;
          } else {
            verifiedResp.message = esResponseMessage.toogleStatusFailed(
              "Organization verifiy"
            );
            verifiedResp.status = false;
          }
        } else {
          verifiedResp.message = `${esResponseMessage.addAlready(
            "Organization"
          )} Verified`;
          verifiedResp.status = true;
        }
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Organization Failed Error, ", error);
    } finally {
      return verifiedResp;
    }
  };

  toggleActive = async (reqActive: any) => {
    let activeResp = getRespFormatte(
      null,
      false,
      esResponseMessage.toogleStatusFailed("Organization verifiy")
    );
    const { id, active } = reqActive;
    try {
      await dbClient.dbConnect();

      const dbOrg = await Organization.findOne({ id });

      if (!isEmptyOrNull(dbOrg)) {
        const { _id, isActive } = dbOrg;

        const updateOrg = await Organization.updateOne(
          { _id },
          { $set: { isActive: !isActive } }
        );

        if (!isEmptyOrNull(updateOrg)) {
          activeResp.message = esResponseMessage.toogleStatusSuccessfully(
            `Organization ${isActive ? "Deactivate" : "Activate"}`
          );
          activeResp.status = true;
        } else {
          activeResp.message = esResponseMessage.toogleStatusFailed(
            `Organization ${isActive ? "Deactivate" : "Activate"}`
          );
          activeResp.status = false;
        }
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Organization Failed Error, ", error);
      activeResp.message = esResponseMessage.toogleStatusFailed(
        `Organization ${active ? "Deactivate" : "Activate"}`
      );
      activeResp.status = false;
    } finally {
      return activeResp;
    }
  };

  remove = async (id: any) => {
    let removeOrganization = null,
      status = true,
      msg = esResponseMessage.removeFailed("Organization");
    try {
      await dbClient.dbConnect();
      const dbOrganization = await Organization.findOne({ id }).populate(
        "users"
      );

      for (const user of dbOrganization.users) {
        const { _id } = user;
        const updateUser = await User.updateOne(
          { _id },
          { $set: { organization: null } }
        );
      }
      removeOrganization = await Organization.deleteOne({ id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeOrganization)) {
        status = true;
        msg = esResponseMessage.removeSuccessfully("Organization");
      }
    } catch (error) {
      esBackLogger.info("Organization Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let organization = null,
      status = false,
      msg = esResponseMessage.found("Organization");

    try {
      await dbClient.dbConnect();
      organization = await Organization.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(organization, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let organization = null;

    try {
      await dbClient.dbConnect();
      organization = await Organization.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization getOneByPublicId Error ", error);
    } finally {
      return organization;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const organization = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(organization)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };

  addUser = async (addUserReq: any) => {
    let addUserOrganization = null,
      status = false,
      msg = esResponseMessage.addFailed("Organization Add User");
    try {
      const { id, user } = addUserReq;
      const dbOrg = await Organization.findOne({ id });
      const dbUser = await User.findOne({ id: user }).populate("organization");

      if (!isEmptyOrNull(dbOrg) && !isEmptyOrNull(dbUser)) {
        if (dbUser.organization === null) {
          dbOrg.users = [dbUser];

          const { _id, ...organization } = dbOrg;
          const update = await Organization.updateOne(
            { _id },
            { $set: organization }
          );
          dbUser.organization = dbOrg;
          const updateUser = await User.updateOne(
            { _id: dbUser._id },
            { $set: dbUser }
          );

          if (!isEmptyOrNull(update) && !isEmptyOrNull(updateUser)) {
            status = true;
            msg = esResponseMessage.addSuccessfully("Organization add user");
          }
        } else {
          status = true;
          msg = esResponseMessage.addAlready("Organization add user");
        }
      }
    } catch (error) {
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(addUserOrganization, status, msg);
    }
  };
}

const organizationServices = new OrganizationServices();

export default organizationServices;
