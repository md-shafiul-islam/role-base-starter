import {
  getRespFormatte,
  getResponseFormatter,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { auth } from "@/src/auth";
import { setAxiosGlobalHeader } from "@/src/app/components/initAxios";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { NextRequest } from "next/server";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import addressController from "@/src/controller/address.controller";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import regionController from "@/src/controller/region.controller";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte(
    null,
    false,
    esResponseMessage.found("Address")
  );

  try {
    return await addressController.getOne(request, ctx);
  } catch (error) {
    esBackLogger.info("Resp city Error, ", error);
  } finally {
    return getResponseFormatterObj(response);
  }
}

export async function PUT(request: NextRequest, ctx: any) {
  try {
    const data = await request.json();

    //esBackLogger.info("Address PUT Data ", data);

    const areas = [];

    data &&
      data.areas &&
      data.areas.forEach((item: any) => {
        areas.push({
          zone: item.zone,
          pathaoCode: item.area.area_id,
          name: item.area.area_name,
          isHome: item.area.home_delivery_available,
          isPickup: item.area.pickup_available,
        });
      });

    return getResponseFormatter(areas, false, `Areas Modyfiy ${areas.length}`);
  } catch (error) {
    return getResponseFormatter(null, false, "Update failed found");
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let message = "Add Address failed",
    status = false,
    response = null,
    errorStatus = true;

  try {
    const session = await auth();

    const data = await request.json();
  } catch (error) {
    //esBackLogger.info("Stakeholder Address Add Error ,", error);
    message = error.message;
  }
  return getResponseFormatter(response, status, message);
}
