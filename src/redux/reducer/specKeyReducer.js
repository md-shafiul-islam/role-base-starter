import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  specKeys: [],
  added: {},
  update: {},
  specKey: undefined,
};

const specKeySlice = createSlice({
  name: "specKey",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllSpecKey.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.specKeys = action.payload.response;
        }
      })
      .addCase(thunkAddSpecKey.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateSpecKey.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkSpecKey.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.specKey = action.payload;
        }
      })
      .addCase(thunkRemoveSpecKey.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      });
  },
});

export default specKeySlice.reducer;

export const thunkAllSpecKey = createAsyncThunk(
  "specKey/get_all",
  async (thunkApi) => {
    try {
      const specKeyResp = await axios.get(
        `/api/administrator/specification-keys`
      );

      return { errorStatus: false, ...specKeyResp.data };
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

export const thunkAddSpecKey = createAsyncThunk(
  "specKey/add",
  async (specKey, thunkApi) => {
    try {
      const specKeyResp = await axios.post(
        `/api/administrator/specification-keys`,
        specKey
      );

      return { errorStatus: false, ...specKeyResp.data };
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

export const thunkUpdateSpecKey = createAsyncThunk(
  "specKey/update",
  async (specKey, thunkApi) => {
    try {
      const specKeyResp = await axios.put(
        `/api/administrator/specification-keys`,
        specKey
      );

      return { errorStatus: false, ...specKeyResp.data };
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

export const thunkSpecKey = createAsyncThunk(
  "specKey/find_one",
  async (id, thunkApi) => {
    try {
      const specKeyResp = await axios.get(
        `/api/administrator/specification-keys/${id}`
      );

      return { errorStatus: false, ...specKeyResp.data };
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

export const thunkRemoveSpecKey = createAsyncThunk(
  "specKey/delete_one",
  async (id, thunkApi) => {
    try {
      const specKeyResp = await axios.delete(
        `/api/administrator/specification-keys/${id}`
      );

      return { errorStatus: false, ...specKeyResp.data };
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
