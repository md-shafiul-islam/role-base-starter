
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import ReviewServices from '@/src/services/review.services';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';


class ReviewController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respReview = getRespFormatte(null, false, esResponseMessage.notFoundAll("Review"));

        try {

            respReview = await ReviewServices.getAll();
        } catch (error) {
            esBackLogger.info("Review Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respReview);
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respReview = getRespFormatte(null, false, esResponseMessage.notFound(`Review`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            respReview = await ReviewServices.getOne(ctx.params?.id);
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respReview);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Review "));

        try {

            const reqReview = await req.json();

            response = await ReviewServices.add(reqReview);

        } catch (error) {
            esBackLogger.info("CN Add Review Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Review "));
        try {

            const reqRole = await req.json();

            respUpdate = await ReviewServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("Review Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeReview = getRespFormatte(null, false, esResponseMessage.removeFailed("Review "));

        try {

            removeReview = await ReviewServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveReview CN Error ", error)
        } finally {
            return getResponseFormatterObj(removeReview);
        }
    }

}

const reviewController = new ReviewController();
export default reviewController;