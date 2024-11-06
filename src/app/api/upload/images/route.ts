

import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import categoryController from '@/src/controller/category.controller';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, ctx: any) {

  let respCat = getRespFormatte(null, false, esResponseMessage.notFoundAll("Categorries"));

  try {

    respCat = await categoryController.getAll(request, ctx);

  } catch (error) {

    esBackLogger.info("Category router Resp Error ", error);
  } finally {
    return getResponseFormatterObj(respCat)
  }



}

export async function POST(request: NextRequest, ctx: any) {

  let respCat = getRespFormatte(null, false, esResponseMessage.addFailed("Category"));

  try {

    return await categoryController.add(request, ctx);

  } catch (error) {

    esBackLogger.info("Category router Resp Error ", error);
    return getResponseFormatterObj(respCat)
  }

}


export async function PUT(request: NextRequest, ctx: any) {

  let respCat = getRespFormatte(null, false, esResponseMessage.updateFailed("Category"));
  try {

    return await categoryController.updateOne(request, ctx);

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
