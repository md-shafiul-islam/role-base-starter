import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Product from "@/src/Models/Product";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import Category from "@/src/Models//Category";
import Organization from "@/src/Models//Organization";
import Unit from "@/src/Models//Unit";
import Specification from "@/src/Models//Specification";
import SpecKey from "@/src/Models//SpecKey";
import Address from "@/src/Models//Address";
import addressServices from "./address.services";
import User from "@/src/Models//User";
import { auth } from "@/src/auth";
import utilServices from "./util.services";
import Region from "../Models/Region";

class ProductServices {
  getAllByOrganization = async (organization: string) => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Organization All Product`),
      status = false;
    try {
      await dbClient.dbConnect();
      const session = await auth();

      if (isEmptyOrNull(organization)) {
        organization = session?.user?.organization;
      }

      response = await Product.find({ organization }).select(["-_id", "-__v"]);

      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(
          response.length,
          `Organization Product`
        );
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Organization All Product Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };
  getAllByQuery = async (query: any) => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Query Product`),
      status = false;
    try {
      await dbClient.dbConnect();

      response = await Product.find(query).select(["-_id", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Query Product`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Query All Product Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Product`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Product.find({}).select(["-_id", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Product`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Product Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Product"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Product.findOne(query)
        .select(["-_id", "-__v"])
        .populate("specifications", ["-__v"])
        .populate("category", ["-_id", "-__v"])
        .populate("organization", ["-_id", "-__v"])
        .populate("user", [
          "-_id",
          "-__v",
          "-password",
          "-email",
          "-isActive",
          "-isEmailVerified",
          "-isVerified",
          "-phoneNo",
          "-role",
          "-createdAt",
          "-updatedAt",
          "-userName",
        ])
        .populate("unit", ["-_id", "-__v"])
        .populate("locations", ["-_id", "-__v"]);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Product");
      }
    } catch (error) {
      esBackLogger.info("Product Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Product");

    try {
      await dbClient.dbConnect();
      response = await Product.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Product");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (productReq: any) => {
    let addProduct = null,
      status = false,
      msg = esResponseMessage.addFailed("Product");

    const session = await auth();
    console.log("Product session, ", session);
    const id = await this.getUniqId();

    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();

      console.log("Product Add Req ", productReq);
      const {
        category,
        organization,
        unit,
        images,
        specifications,
        locations,
        ...product
      } = productReq;

      const dbUser = await User.findOne({ id: session?.user?.id });

      if (isEmptyOrNull(dbUser)) {
        throw new Error(esResponseMessage.notFound("User Aut failed"));
      }

      const dbCat = await Category.findOne({ id: category });
      if (isEmptyOrNull(dbCat)) {
        throw new Error(esResponseMessage.notFound("Product Category"));
      }

      const dbOrg = await Organization.findOne({ id: organization });

      if (isEmptyOrNull(dbOrg)) {
        throw new Error(esResponseMessage.notFound("Product Organization"));
      }

      const dbUnit = await Unit.findOne({ id: unit });

      if (isEmptyOrNull(dbUnit)) {
        throw new Error(esResponseMessage.notFound("Product Unit"));
      }

      const productSpcs = await this.setProductAllSpc(specifications);
      console.log("Product Specifications, productSpcs, ", productSpcs);

      const dbSpcs = await Specification.insertMany(productSpcs);
      console.log("Product Specifications, ", dbSpcs);

      const productLocations = await this.serProductAllLocations(locations);

      const dbLocations = await Address.insertMany(productLocations);
      const validImages = [];

      for (const image of images) {
        if (!isEmptyOrNull(image)) {
          if (!isEmptyOrNull(image.url)) {
            validImages.push(validImages);
          }
        }
      }

      if (isEmptyOrNull(product.barCode)) {
        product.barCode = await this.getProductBarCode();
      }

      const newProduct = new Product();
      Object.assign(newProduct, product);

      if (!isEmptyOrNull(product.aliasName)) {
        newProduct.aliasName = utilServices.toAliasName(product.aliasName);
      } else {
        newProduct.aliasName = utilServices.toAliasName(product.title);
      }

      newProduct.id = id;
      newProduct.specifications = dbSpcs;
      newProduct.locations = dbLocations;
      newProduct.unit = dbUnit;
      newProduct.category = dbCat;
      newProduct.organization = dbOrg;
      newProduct.user = dbUser;
      newProduct.images = validImages;

      addProduct = await newProduct.save();

      console.log("Add New Product, ", newProduct);

      if (!isEmptyOrNull(addProduct)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Product");
      }

      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Role Added Failed Error, ", error);
      status = false;
      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  serProductAllLocations = async (
    locations: [
      {
        city: 0;
        region: null;
        name: null;
        description: null;
        phoneNo: null;
      }
    ]
  ) => {
    if (!isEmptyOrNull(locations)) {
      const items = [];
      for (const location of locations) {
        const addreess = new Address();

        const dbRegion = await Region.findOne({
          key: location?.region,
        }).populate("city");

        addreess.id = await addressServices.getUniqId();
        addreess.region = dbRegion;
        addreess.regionName = dbRegion?.name;
        addreess.city = dbRegion?.city.name;

        addreess.phoneNo = location.phoneNo;
        addreess.details = location.description;

        items.push(addreess);
      }
      return items;
    }
    return null;
  };

  setProductAllSpc = async (
    spcs: [
      {
        key: null;
        value: null;
        description: null;
      }
    ]
  ) => {
    if (!isEmptyOrNull(spcs)) {
      const specifications = [];

      for (const spc of spcs) {
        const specification = new Specification();

        const spcKey = await SpecKey.findOne({ id: spc.key });
        specification.spsKey = spcKey;
        specification.name = spcKey.name;
        specification.value = spc.value;
        specification.description = spc.description;
        specifications.push(specification);
      }

      return specifications;
    }

    return null;
  };

  updateOne = async (uProduct: any) => {
    let productUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Product");
    try {
      await dbClient.dbConnect();
      const { _id, ...product } = uProduct;
      productUpdate = await Product.updateOne({ _id }, { $set: product });

      if (!isEmptyOrNull(productUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Product");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Product Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  activeToggle = async (id: any) => {
    let productUpdate = null,
      status = false,
      msg = esResponseMessage.toogleStatusFailed("Product");
    try {
      await dbClient.dbConnect();
      const dbProduct = await Product.findOne({ id });

      const { isActive } = dbProduct;
      productUpdate = await Product.updateOne(
        { id },
        { $set: { isActive: !isActive } }
      );

      if (!isEmptyOrNull(productUpdate)) {
        status = true;
        msg = esResponseMessage.toogleStatusSuccessfully(
          `Product ${isActive ? "In-Active" : "Active"}`
        );
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Product Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uProducts: any[]) => {
    let updateProduct = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Product Failed Error, ", error);
    } finally {
      return updateProduct;
    }
  };

  remove = async (_id: any) => {
    let removeProduct = null,
      status = true,
      msg = esResponseMessage.removeFailed("Product");
    try {
      await dbClient.dbConnect();
      removeProduct = await Product.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeProduct)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Product Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let product = null,
      status = false,
      msg = esResponseMessage.found("Product");

    try {
      await dbClient.dbConnect();
      product = await Product.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Product getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(product, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let product = null;

    try {
      await dbClient.dbConnect();
      product = await Product.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Product getOneByPublicId Error ", error);
    } finally {
      return product;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const dbProduct = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(dbProduct)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };

  //Product Location Start

  addProductLocation = async (reqProductLocation: any) => {
    let addProduct = null,
      status = false,
      msg = esResponseMessage.addFailed("Product Location");

    const id = await addressServices.getUniqId();

    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();

      const { product, region, ...location } = reqProductLocation;

      const dbProduct = await Product.findOne({ id: product });

      if (isEmptyOrNull(dbProduct)) {
        throw new Error(
          esResponseMessage.notFound("Product 'Add Product Loaction'")
        );
      }

      const dbRegion = await Region.findOne({ key: region }).populate("city");

      if (isEmptyOrNull(dbRegion)) {
        throw new Error(esResponseMessage.notFound("Product Location Region"));
      }

      const nLocation = new Address();

      nLocation.id = id;
      nLocation.region = dbRegion;
      nLocation.regionName = dbRegion?.name;
      nLocation.city = dbRegion?.city.name;
      nLocation.name = location.name;
      nLocation.phoneNo = location.phoneNo;
      nLocation.details = location.description;
      await nLocation.save();
      let { _id, locations } = dbProduct;

      if (Array.isArray(locations)) {
        locations.push(nLocation);
      } else {
        locations = [nLocation];
      }

      const updateProduct = await Product.updateOne(
        { _id },
        { $set: { locations } }
      );

      if (isEmptyOrNull(updateProduct)) {
        throw new Error(
          esResponseMessage.notFound("Product Location Add failed")
        );
      }

      if (!isEmptyOrNull(updateProduct)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Product Location");
      }

      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Product Address Added Failed Error, ", error);
      status = false;
      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  updateOneProductLocation = async (reqProductLocation: any) => {
    let status = false,
      msg = esResponseMessage.updateFailed("Product Location");

    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();
      console.log("Product Update Location, ", reqProductLocation);
      const { id, region, description, name, phoneNo } = reqProductLocation;

      const dbLocation = await Address.findOne({ id });

      console.log("Product Location, ", dbLocation);
      if (isEmptyOrNull(dbLocation)) {
        throw new Error(
          esResponseMessage.notFound("Product Location Not found")
        );
      }

      const dbRegion = await Region.findOne({ _id: region }).populate("city");

      if (isEmptyOrNull(dbRegion)) {
        throw new Error(esResponseMessage.notFound("Product Location Region"));
      }

      if (!isEmptyOrNull(dbRegion)) {
        dbLocation.region = dbRegion;
        dbLocation.regionName = dbRegion?.name;
        dbLocation.city = dbRegion?.city.name;
      }

      if (!isEmptyOrNull(name)) {
        dbLocation.name = name;
      }

      if (!isEmptyOrNull(phoneNo)) {
        dbLocation.phoneNo = phoneNo;
      }

      if (!isEmptyOrNull(description)) {
        dbLocation.details = description;
      }

      const updateLocation = await dbLocation.save();

      if (!isEmptyOrNull(updateLocation)) {
        msg = esResponseMessage.updated("Product Location");
        status = true;
      }

      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Product Address Update Failed Error, ", error);
      status = false;
      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  removeProductLocation = async (query: any) => {
    let status = false,
      msg = esResponseMessage.removeFailed("Product Location");

    await dbClient.dbConnect();
    const dbSession = await dbClient.getConnect().startSession();

    try {
      await dbSession.startTransaction();

      const { id, product } = query;

      const dbLocation = await Address.findOne({ id });

      if (isEmptyOrNull(dbLocation)) {
        throw new Error(
          esResponseMessage.notFound("Product Location Not found")
        );
      }

      const dbProduct = await Product.findOne({ id: product }).populate(
        "locations"
      );

      const locations = [];
      for (const location of dbProduct.locations) {
        if (location._id !== dbLocation._id) {
          locations.push(location);
        }
      }

      const updateProduct = await Product.updateOne(
        { id },
        { $set: { locations } }
      );

      esBackLogger.info(
        "Product LOcation Remove Update Product ",
        updateProduct
      );

      const remove = await Address.deleteOne({ _id: dbLocation._id });

      if (!isEmptyOrNull(remove)) {
        status = true;
        msg = esResponseMessage.removeSuccessfully("Product Location");
      }
      await dbSession.commitTransaction();
    } catch (error) {
      esBackLogger.info("Product Address Update Failed Error, ", error);
      status = false;

      await dbSession.abortTransaction();
    } finally {
      await dbClient.disconnect();
      return getRespFormatte(null, status, msg);
    }
  };

  //Product Location End

  getProductBarCode = async () => {
    const barCode =
      utilServices.getRandomChar(2) + utilServices.getRandomNum(8);

    console.log("getProductBarCode, ", barCode);
    const dbProduct = await Product.findOne({ barCode });

    if (!isEmptyOrNull(dbProduct)) {
      this.getProductBarCode();
    }

    return barCode;
  };
}

const productServices = new ProductServices();

export default productServices;
