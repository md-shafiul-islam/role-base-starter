import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import News from "@/src/Models/News";

class NewsServices {

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `News`), status = false;
        try {
            await dbClient.dbConnect();
            response = await News.find({}).select("-_id");
            if (!isEmptyOrNull(response)) {
                msg = esResponseMessage.foundAll(response.length, `News`);
                status = true;
            }
            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("News Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("News"), status = false;

        try {
            await dbClient.dbConnect();
            response = await News.findOne(query);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("News");
            }
        } catch (error) {
            esBackLogger.info("News Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("News");

        try {
            await dbClient.dbConnect();
            response = await News.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("News");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("User Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (news: any) => {
        let addNews = null, status = false, msg = esResponseMessage.addFailed("News");

        try {

            await dbClient.dbConnect();
            const newNews = new News();
            Object.assign(newNews, news);
            const id = await this.getUniqId();
            if (id) {
                newNews.publicId = id;
            }

            addNews = await newNews.save();

            if (!isEmptyOrNull(addNews)) {
                status = true;
                msg = esResponseMessage.addSuccessfully("News");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("News Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uNews: any) => {
        let newsUpdate = null, status = false, msg = esResponseMessage.updateFailed("News");
        try {
            await dbClient.dbConnect();
            const { _id, ...news } = uNews;
            newsUpdate = await News.updateOne({ _id }, { $set: news });

            if (!isEmptyOrNull(newsUpdate)) {
                status = true;
                msg = esResponseMessage.updated("News");
            }
            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("News Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uNewss: any[]) => {
        let updateNews = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update News Failed Error, ", error);
        } finally {
            return updateNews;
        }
    }

    remove = async (_id: any) => {
        let removeNews = null, status = true, msg = esResponseMessage.removeFailed("News");
        try {
            await dbClient.dbConnect();
            removeNews = await News.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removeNews)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("News Delete Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let news = null, status = false, msg = esResponseMessage.found("News");

        try {
            await dbClient.dbConnect();
            news = await News.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("News getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(news, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let news = null;

        try {
            await dbClient.dbConnect();
            news = await News.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("News getOneByPublicId Error ", error);

        } finally {
            return News;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const news = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(news)) {
            return this.getUniqId();
        }
        esBackLogger.info("Uniq ID ", id);
        return id
    }
}

const newsServices = new NewsServices();

export default newsServices;