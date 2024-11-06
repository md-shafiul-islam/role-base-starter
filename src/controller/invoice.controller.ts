
import { type NextRequest, } from 'next/server';
import { getRespFormatte, getResponseFormatterObj } from '@/src/app/components/utils/router/responseAction';
import { esResponseMessage } from '@/src/utils/messages/genaret.es.message';
import invoiceServices from '@/src/services/invoice.services';
import { esBackLogger } from '@/src/utils/es-loger/es.back.logger';


class InvoiceController {

    getAll = async (req: NextRequest, ctx: any) => {

        let respInvoice = getRespFormatte(null, false, esResponseMessage.notFoundAll("Invoice"));

        try {

            respInvoice = await invoiceServices.getAll();
        } catch (error) {
            esBackLogger.info("Invoice Controller, Get All Error, ", error);

        } finally {
            return getResponseFormatterObj(respInvoice);
        }
    }

    getOne = async (req: NextRequest, ctx: any) => {

        let respInvoice = getRespFormatte(null, false, esResponseMessage.notFound(`Invoice`));

        try {
            esBackLogger.info("Get Role Context ", ctx);
            respInvoice = await invoiceServices.getOne(ctx.params?.id);
        } catch (error) {

            esBackLogger.info("Role Controller, Get One Error, ", error);
        } finally {
            return getResponseFormatterObj(respInvoice);
        }


    }

    add = async (req: NextRequest, ctx: any) => {
        let response = getRespFormatte(esResponseMessage.addFailed("Invoice "));

        try {

            const reqInvoice = await req.json();
            
            response = await invoiceServices.add(reqInvoice);

        } catch (error) {
            esBackLogger.info("CN Add Invoice Error ", error)

        } finally {
            return getResponseFormatterObj(response);
        }
    }

    updateOne = async (req: NextRequest, ctx: any) => {


        let respUpdate = getRespFormatte(null, false, esResponseMessage.updateFailed("Invoice "));
        try {

            const reqRole = await req.json();

            respUpdate = await invoiceServices.updateOne(reqRole);

        } catch (error) {
            esBackLogger.info("Invoice Update CN Error ", error)

        } finally {
            return getResponseFormatterObj(respUpdate);
        }
    }

    remove = async (req: NextRequest, ctx: any) => {
        let removeInvoice = getRespFormatte(null, false, esResponseMessage.removeFailed("Invoice "));

        try {

            removeInvoice = await invoiceServices.remove(ctx?.params?.id);

        } catch (error) {
            esBackLogger.info("RemoveInvoice CN Error ", error)
        } finally {
            return getResponseFormatterObj(removeInvoice);
        }
    }

}

const invoiceController = new InvoiceController();
export default invoiceController;