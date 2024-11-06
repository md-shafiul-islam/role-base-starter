import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const initialState = {
  products: [],
  added: {},
  update: {},
  product: undefined,
  addLocation: undefined,
  updateLocation: undefined,
  removeLocation: undefined,
  activeToggle: undefined,
  orgProducts: [],
  byQuery: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllProduct.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.products = action.payload.response;
        }
      })
      .addCase(thunkAddProduct.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateProduct.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkProductsExceptCategory.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.catExcProducts = action.payload;
        }
      })
      .addCase(thunkProductsByategory.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.catProducts = action.payload;
        }
      })
      .addCase(thunkProduct.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.product = action.payload.response;
        }
      })
      .addCase(thunkAddProductLocation.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.addLocation = action.payload;
        }
      })
      .addCase(thunkUpdateProductLocation.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.updateLocation = action.payload;
        }
      })
      .addCase(thunkRemoveProductLocation.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.removeLocation = action.payload;
        }
      })
      .addCase(thunkProductToggleActive.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.activeToggle = action.payload;
        }
      })
      .addCase(thunkProductByQuery.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.byQuery = action.payload;
        }
      })
      .addCase(thunkAllProductByOrg.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.orgProducts = action.payload;
        }
      });
  },
});

export default productSlice.reducer;

export const thunkAllProduct = createAsyncThunk(
  "product/get_all",
  async (thunkApi) => {
    try {
      const productResp = await axios.get(`/api/administrator/products`);

      return { errorStatus: false, ...productResp.data };
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

export const thunkProduct = createAsyncThunk(
  "product/get_one",
  async (id, thunkApi) => {
    try {
      const productResp = await axios.get(`/api/administrator/products/${id}`);

      return { errorStatus: false, ...productResp.data };
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

export const thunkAddProduct = createAsyncThunk(
  "product/add",
  async (product, thunkApi) => {
    try {
      const productResp = await axios.post(
        `/api/administrator/products`,
        product
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkUpdateProduct = createAsyncThunk(
  "product/update",
  async (product, thunkApi) => {
    try {
      const productResp = await axios.put(
        `/api/administrator/products`,
        product
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkProductsExceptCategory = createAsyncThunk(
  "product/except_category",
  async (cat, thunkApi) => {
    try {
      cat.status = true;
      //esFrontLogger.info("Redux Category Query ", cat);

      const productResp = await axios.post(`/api/products/category`, cat);

      return { errorStatus: false, ...productResp.data };
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

export const thunkProductsByategory = createAsyncThunk(
  "product/category_by",
  async (cat, thunkApi) => {
    try {
      cat.status = false;

      const productResp = await axios.post(`/api/products/category`, cat);

      return { errorStatus: false, ...productResp.data };
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

export const thunkAddProductLocation = createAsyncThunk(
  "product/location_add",
  async (location, thunkApi) => {
    try {
      const productResp = await axios.post(
        `/api/administrator/products/locations`,
        location
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkUpdateProductLocation = createAsyncThunk(
  "product/location_update",
  async (location, thunkApi) => {
    try {
      const productResp = await axios.put(
        `/api/administrator/products/locations`,
        location
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkRemoveProductLocation = createAsyncThunk(
  "product/location_remove",
  async (id, thunkApi) => {
    try {
      const productResp = await axios.delete(
        `/api/administrator/products/locations?id=${id}`,
        location
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkProductToggleActive = createAsyncThunk(
  "product/toggle_active",
  async (id, thunkApi) => {
    try {
      const productResp = await axios.put(`/api/administrator/products/${id}`);

      return { errorStatus: false, ...productResp.data };
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

export const thunkProductByQuery = createAsyncThunk(
  "product/by_query",
  async (query, thunkApi) => {
    try {
      const productResp = await axios.post(
        `/api/administrator/products/query`,
        query
      );

      return { errorStatus: false, ...productResp.data };
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

export const thunkAllProductByOrg = createAsyncThunk(
  "product/all_by_org",
  async (orgId, thunkApi) => {
    try {
      const productResp = await axios.get(
        `/api/administrator/products?org=${orgId}`
      );

      return { errorStatus: false, ...productResp.data };
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
