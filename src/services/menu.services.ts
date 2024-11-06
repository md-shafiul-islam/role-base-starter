import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import Menu from "@/src/Models/Menu";
import { getRespFormatte, getResponseFormatter } from "@/src/app/components/utils/router/responseAction";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class MenuServices {

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `Menu`), status = false;
        try {
            await dbClient.dbConnect();
            response = await Menu.find({}).select("-_id");
            if (!isEmptyOrNull(response)) {
                msg = esResponseMessage.foundAll(response.length, `Menu`);
                status = true;
            }
            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("Menu Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("Menu"), status = false;


        try {
            await dbClient.dbConnect();
            response = await Menu.findOne(query);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Menu");
            }
        } catch (error) {
            esBackLogger.info("Menu Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("Menu");

        try {
            await dbClient.dbConnect();
            response = await Menu.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Menu");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("User Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (menu: any) => {
        let addMenu = null, status = false, msg = esResponseMessage.addFailed("Menu");

        try {

            await dbClient.dbConnect();
            const newMenu = new Menu();
            Object.assign(newMenu, menu);
            const id = await this.getUniqId();
            if (id) {
                newMenu.publicId = id;
            }

            addMenu = await newMenu.save();

            esBackLogger.info("Menu Add ", addMenu);

            if (!isEmptyOrNull(addMenu)) {
                esBackLogger.info("addMenu, ", addMenu);
                status = true;
                msg = esResponseMessage.addSuccessfully("Menu");
            }

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Menu Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uMenu: any) => {
        let menuUpdate = null, status = false, msg = esResponseMessage.updateFailed("Menu");
        try {
            await dbClient.dbConnect();
            const { _id, ...menu } = uMenu;
            menuUpdate = await Menu.updateOne({ _id }, { $set: menu });

            if (!isEmptyOrNull(menuUpdate)) {
                status = true;
                msg = esResponseMessage.updated("Menu");
            }
            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("User Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uMenus: any[]) => {
        let updateMenu = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update Menu Failed Error, ", error)
        } finally {
            return updateMenu;
        }
    }

    remove = async (_id: any) => {
        let removeMenu = null, status = true, msg = esResponseMessage.removeFailed("Menu");
        try {
            await dbClient.dbConnect();
            removeMenu = await Menu.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removeMenu)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("Menu Delete Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let menu = null, status = false, msg = esResponseMessage.found("Menu");

        try {
            await dbClient.dbConnect();
            menu = await Menu.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Menu getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(menu, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let menu = null;

        try {
            await dbClient.dbConnect();
            menu = await Menu.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Menu getOneByPublicId Error ", error);

        } finally {
            return menu;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const menu = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(menu)) {
            return this.getUniqId();
        }
        esBackLogger.info("Uniq ID ", id);
        return id
    }
}

const menuServices = new MenuServices();

export default menuServices;