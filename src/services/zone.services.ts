import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import utilServices from "./util.services";
import Zone from "../Models/Area";
import Region from "../Models/Region";

class ZoneServices {

    createNestedCategories(categories: any[], parent = null): any[] {

        const ZoneItems = [];
        let cats = [];
        if (!parent) {
            cats = categories.filter((item) => item.parent === null);
        } else {
            cats = categories.filter((item) => utilServices.isEqualObjId(item.parent, parent));

        }

        for (let cat of cats) {
            const { _id, id, name, description, key, actionUrl, slug } = cat;
            const subCats = this.createNestedCategories(categories, _id);
            ZoneItems.push({ id, name, description, key, actionUrl, slug, subs: subCats })
        }

        return ZoneItems;
    }

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `Zone`), status = false;
        try {
            await dbClient.dbConnect();
            const categories = await Zone.find({}).select("-__v");
            if (!isEmptyOrNull(categories)) {
                msg = esResponseMessage.foundAll(categories.length, `Zone`);
                status = true;
            }
            response = this.createNestedCategories(categories, null);

            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("Zone Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("Zone"), status = false;

        try {
            await dbClient.dbConnect();
            response = await Zone.findOne(query).select(["-_id", "-__v"]);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Zone");
            }
        } catch (error) {
            esBackLogger.info("Zone Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("Zone");

        try {
            await dbClient.dbConnect();
            response = await Zone.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Zone");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Zone Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (zoneReq: any) => {
        let addZone = null, status = false, msg = esResponseMessage.addFailed("Zone");

        try {

            await dbClient.dbConnect();
            const newZone = new Zone()
            const { region, ...zone } = zoneReq;

            const dbRegion = await Region.findOne({ id: region });

            Object.assign(newZone, zone);
            zone.region = dbRegion;
            const id = await this.getUniqId();
            newZone.id = id;

            addZone = await newZone.save();

            if (!isEmptyOrNull(addZone)) {
                status = true;
                msg = esResponseMessage.addSuccessfully("Zone");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Zone Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uZone: any) => {
        let zoneUpdate = null, status = false, msg = esResponseMessage.updateFailed("Zone");
        try {
            await dbClient.dbConnect();
            const { id, slug, key, ...zone } = uZone;

            zoneUpdate = await Zone.updateOne({ id }, { $set: zone });

            if (!isEmptyOrNull(zoneUpdate)) {
                status = true;
                msg = esResponseMessage.updated("Zone");
            }
            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Zone Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uZones: any[]) => {
        let updateZone = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update Zone Failed Error, ", error);
        } finally {
            return updateZone;
        }
    }

    remove = async (id: any) => {

        let removeZone = null, status = true, msg = esResponseMessage.removeFailed("Zone");
        try {
            await dbClient.dbConnect();

            const dbZone = await Zone.findOne({ id });

            const { _id } = dbZone;
            removeZone = await Zone.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removeZone)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("Zone Delete Failed Error, ", error);
            status = false;
            msg = error.message;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let zone = null, status = false, msg = esResponseMessage.found("Zone");

        try {
            await dbClient.dbConnect();
            zone = await Zone.findOne({ id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Zone getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(zone, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let zone = null;

        try {
            await dbClient.dbConnect();
            zone = await Zone.findOne({ id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Zone getOneByPublicId Error ", error);

        } finally {
            return Zone;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const zone = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(zone)) {
            return this.getUniqId();
        }

        return id
    }
}

const zoneServices = new ZoneServices();

export default zoneServices;