import { NextRequest } from "next/server";

class UploadController {
  getImageByPath = async (pathUrl: string) => {
    return "";
  };

  uploadImageByPathName = async (
    request: NextRequest,
    ctx: any,
    path: string
  ) => {
    return "";
  };

  remove = async (request: NextRequest, ctx: any) => {
    throw new Error("Method not implemented.");
  };
}

const uploadController = new UploadController();

export default uploadController;
