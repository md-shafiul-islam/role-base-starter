import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  brands: [],
  added: {},
  update: {},
};

const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllBrand.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.brands = action.payload.response;
        }
      })
      .addCase(thunkAddBrand.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateBrand.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkBrand.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.brand = action.payload;
        }
      })
      .addCase(thunkRemoveBrand.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      });
  },
});

export default brandSlice.reducer;

export const thunkAllBrand = createAsyncThunk(
  "brand/get_all",
  async (thunkApi) => {
    try {
      const brandResp = await axios.get(`/api/administrator/brands`);

      return { errorStatus: false, ...brandResp.data };
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

export const thunkAddBrand = createAsyncThunk(
  "brand/add",
  async (brand, thunkApi) => {
    try {
      const brandResp = await axios.post(`/api/administrator/brands`, brand);

      return { errorStatus: false, ...brandResp.data };
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

export const thunkUpdateBrand = createAsyncThunk(
  "brand/update",
  async (brand, thunkApi) => {
    try {
      const brandResp = await axios.put(`/api/administrator/brands`, brand);

      return { errorStatus: false, ...brandResp.data };
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

export const thunkBrand = createAsyncThunk(
  "brand/find_one",
  async (id, thunkApi) => {
    try {
      const brandResp = await axios.get(`/api/administrator/brands/${id}`);

      return { errorStatus: false, ...brandResp.data };
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

export const thunkRemoveBrand = createAsyncThunk(
  "brand/delete_one",
  async (id, thunkApi) => {
    try {
      const brandResp = await axios.delete(`/api/administrator/brands/${id}`);

      return { errorStatus: false, ...brandResp.data };
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
