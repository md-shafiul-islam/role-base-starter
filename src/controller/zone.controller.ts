
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';

import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';
import zoneServices from '@/src/services/zone.services';


class ZoneController {


    getAll = async (req: NextRequest, ctx: any) => {

        let respZone = getRespFormatte(null, false, esResponseMessage.notFoundAll("Zone"));

        try {

            respZone = await zoneServices.getAll();
        } catch (error) {
            esBackLogger.info("Zone Controller, Get All Error, ", error);

        } finally {
            return respZone;
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respZone = getRespFormatte(null, false, esResponseMessage.notFound(`Zone`));

        try {
            esBackLogger.info("Get Zone Context ", ctx);
            respZone = await zoneServices.getOne({ id: ctx.params?.id });
        } catch (error) {

            esBackLogger.info("Zone Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respZone);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Zone "));

        try {

            const reqZone = await req.json();

            response = await zoneServices.add(reqZone);

        } catch (error) {
            esBackLogger.info("CN Add Zone Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Zone "));
        try {

            const reqZone = await req.json();

            respUpdate = await zoneServices.updateOne(reqZone);

        } catch (error) {
            esBackLogger.info("Zone Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeZone = getRespFormatte(null, false, esResponseMessage.removeFailed("Zone "));

        try {

            removeZone = await zoneServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveZone CN Error ", error)
            removeZone.status = false;
            removeZone.message = error.message;
        } finally {
            return getResponseFormatterObj(removeZone);
        }
    }

}

const zoneController = new ZoneController();
export default zoneController;