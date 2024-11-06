import dbClient from "@/src/db/db.client";
import { v7 as uuidv7 } from "uuid";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import Invoice from "@/src/Models/Invoice";
import { getRespFormatte } from "@/src/app/components/utils/router/responseAction";
import { esResponseMessage } from "@/src/utils/messages/genaret.es.message";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import Organization from "../Models/Organization";
import Stakeholder from "../Models/Stakeholder";
import User from "../Models/User";
import Product from "../Models/Product";
import utilServices from "./util.services";
import converterServices from "./converter.services";

class InvoiceServices {
  getAll = async () => {
    let response = [],
      msg = esResponseMessage.foundAll(0, `Invoice`),
      status = false;
    try {
      await dbClient.dbConnect();
      response = await Invoice.find({}).select(["-_id", "-__v"]);
      if (!isEmptyOrNull(response)) {
        msg = esResponseMessage.foundAll(response.length, `Invoice`);
        status = true;
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Invoice Not found Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getOne = async (query: any) => {
    let response = null,
      msg = esResponseMessage.notFound("Invoice"),
      status = false;

    try {
      await dbClient.dbConnect();
      response = await Invoice.findOne(query);
      await dbClient.disconnect();

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Invoice");
      }
    } catch (error) {
      esBackLogger.info("Invoice Not found One Error ", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  getById = async (id: string) => {
    let response = null,
      status = false,
      msg = esResponseMessage.notFound("Invoice");

    try {
      await dbClient.dbConnect();
      response = await Invoice.findById(id);

      if (!isEmptyOrNull(response)) {
        status = true;
        msg = esResponseMessage.found("Invoice");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("User Not found Error getByLgoinOne", error);
      status = false;
    } finally {
      return getRespFormatte(response, status, msg);
    }
  };

  add = async (invoice: any) => {
    let addInvoice = null,
      status = false,
      msg = esResponseMessage.addFailed("Invoice");

    try {
      await dbClient.dbConnect();
      const newInvoice = new Invoice();
      const items = [];
      let totalQuantity = 0,
        agentTotalCharge = 0;
      for (const item of invoice.items) {
        const dbProduct = await Product.findOne({ id: item.id });

        let itemTotal = 0,
          subAgentCharge = 0,
          price = Number(item.price),
          qty = Number(item.qty);
        itemTotal = price * qty;
        totalQuantity += qty;

        if (dbProduct.agentCharge > 0) {
          subAgentCharge = dbProduct.agentCharge * qty;
        } else {
          let itemDiscount = converterServices.getPercentUsingTotalAmount(
            dbProduct.price,
            dbProduct.agentDiscount
          );
          subAgentCharge = itemDiscount * qty;
        }

        agentTotalCharge += subAgentCharge;

        items.push({
          product: dbProduct,
          name: dbProduct?.title,
          qty: item.qty,
          clientDiscount: item.clientDiscount,
          agentDiscount: dbProduct.agentDiscount,
          agentCharge: dbProduct.agentCharge,
          price: item.price,
          itemTotal: itemTotal > 0 ? itemTotal : 0,
        });
      }
      invoice.items = items;
      invoice.totalQuantity = totalQuantity;
      invoice.agentTotalCharge = agentTotalCharge;
      Object.assign(newInvoice, invoice);

      const id = await this.getUniqId();
      newInvoice.id = id;

      const dbOrganization = await Organization.findOne({
        id: invoice.organization,
      });
      newInvoice.organization = dbOrganization;

      const dbStakeholder = await Stakeholder.findOne({
        id: invoice.stakeholder,
      });
      const dbVendor = await User.findOne({ id: invoice.user });

      newInvoice.client = dbStakeholder;
      newInvoice.vendorUser = dbVendor;
      addInvoice = await newInvoice.save();

      if (!isEmptyOrNull(addInvoice)) {
        status = true;
        msg = esResponseMessage.addSuccessfully("Invoice");
      }

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Invoice Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  updateOne = async (uInvoice: any) => {
    let InvoiceUpdate = null,
      status = false,
      msg = esResponseMessage.updateFailed("Invoice");
    try {
      await dbClient.dbConnect();
      const { _id, ...invoice } = uInvoice;
      InvoiceUpdate = await Invoice.updateOne({ _id }, { $set: invoice });

      if (!isEmptyOrNull(InvoiceUpdate)) {
        status = true;
        msg = esResponseMessage.updated("Invoice");
      }
      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Invoice Added Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  update = async (uInvoices: any[]) => {
    let updateInvoice = null;
    try {
      await dbClient.dbConnect();

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Update Invoice Failed Error, ", error);
    } finally {
      return updateInvoice;
    }
  };

  remove = async (_id: any) => {
    let removeInvoice = null,
      status = true,
      msg = esResponseMessage.removeFailed("Invoice");
    try {
      await dbClient.dbConnect();
      removeInvoice = await Invoice.deleteOne({ _id });

      await dbClient.disconnect();
      if (!isEmptyOrNull(removeInvoice)) {
        status = true;
      }
    } catch (error) {
      esBackLogger.info("Invoice Delete Failed Error, ", error);
      status = false;
    } finally {
      return getRespFormatte(null, status, msg);
    }
  };

  getOneByPublicId = async (id: string) => {
    let invoice = null,
      status = false,
      msg = esResponseMessage.found("Invoice");

    try {
      await dbClient.dbConnect();
      invoice = await Invoice.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Invoice getOneByPublicId Error ", error);
    } finally {
      return getRespFormatte(invoice, status, msg);
    }
  };

  getOneByPublicIdPlane = async (id: string) => {
    let invoice = null;

    try {
      await dbClient.dbConnect();
      invoice = await Invoice.findOne({ publicId: id });

      await dbClient.disconnect();
    } catch (error) {
      esBackLogger.info("Invoice getOneByPublicId Error ", error);
    } finally {
      return invoice;
    }
  };

  getUniqId = async () => {
    const id = uuidv7();

    const invoice = await this.getOneByPublicIdPlane(id);

    if (!isEmptyOrNull(invoice)) {
      return this.getUniqId();
    }
    esBackLogger.info("Uniq ID ", id);
    return id;
  };
}

const invoiceServices = new InvoiceServices();

export default invoiceServices;
