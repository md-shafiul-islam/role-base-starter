import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";

import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import Review from "@/src/Models/Review";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";


class ReviewServices {

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `Review`), status = false;
        try {
            await dbClient.dbConnect();
            response = await Review.find({}).select("-_id");
            if (!isEmptyOrNull(response)) {
                msg = esResponseMessage.foundAll(response.length, `Review`);
                status = true;
            }
            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("Review Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("Review"), status = false;

        try {
            await dbClient.dbConnect();
            response = await Review.findOne(query);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Review");
            }
        } catch (error) {
            esBackLogger.info("Review Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("Review");

        try {
            await dbClient.dbConnect();
            response = await Review.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Review");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("User Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (review: any) => {
        let addReview = null, status = false, msg = esResponseMessage.addFailed("Review");

        try {
            await dbClient.dbConnect();
            const newReview = new Review();
            Object.assign(newReview, review);
            const id = await this.getUniqId();
            if (id) {
                newReview.publicId = id;
            }

            addReview = await newReview.save();

            if (!isEmptyOrNull(addReview)) {
                status = true;
                msg = esResponseMessage.addSuccessfully("Review");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Review Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uReview: any) => {
        let reviewUpdate = null, status = false, msg = esResponseMessage.updateFailed("Review");
        try {
            await dbClient.dbConnect();
            const { _id, ...review } = uReview;
            reviewUpdate = await Review.updateOne({ _id }, { $set: review });

            if (!isEmptyOrNull(reviewUpdate)) {
                status = true;
                msg = esResponseMessage.updated("Review");
            }
            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Review Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uReviews: any[]) => {
        let updateReview = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update Review Failed Error, ", error);
        } finally {
            return updateReview;
        }
    }

    remove = async (_id: any) => {
        let removeReview = null, status = true, msg = esResponseMessage.removeFailed("Review");
        try {
            await dbClient.dbConnect();
            removeReview = await Review.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removeReview)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("Review Delete Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let review = null, status = false, msg = esResponseMessage.found("Review");

        try {
            await dbClient.dbConnect();
            review = await Review.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Review getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(review, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let review = null;

        try {
            await dbClient.dbConnect();
            review = await Review.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Review getOneByPublicId Error ", error);

        } finally {
            return review;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const review = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(review)) {
            return this.getUniqId();
        }
        esBackLogger.info("Uniq ID ", id);
        return id
    }
}

const reviewServices = new ReviewServices();

export default reviewServices;