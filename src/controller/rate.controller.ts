
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import RatingServices from '@/src/services/rate.services';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';


class RatingController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respRating = getRespFormatte(null, false, esResponseMessage.notFoundAll("Rating"));

        try {

            respRating = await RatingServices.getAll();
        } catch (error) {
            esBackLogger.info("Rating Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respRating);
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respRating = getRespFormatte(null, false, esResponseMessage.notFound(`Rating`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            respRating = await RatingServices.getOne(ctx.params?.id);
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respRating);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Rating "));

        try {

            const reqRating = await req.json();

            response = await RatingServices.add(reqRating);

        } catch (error) {
            esBackLogger.info("CN Add Rating Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Rating "));
        try {

            const reqRole = await req.json();

            respUpdate = await RatingServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("Rating Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeRating = getRespFormatte(null, false, esResponseMessage.removeFailed("Rating "));

        try {

            removeRating = await RatingServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveRating CN Error ", error)
        } finally {
            return getResponseFormatterObj(removeRating);
        }
    }

}

const ratingController = new RatingController();
export default ratingController;