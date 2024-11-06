
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatter, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { isEmptyOrNull } from '@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import menuServices from '@/src/services/menu.services';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';


class MenuController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respMenu = getRespFormatte(null, false, esResponseMessage.notFoundAll("Menu"));

        try {

            respMenu = await menuServices.getAll();
        } catch (error) {
            esBackLogger.info("menu Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respMenu);
        }


    }

    getOne = async (req: NextRequest, ctx: any) => {

        let menuResp = getRespFormatte(null, false, esResponseMessage.notFound(`Menu`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            menuResp = await menuServices.getOne(ctx.params?.id);


        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(menuResp);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(null, false, esResponseMessage.addFailed("Menu "));

        try {

            const reqMenu = await req.json();
            esBackLogger.info("Menu Added ", reqMenu);
            response = await menuServices.add(reqMenu);
            esBackLogger.info("CN response ", response);
        } catch (error) {
            esBackLogger.info("CN Add menu Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Menu "));
        try {

            const reqRole = await req.json();

            respUpdate = await menuServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("Role Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeMenu = getRespFormatte(null, false, esResponseMessage.removeFailed("Menu "));

        try {

            removeMenu = await menuServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveMenu CN Error ", error)


        } finally {
            return getResponseFormatterObj(removeMenu);
        }
    }



}

const menuController = new MenuController();
export default menuController;