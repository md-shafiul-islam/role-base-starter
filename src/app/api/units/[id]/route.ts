
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import unitController from '@/src/controller/unit.controller';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, ctx: any) {

  let respUnit = getRespFormatte(null, false, esResponseMessage.notFound("Unit"));

  try {

    return await unitController.getOne(request, ctx);

  } catch (error) {

    esBackLogger.info("Unit router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }


}


export async function DELETE(request: NextRequest, ctx: any) {

  let respUnit = getRespFormatte(null, false, esResponseMessage.notFoundAll("Unit"));

  try {

    return await unitController.remove(request, ctx);

  } catch (error) {

    esBackLogger.info("Unit router Resp Error ", error);
    return getResponseFormatterObj(respUnit)
  }


}
