
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import postServices from '@/src/services/post.services';

import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';

class PostController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respPost = getRespFormatte(null, false, esResponseMessage.notFoundAll("Post"));

        try {

            respPost = await postServices.getAll();
        } catch (error) {
            esBackLogger.info("Post Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respPost);
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respPost = getRespFormatte(null, false, esResponseMessage.notFound(`Post`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            respPost = await postServices.getOne(ctx.params?.id);
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respPost);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Post "));

        try {

            const reqPost = await req.json();

            response = await postServices.add(reqPost);

        } catch (error) {
            esBackLogger.info("CN Add Post Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Post "));
        try {

            const reqRole = await req.json();

            respUpdate = await postServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("Post Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removePost = getRespFormatte(null, false, esResponseMessage.removeFailed("Post "));

        try {

            removePost = await postServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemovePost CN Error ", error)
        } finally {
            return getResponseFormatterObj(removePost);
        }
    }

}

const postController = new PostController();
export default postController;