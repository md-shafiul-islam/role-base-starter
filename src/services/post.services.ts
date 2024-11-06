import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from 'uuid';
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Post from "@/src/Models/Post";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";

class PostServices {

    getAll = async () => {
        let response = [], msg = esResponseMessage.foundAll(0, `Post`), status = false;
        try {
            await dbClient.dbConnect();
            response = await Post.find({}).select("-_id");
            if (!isEmptyOrNull(response)) {
                msg = esResponseMessage.foundAll(response.length, `Post`);
                status = true;
            }
            await dbClient.disconnect();

        } catch (error) {
            esBackLogger.info("Post Not found Error ", error)
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getOne = async (query: any) => {
        let response = null, msg = esResponseMessage.notFound("Post"), status = false;

        try {
            await dbClient.dbConnect();
            response = await Post.findOne(query);
            await dbClient.disconnect();

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Post");
            }
        } catch (error) {
            esBackLogger.info("Post Not found One Error ", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    getById = async (id: string) => {
        let response = null, status = false, msg = esResponseMessage.notFound("Post");

        try {
            await dbClient.dbConnect();
            response = await Post.findById(id);

            if (!isEmptyOrNull(response)) {
                status = true;
                msg = esResponseMessage.found("Post");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("User Not found Error getByLgoinOne", error);
            status = false;
        } finally {
            return getRespFormatte(response, status, msg);
        }
    }

    add = async (post: any) => {
        let addPost = null, status = false, msg = esResponseMessage.addFailed("Post");

        try {

            await dbClient.dbConnect();
            const newPost = new Post();
            Object.assign(newPost, post);
            const id = await this.getUniqId();
            if (id) {
                newPost.publicId = id;
            }

            addPost = await newPost.save();

            if (!isEmptyOrNull(addPost)) {
                status = true;
                msg = esResponseMessage.addSuccessfully("Post");
            }

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Post Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    updateOne = async (uPost: any) => {
        let postUpdate = null, status = false, msg = esResponseMessage.updateFailed("Post");
        try {
            await dbClient.dbConnect();
            const { _id, ...post } = uPost;
            postUpdate = await Post.updateOne({ _id }, { $set: post });

            if (!isEmptyOrNull(postUpdate)) {
                status = true;
                msg = esResponseMessage.updated("Post");
            }
            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Post Added Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    update = async (uPosts: any[]) => {
        let updatePost = null;
        try {
            await dbClient.dbConnect();

            await dbClient.disconnect()
        } catch (error) {
            esBackLogger.info("Update Post Failed Error, ", error);
        } finally {
            return updatePost;
        }
    }

    remove = async (_id: any) => {
        let removePost = null, status = true, msg = esResponseMessage.removeFailed("Post");
        try {
            await dbClient.dbConnect();
            removePost = await Post.deleteOne({ _id });

            await dbClient.disconnect();
            if (!isEmptyOrNull(removePost)) {
                status = true;
            }
        } catch (error) {
            esBackLogger.info("Post Delete Failed Error, ", error);
            status = false;
        } finally {
            return getRespFormatte(null, status, msg);
        }
    }

    getOneByPublicId = async (id: string) => {
        let post = null, status = false, msg = esResponseMessage.found("Post");

        try {
            await dbClient.dbConnect();
            post = await Post.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Post getOneByPublicId Error ", error);

        } finally {
            return getRespFormatte(post, status, msg);
        }
    }

    getOneByPublicIdPlane = async (id: string) => {
        let post = null;

        try {
            await dbClient.dbConnect();
            post = await Post.findOne({ publicId: id });

            await dbClient.disconnect();
        } catch (error) {
            esBackLogger.info("Post getOneByPublicId Error ", error);

        } finally {
            return post;
        }
    }



    getUniqId = async () => {

        const id = uuidv7();

        const post = await this.getOneByPublicIdPlane(id);

        if (!isEmptyOrNull(post)) {
            return this.getUniqId();
        }
        esBackLogger.info("Uniq ID ", id);
        return id
    }
}

const postServices = new PostServices();

export default postServices;