import { type NextRequest } from "next/server";
import userServices from "@/src/services/user.services";
import authServices from "@/src/services/auth.services";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import bcrypt from "bcrypt";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "../app/components/utils/router/responseAction";
import { esResponseMessage } from "../utils/messages/genaret.es.message";
import { isEmptyOrNull } from "../app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { auth } from "@/src/auth";

class UserController {
  saltRound = 10;
  salt = "";

  constructor() {
    this.saltRound = Number(process.env.BC_SALT);
  }

  getOne = async (req: NextRequest, ctx: any) => {
    const { params } = ctx;

    let respUser = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound("User")
    );
    try {
      respUser = await userServices.getOne(params?.id);
    } catch (error) {
      respUser.message = error.message;
      respUser.status = false;
    } finally {
      return getResponseFormatterObj(respUser);
    }
  };

  getLoginUser = async (login: {
    username: string | any;
    pwd: string | any;
  }) => {
    let response = null;
    try {
      let respUser = await userServices.getByLgoinOne({
        email: login.username,
      });
      if (!respUser) {
        respUser = await userServices.getByLgoinOne({
          phoneNo: login.username,
        });
      }

      if (!respUser) {
        respUser = await userServices.getByLgoinOne({
          userName: login.username,
        });
      }

      if (!respUser) {
        throw new Error("Invalid UserName & password");
      }

      console.log("Login Resp User, ", respUser);
      const {
        password,
        id,
        isActive,
        isVerified,
        isEmailVerified,
        name,
        email,
        phoneNo,
        userName,
        organization,
      } = respUser;

      const loginUser = {
        id,
        isActive,
        isVerified,
        isEmailVerified,
        name,
        email,
        phoneNo,
        userName,
        organization,
      };

      const isMatch = await this.isPasswordCompare(login.pwd, password);

      if (isMatch) {
        response = {
          response: `${authServices.signToken(loginUser)}`,
          status: true,
          message: "User login successfully",
        };
      }
    } catch (error) {
      esBackLogger.info("User login Error, ", error);
      response = { usename: "Invalid UserName", password: "Invalid password" };
    } finally {
      return response;
    }
  };

  getAll = async (req: NextRequest, ctx: any) => {
    let users = [];

    try {
      esBackLogger.info("Get All User Context ", ctx);
      users = await userServices.getAllUser();
    } catch (error) {
      esBackLogger.info("User Controller, Get All Error, ", error);
    } finally {
      return users;
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    const session = await auth();

    let addUserResp = getRespFormatte(
      null,
      false,
      esResponseMessage.addFailed("User")
    );

    try {
      const reqUser = await req.json();
      const { pwd, ...user } = reqUser;
      if (!isEmptyOrNull(pwd)) {
        user.password = await this.hashPassword(pwd);
      }
      user.password = await this.hashPassword("123456789");
      addUserResp = await userServices.add(user);
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
    } finally {
      return getResponseFormatterObj(addUserResp);
    }
  };

  register = async (request: NextRequest, ctx: any) => {
    let addUser = null;
    esBackLogger.info("User register !!");

    try {
      const reqUser = await request.json();
      const { pwd, ...user } = reqUser;
      if (!isEmptyOrNull(pwd)) {
        user.password = await this.hashPassword(pwd);
      }

      addUser = userServices.register(user);
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
    } finally {
      return addUser;
    }
  };

  update = async (uUser: any) => {
    let updateUser = getRespFormatte();

    try {
      updateUser = await userServices.updateOne(uUser);
    } catch (error) {
      esBackLogger.info("CN Add User Error ", error);
      updateUser.status = false;
    } finally {
      return getResponseFormatterObj(updateUser);
    }
  };

  userRuleUpdate = async (uUser: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("User Role")
    );

    try {
      respUpdate = await userServices.updateUserRule(uUser);
    } catch (error) {
      respUpdate = getRespFormatte(
        null,
        false,
        esResponseMessage.updateFailed(error.message)
      );
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  getUserRoleAccess = async (id: string) => {
    esBackLogger.info("User Id, Role Access ", id);
    let accessResp = getRespFormatte();
    try {
      accessResp = await userServices.getAllUserRoleAccess(id);
    } catch (error) {
      accessResp;
    } finally {
      return getResponseFormatterObj(accessResp);
    }
  };

  hashPassword = async (text: string) => {
    if (!this.salt) {
      this.salt = await bcrypt.genSalt(this.saltRound);
    }
    return bcrypt.hashSync(text, this.salt);
  };

  isPasswordCompare = async (password = "", hash = "") => {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  };

  userVerified = async (request: NextRequest, ctx: any) => {
    let accessResp = getRespFormatte();
    try {
      const verifyReq = await request.json();

      accessResp = await userServices.getUserVerified(verifyReq);
    } catch (error) {
      accessResp.message = error.message;
      accessResp.status = false;
    } finally {
      return getResponseFormatterObj(accessResp);
    }
  };

  userToggleActive = async (request: NextRequest, ctx: any) => {
    let accessResp = getRespFormatte();
    try {
      const activeReq = await request.json();
      accessResp = await userServices.userToggleActive(activeReq);
    } catch (error) {
      accessResp.message = error.message;
      accessResp.status = false;
    } finally {
      return getResponseFormatterObj(accessResp);
    }
  };
}

const userController = new UserController();
export default userController;
