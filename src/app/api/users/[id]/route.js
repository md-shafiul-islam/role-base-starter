import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getResponseFormatter } from "@/src/app/components/utils/router/responseAction";

export async function GET(request, ctx) {
  // const session = await auth();

  const { params } = ctx;
  esBackLogger.info("User Context, params, ", params);
  let response = null,
    status = false,
    message = "User Not found";

  try {
    // const user = userController.getOne(params?.id)

    if (!isEmptyOrNull(user)) {
      response = user;
      message = `User found By ID`;
      status = true;
    }
  } catch (error) {
    esBackLogger.info("Get One User Response Error, ", error);
  } finally {
    return getResponseFormatter(response, status, message);
  }
}

export async function POST(request, ctx) {
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
