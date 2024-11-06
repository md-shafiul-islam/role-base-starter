const actionUrl = `${process.env.API_BASE_LINK}`;

import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import categoryController from '@/src/controller/category.controller';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, ctx: any) {

  let respCat = getRespFormatte(null, false, esResponseMessage.notFound("Categorries"));

  try {

    return await categoryController.getOne(request, ctx);

  } catch (error) {

    esBackLogger.info("Category router Resp Error ", error);
    return getResponseFormatterObj(respCat)
  }


}


export async function DELETE(request: NextRequest, ctx: any) {

  let respCat = getRespFormatte(null, false, esResponseMessage.notFoundAll("Categorries"));

  try {

    return await categoryController.remove(request, ctx);

  } catch (error) {

    esBackLogger.info("Category router Resp Error ", error);
    return getResponseFormatterObj(respCat)
  }


}
