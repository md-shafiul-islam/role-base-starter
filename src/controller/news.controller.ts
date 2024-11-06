
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import newsServices from '@/src/services/news.services';

import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';



class NewsController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respNews = getRespFormatte(null, false, esResponseMessage.notFoundAll("News"));

        try {

            respNews = await newsServices.getAll();
        } catch (error) {
            esBackLogger.info("News Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respNews);
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respNews = getRespFormatte(null, false, esResponseMessage.notFound(`News`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            respNews = await newsServices.getOne(ctx.params?.id);
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respNews);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("News "));

        try {

            const reqNews = await req.json();

            response = await newsServices.add(reqNews);

        } catch (error) {
            esBackLogger.info("CN Add News Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("News "));
        try {

            const reqRole = await req.json();

            respUpdate = await newsServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("News Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeNews = getRespFormatte(null, false, esResponseMessage.removeFailed("News "));

        try {

            removeNews = await newsServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveNews CN Error ", error)
        } finally {
            return getResponseFormatterObj(removeNews);
        }
    }

}

const newsController = new NewsController();
export default newsController;