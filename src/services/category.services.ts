import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Category from "@/src/Models/Category";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import utilServices from "./util.services";

class CategoryServices {
  createNestedCategories(categories: any[], parent = null): any[] {
    const categoryItems = [];
    let cats = [];
    if (!parent) {
      cats = categories.filter((item) => item.parent === null);
    } else {
      cats = categories.filter((item) =>
        utilServices.isEqualObjId(item.parent, parent)
      );
    }

    for (let cat of cats) {
      const { _id, id, name, description, key, actionUrl, slug } = cat;
      const subCats = this.createNestedCategories(categories, _id);
      categoryItems.push({
        id,
        name,
        description,
        key,
        actionUrl,
        slug,
        subs: subCats,
      });
    }

    return categoryItems;
  }

  getAll = async (type = false) => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Category`),
      status = false;
    try {
      await dbClient.dbConnect();
      const categories = await Category.find({}).select("-__v");
      if (!isEmptyOrNull(categories)) {
        msg = esResponseMessage.foundAll(categories.length, `Category`);
        status = true;
      }

      if (type) {
        response = this.createNestedCategories(categories, null);
      } else {
        response = categories;
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Category"),
      status = false;

    try {
      await dbClient.dbConnect();

      const dbCategory = await Category.findOne(query)
        .select(["-__v"])
        .populate("parent");

      const { id, parent, isSub, actionUrl, description, key, name, slug } =
        dbCategory;
      let lIsSub = isSub;
      if (parent !== null && !isSub) {
        if (!isSub) {
          console.log("Category Found By Paren Update ", parent);
          lIsSub = true;
          await Category.updateOne({ id }, { $set: { isSub: true } });
        }
      }
      console.log("dbCategory, ", dbCategory);
      response = {
        id,
        isSub: lIsSub,
        actionUrl,
        description,
        key,
        name,
        slug,
      };

      if (lIsSub) {
        response.parent = parent.id;
      }

      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Category");
      }
    } catch (error) {
      esBackLogger.info("Category Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Category");

    try {
      await dbClient.dbConnect();
      response = await Category.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Category");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (categoryReq: any) => {
    let addCategory = null,
      status = false,
      msg = esResponseMessage.addFailed("Category");

    try {
      await dbClient.dbConnect();
      const newCategory = new Category();
      const { parent, ...category } = categoryReq;

      const dbCategory = await Category.findOne({ id: parent });
      category.parent = dbCategory;
      if (!isEmptyOrNull(dbCategory)) {
        category.isSub = true;
      }
      Object.assign(newCategory, category);
      const id = await this.getUniqId();
      newCategory.id = id;

      addCategory = await newCategory.save();

      if (!isEmptyOrNull(addCategory)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Category");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uCategory: any) => {
    let categoryUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Category");
    try {
      console.log("Update Category, ", uCategory);
      await dbClient.dbConnect();

      const { id, slug, key, parent, actionUrl, description, isSub, name } =
        uCategory;

      const dbCategory = await Category.findOne({ id }).populate("parent");

      if (!isEmptyOrNull(dbCategory)) {
        const pId = dbCategory.parent?.id;

        if (!utilServices.isStringEqualFirstIsNotNull(parent, pId)) {
          const parentCat = await Category.findOne({ id: parent });
          dbCategory.parent = parentCat;

          if (!isEmptyOrNull(parentCat)) {
            dbCategory.isSub = true;
          } else {
            dbCategory.isSub = false;
          }
        }
        dbCategory.name = name;
        dbCategory.slug = slug;
        dbCategory.key = key;
        dbCategory.actionUrl = actionUrl;
        dbCategory.description = description;

        categoryUpdate = await dbCategory.save();

        console.log("Update Category ", categoryUpdate);
      }

      if (!isEmptyOrNull(categoryUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Category");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uCategorys: any[]) => {
    let updateCategory = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Category Failed Error, ", error);
    } finally {
      return updateCategory;
    }
  };

  remove = async (id: any) => {
    let removeCategory = null,
      status = true,
      msg = esResponseMessage.removeFailed("Category");
    try {
      await dbClient.dbConnect();

      const category = await Category.findOne({ id });

      const categories = await Category.find({ parent: category._id });
      if (!isEmptyOrNull(categories)) {
        throw new Error(
          "Category has sub category, You can only remove parent category"
        );
      }
      const { _id } = category;
      removeCategory = await Category.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeCategory)) {
        status = true;
        msg = `Category Remove ${category.name}`;
      }
    } catch (error) {
      esBackLogger.info("Category Delete Failed Error, ", error);
      status = false;
      msg = error.message;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let category = null,
      status = false,
      msg = esResponseMessage.found("Category");

    try {
      await dbClient.dbConnect();
      category = await Category.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(category, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let category = null;

    try {
      await dbClient.dbConnect();
      category = await Category.findOne({ id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Category getOneByPublicId Error ", error);
    } finally {
      return category;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const category = await this.getOneByPublicIdPlane(id);

    console.log("Category ID, ", id);
    if (!isEmptyOrNull(category)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const categoryServices = new CategoryServices();

export default categoryServices;
