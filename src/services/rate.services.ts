import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import Rating from "@/src/Models/Rating";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class RatingServices {

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `Rating`), status = false;
        try {
            await dbClient.dbConnect();
            response = await Rating.find({}).select("-_id");
            if (!isEmptyOrNull(response)) {
                msg = esResponseMessage.foundAll(response.length, `Rating`);
                status = true;
            }
            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("Rating Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("Rating"), status = false;

        try {
            await dbClient.dbConnect();
            response = await Rating.findOne(query);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Rating");
            }
        } catch (error) {
            esBackLogger.info("Rating Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("Rating");

        try {
            await dbClient.dbConnect();
            response = await Rating.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Rating");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("User Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (rating: any) => {
        let addRating = null, status = false, msg = esResponseMessage.addFailed("Rating");

        try {

            await dbClient.dbConnect();
            const newRating = new Rating();
            Object.assign(newRating, rating);
            const id = await this.getUniqId();
            if (id) {
                newRating.publicId = id;
            }

            addRating = await newRating.save();

            if (!isEmptyOrNull(addRating)) {
                status = true;
                msg = esResponseMessage.addSuccessfully("Rating");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Rating Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uRating: any) => {
        let ratingUpdate = null, status = false, msg = esResponseMessage.updateFailed("Rating");
        try {
            await dbClient.dbConnect();
            const { _id, ...Rating } = uRating;
            ratingUpdate = await Rating.updateOne({ _id }, { $set: Rating });

            if (!isEmptyOrNull(ratingUpdate)) {
                status = true;
                msg = esResponseMessage.updated("Rating");
            }
            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Rating Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uRatings: any[]) => {
        let updateRating = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update Rating Failed Error, ", error);
        } finally {
            return updateRating;
        }
    }

    remove = async (_id: any) => {
        let removeRating = null, status = true, msg = esResponseMessage.removeFailed("Rating");
        try {
            await dbClient.dbConnect();
            removeRating = await Rating.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removeRating)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("Rating Delete Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let rating = null, status = false, msg = esResponseMessage.found("Rating");

        try {
            await dbClient.dbConnect();
            rating = await Rating.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Rating getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(rating, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let rating = null;

        try {
            await dbClient.dbConnect();
            rating = await Rating.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Rating getOneByPublicId Error ", error);

        } finally {
            return rating;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const Rating = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(Rating)) {
            return this.getUniqId();
        }
        esBackLogger.info("Uniq ID ", id);
        return id
    }
}

const ratingServices = new RatingServices();

export default ratingServices;