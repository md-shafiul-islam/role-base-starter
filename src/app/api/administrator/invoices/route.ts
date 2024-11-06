import {
  getRespFormatte,
  getResponseFormatterObj,
} from "@/src/app/components/utils/router/responseAction";
import invoiceController from "@/src/controller/invoice.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, ctx: any) {
  let response = getRespFormatte();

  try {
    return await invoiceController.getAll(request, ctx);
  } catch (error) {
    response.message = `API Error Coonection ${error.message}`;
    return getResponseFormatterObj(response);
  }
}

export async function POST(request: NextRequest, ctx: any) {
  let response = getRespFormatte();

  try {
    return await invoiceController.add(request, ctx);
  } catch (error) {
    response.message = `API Error Coonection ${error.message}`;
    return getResponseFormatterObj(response);
  }
}
