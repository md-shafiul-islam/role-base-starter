import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";

import User from "@/src/Models/User";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import userController from "@/src/controller/user.controller";

export async function POST(request, ctx) {
  // const session = await auth();
  let loginResp = {
    response: null,
    status: true,
    message: "User login failed",
  };

  try {
    const login = await request.json();
    console.log("User Logi Request, ", login);
    const { response, status, message } = await userController.getLoginUser(
      login
    );

    loginResp.response = response;
    loginResp.status = status;
    loginResp.message = message;
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(
      loginResp.response,
      loginResp.status,
      loginResp.message
    );
  }
}

export async function PUT(request, ctx) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
    await dbClient.connect();
    const newUser = new User();
    Object.assign(newUser, req.body);
    newUser.save();
    await dbClient.disconnect();
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}

export async function PATCH(request, ctx) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
    await dbClient.connect();
    const newUser = new User();
    Object.assign(newUser, req.body);
    newUser.save();
    await dbClient.disconnect();
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}

export async function DELETE(request, ctx) {
  // const session = await auth();
  let response = null,
    status = false,
    message = "Users Not found";

  try {
    await dbClient.connect();
    const newUser = new User();
    Object.assign(newUser, req.body);
    newUser.save();
    await dbClient.disconnect();
  } catch (error) {
    //esBackLogger.info("Get Products Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}
