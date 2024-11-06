import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  specifications: [],
  added: {},
  update: {},
  specification:undefined,
};

const specificationSlice = createSlice({
  name: "specification",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllSpecification.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.specifications = action.payload.response;
        }
      })
      .addCase(thunkAddSpecification.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateSpecification.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkSpecification.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.specification = action.payload;
        }
      })
      .addCase(thunkRemoveSpecification.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      });
  },
});

export default specificationSlice.reducer;

export const thunkAllSpecification = createAsyncThunk(
  "specification/get_all",
  async (thunkApi) => {
    try {
      const specificationResp = await axios.get(`/api/administrator/specifications`);

      return { errorStatus: false, ...specificationResp.data };
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

export const thunkAddSpecification = createAsyncThunk(
  "specification/add",
  async (specification, thunkApi) => {
    try {
      const specificationResp = await axios.post(`/api/administrator/specifications`, specification);

      return { errorStatus: false, ...specificationResp.data };
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

export const thunkUpdateSpecification = createAsyncThunk(
  "specification/update",
  async (specification, thunkApi) => {
    try {
      const specificationResp = await axios.put(`/api/administrator/specifications`, specification);

      return { errorStatus: false, ...specificationResp.data };
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

export const thunkSpecification = createAsyncThunk(
  "specification/find_one",
  async (id, thunkApi) => {
    try {
      const specificationResp = await axios.get(`/api/administrator/specifications/${id}`);

      return { errorStatus: false, ...specificationResp.data };
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

export const thunkRemoveSpecification = createAsyncThunk(
  "specification/delete_one",
  async (id, thunkApi) => {
    try {
      const specificationResp = await axios.delete(`/api/administrator/specifications/${id}`);

      return { errorStatus: false, ...specificationResp.data };
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
