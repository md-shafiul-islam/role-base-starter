import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import organizationServices from "../services/organization.services";

class OrganizationController {
  getAll = async (req: NextRequest, ctx: any) => {
    let respOrganization = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Organization")
    );

    try {
      respOrganization = await organizationServices.getAll();
    } catch (error) {
      esBackLogger.info("Organization Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respOrganization);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respOrganization = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Organization`)
    );

    try {
      esBackLogger.info("Get Organization Context ", ctx);
      respOrganization = await organizationServices.getOne({
        id: ctx.params?.id,
      });
    } catch (error) {
      esBackLogger.info("Organization Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respOrganization);
    }
  };

  getAllProduct = async (request: NextRequest, ctx: any) => {
    let respOrganization = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Organization All Product`)
    );

    try {
      esBackLogger.info("Get Organization Context ", ctx);
      respOrganization = await organizationServices.getAllProduct(
        ctx.params?.id
      );
    } catch (error) {
      esBackLogger.info("Organization Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respOrganization);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(
      esResponseMessage.addFailed("Organization ")
    );

    try {
      const reqOrganization = await req.json();

      response = await organizationServices.add(reqOrganization);
    } catch (error) {
      esBackLogger.info("CN Add Organization Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  addUser = async (request: NextRequest, ctx: any) => {
    let respAddUser = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("Organization Add User")
    );
    try {
      const addUserReq = await request.json();

      respAddUser = await organizationServices.addUser(addUserReq);
    } catch (error) {
      respAddUser.status = false;
      respAddUser.message = error.message;
    } finally {
      return getResponseFormatterObj(respAddUser);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Organization ")
    );
    try {
      const reqOrganization = await req.json();

      respUpdate = await organizationServices.updateOne(reqOrganization);
    } catch (error) {
      esBackLogger.info("Organization Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  toggleActive = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Organization ")
    );
    try {
      const reqActive = await request.json();

      respUpdate = await organizationServices.toggleActive(reqActive);
    } catch (error) {
      esBackLogger.info("Organization Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  verified = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.toogleStatusFailed("Organization Verified")
    );
    try {
      const reqVerified = await request.json();

      respUpdate = await organizationServices.verified(reqVerified);
    } catch (error) {
      esBackLogger.info("Organization Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeOrganization = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Organization ")
    );

    try {
      removeOrganization = await organizationServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveOrganization CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeOrganization);
    }
  };
}

const organizationController = new OrganizationController();
export default organizationController;
