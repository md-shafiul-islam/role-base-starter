import { REQUEST_HEADER } from "@/src/app/components/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const initialState = {
  added: {},
  invoices: [],
  pending: {},
  canceled: {},
};

const invoicelSlice = createSlice({
  name: "invoice",
  initialState: initialState,

  reducers: {
    restInvoice: (state) => {
      state.added = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(thunkPlaceInvoice.fulfilled, (state, action) => {
        state.added = action.payload;
      })
      .addCase(thunkAllInvoiceByStatus.fulfilled, (state, action) => {
        esFrontLogger.info("Redux Response ", action.payload);
        state.adminOrders = action.payload;
      })
      .addCase(thunkInvoiceApprove.fulfilled, (state, action) => {
        state.approve = action.payload;
      })
      .addCase(thunkInvoiceCancel.fulfilled, (state, action) => {
        state.canceled = action.payload;
      })
      .addCase(thunkInvoiceShipped.fulfilled, (state, action) => {
        esFrontLogger.info("thunkOrderShipped, ", action)
        state.shipped = action.payload;
      })
      .addCase(thunkAllPrintableInvoiceByStatus.fulfilled, (state, action) => {
        state.printableOrders = action.payload;
      });
  },
});

export const { restInvoice } = invoicelSlice.actions;
export default invoicelSlice.reducer;

export const thunkPlaceInvoice = createAsyncThunk(
  "invoice/placeing",
  async (invoiceReq, thunkApi) => {
    try {
      const invoiceResp = await axios.post(`/api/administrator/invoices`, invoiceReq);

      return { errorStatus: false, ...invoiceResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);

export const thunkAllInvoiceByStatus = createAsyncThunk(
  "invoice/all_pending",
  async (status, thunkApi) => {
    try {
      const invoiceResp = await axios.get(
        `/api/administrator/invoices?type=${status}`,
        { headers: REQUEST_HEADER }
      );

      return { errorStatus: false, ...invoiceResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);

export const thunkInvoiceApprove = createAsyncThunk(
  "invoice/approve",
  async (id, thunkApi) => {
    try {
      const invoiceResp = await axios.post(
        `/api/administrator/invoices/approve`,
        { order: id },
        { headers: REQUEST_HEADER }
      );

      return { errorStatus: false, ...invoiceResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);

export const thunkInvoiceCancel = createAsyncThunk(
  "invoice/cancel",
  async (id, thunkApi) => {
    try {
      const invoiceResp = await axios.post(
        `/api/administrator/invoices/cancel`,
        { order: id },
        {
          headers: REQUEST_HEADER,
        }
      );

      return { errorStatus: false, ...invoiceResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);

export const thunkInvoiceShipped = createAsyncThunk(
  "invoice/shipped",
  async (id, thunkApi) => {
    try {
      const invoiceResp = await axios.post(
        `/api/administrator/invoices/shipped`,
        { order: id },
        {
          headers: REQUEST_HEADER,
        }
      );

      esFrontLogger.info("Order Shipped Reducer ", restOrder.data);
      return { errorStatus: false, ...invoiceResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);

export const thunkAllPrintableInvoiceByStatus = createAsyncThunk(
  "invoice/printable",
  async (status, thunkApi) => {
    try {
      esFrontLogger.info("Thunk rintable status ", status);
      const ordersResp = await axios.get(
        `/api/administrator/invoices/printable?status=${status}`,
        {
          headers: REQUEST_HEADER,
        }
      );

      //esFrontLogger.info("Order Shipped Reducer ", restOrder.data);
      return { errorStatus: false, ...ordersResp.data };
    } catch (error) {
      return {
        errorStatus: true,
        response: null,
        status: false,
        message: error.message,
      };
    }
  }
);
