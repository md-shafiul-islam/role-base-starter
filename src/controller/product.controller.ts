import { type NextRequest } from "next/server";
import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import productServices from "@/src/services/product.services";

import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import { isEmptyOrNull } from "../app/components/utils/Action/esFunc/gen-es/esCheckFunc";

class ProductController {
  getAllQuery = async (request: NextRequest, ctx: any) => {
    let respProduct = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Product By Query")
    );

    try {
      const query = await request.json();

      respProduct = await productServices.getAllByQuery(query);
    } catch (error) {
      esBackLogger.info("Product Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respProduct);
    }
  };

  getAll = async (req: NextRequest, ctx: any) => {
    let respProduct = getRespFormatte(
      null,
      false,
      esResponseMessage.notFoundAll("Product")
    );

    try {
      const reqUrl = new URL(req.url);

      const { searchParams, search } = reqUrl;

      if (searchParams.get("org")) {
        respProduct = await productServices.getAllByOrganization(
          searchParams.get("org")
        );
      } else if (!isEmptyOrNull(searchParams) && !isEmptyOrNull(search)) {
        respProduct = await productServices.getAllByQuery(searchParams);
      } else {
        respProduct = await productServices.getAll();
      }
    } catch (error) {
      esBackLogger.info("Product Controller, Get All Error, ", error);
    } finally {
      return getResponseFormatterObj(respProduct);
    }
  };

  getOne = async (req: NextRequest, ctx: any) => {
    let respProduct = getRespFormatte(
      null,
      false,
      esResponseMessage.notFound(`Product`)
    );

    try {
      respProduct = await productServices.getOne({ id: ctx.params?.id });
    } catch (error) {
      esBackLogger.info("Role Controller, Get One Error, ", error);
    } finally {
      return getResponseFormatterObj(respProduct);
    }
  };

  add = async (req: NextRequest, ctx: any) => {
    let response = getRespFormatte(esResponseMessage.addFailed("Product "));

    try {
      const reqProduct = await req.json();

      response = await productServices.add(reqProduct);
    } catch (error) {
      esBackLogger.info("CN Add Product Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOne = async (req: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Product ")
    );
    try {
      const reqRole = await req.json();

      respUpdate = await productServices.updateOne(reqRole);
    } catch (error) {
      esBackLogger.info("Product Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  addProductLocation = async (request: NextRequest, ctx: any) => {
    let response = getRespFormatte(
      esResponseMessage.addFailed("Product Location")
    );

    try {
      const reqProduct = await request.json();

      response = await productServices.addProductLocation(reqProduct);
    } catch (error) {
      esBackLogger.info("CN Add Product Error ", error);
    } finally {
      return getResponseFormatterObj(response);
    }
  };

  updateOneProductLocation = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.updateFailed("Product Location")
    );
    try {
      const reqRole = await request.json();

      respUpdate = await productServices.updateOneProductLocation(reqRole);
    } catch (error) {
      esBackLogger.info("Product Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  removeProductLocation = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Product Location")
    );
    try {
      const refererUrl = new URL(request.headers.get("referer"));
      const pathVar = refererUrl.pathname.split("/");
      const deleteQuery = { id: "", product: "" };
      if (pathVar.length > 0) {
        deleteQuery.product = pathVar[pathVar.length - 1];
      }
      const { searchParams } = new URL(request.url);

      deleteQuery.id = searchParams.get("id");
      respUpdate = await productServices.removeProductLocation(deleteQuery);
    } catch (error) {
      esBackLogger.info("Product Remove LOcation CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  activeToggle = async (request: NextRequest, ctx: any) => {
    let respUpdate = getRespFormatte(
      null,
      false,
      esResponseMessage.toogleStatusFailed("Product Active")
    );
    try {
      respUpdate = await productServices.activeToggle(ctx.params.id);
    } catch (error) {
      esBackLogger.info("Product Update CN Error ", error);
    } finally {
      return getResponseFormatterObj(respUpdate);
    }
  };

  remove = async (req: NextRequest, ctx: any) => {
    let removeProduct = getRespFormatte(
      null,
      false,
      esResponseMessage.removeFailed("Product ")
    );

    try {
      removeProduct = await productServices.remove(ctx?.params?.id);
    } catch (error) {
      esBackLogger.info("RemoveProduct CN Error ", error);
    } finally {
      return getResponseFormatterObj(removeProduct);
    }
  };
}

const productController = new ProductController();
export default productController;
