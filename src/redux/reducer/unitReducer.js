import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  units: [],
  subUnits: [],
  added: {},
  update: {},
  remove: undefined,
  unit: undefined,
};

const unitSlice = createSlice({
  name: "unit",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllUnit.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.units = action.payload.response;
        }
      })
      .addCase(thunkAllUnitAsSub.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.subUnits = action.payload.response;
        }
      })
      .addCase(thunkAddUnit.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateUnit.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkRemoveUnit.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkUnit.fulfilled, (state, action) => {
        console.log("action.payload, ", action.payload);
        if (!isEmptyOrNull(action.payload)) {
          state.unit = action.payload;
        }
      });
  },
});

export default unitSlice.reducer;

export const thunkAllUnitAsSub = createAsyncThunk(
  "unit/get_open_all_sub",
  async (thunkApi) => {
    try {
      const unitResp = await axios.get(`/api/units?type=sub`);
      return { errorStatus: false, ...unitResp.data };
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

export const thunkAllUnit = createAsyncThunk(
  "unit/get_open_all",
  async (thunkApi) => {
    try {
      const unitResp = await axios.get(`/api/units`);

      return { errorStatus: false, ...unitResp.data };
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

export const thunkUnit = createAsyncThunk(
  "unit/get_one",
  async (id, thunkApi) => {
    try {
      const unitResp = await axios.get(`/api/units/${id}`);

      return { errorStatus: false, ...unitResp.data };
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

export const thunkAddUnit = createAsyncThunk(
  "unit/add",
  async (unit, thunkApi) => {
    try {
      const unitResp = await axios.post(`/api/units`, unit);

      return { errorStatus: false, ...unitResp.data };
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

export const thunkUpdateUnit = createAsyncThunk(
  "unit/update",
  async (unit, thunkApi) => {
    try {
      const unitResp = await axios.put(`/api/units`, unit);

      return { errorStatus: false, ...unitResp.data };
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

export const thunkRemoveUnit = createAsyncThunk(
  "unit/remove",
  async (id, thunkApi) => {
    try {
      const unitResp = await axios.delete(`/api/units/${id}`);

      return { errorStatus: false, ...unitResp.data };
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
