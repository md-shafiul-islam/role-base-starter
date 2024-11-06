
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import categoryServices from '../services/category.services';

import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';


class CategoryController {



    getAll = async (req: NextRequest, ctx: any) => {

        let respCategory = getRespFormatte(null, false, esResponseMessage.notFoundAll("Category"));

        try {
            const {searchParams} = new URL(req.url);

            console.log("Url searchParams ", searchParams.get("type"));
            if(searchParams.get("type") == "sub"){
                respCategory = await categoryServices.getAll(true);
            }else{
                respCategory = await categoryServices.getAll();
            }
           
        } catch (error) {
            esBackLogger.info("Category Controller, Get All Error, ", error);

        } finally {
            return respCategory;
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let CategoryResp = getRespFormatte(null, false, esResponseMessage.notFound(`Category`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            CategoryResp = await categoryServices.getOne({ id: ctx.params?.id });
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(CategoryResp);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Category "));

        try {

            const reqCategory = await req.json();

            response = await categoryServices.add(reqCategory);

        } catch (error) {
            esBackLogger.info("CN Add Category Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Category "));
        try {

            const reqCategory = await req.json();

            respUpdate = await categoryServices.updateOne(reqCategory);

        } catch (error) {
            esBackLogger.info("Role Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeCategory = getRespFormatte(null, false, esResponseMessage.removeFailed("Category "));

        try {
            
            removeCategory = await categoryServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveCategory CN Error ", error)
            removeCategory.status = false;
            removeCategory.message = error.message;
        } finally {
            return getResponseFormatterObj(removeCategory);
        }
    }

}

const categoryController = new CategoryController();
export default categoryController;