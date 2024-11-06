import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stakeholders: [],
  added: {},
  update: {},
  remove: {},
  stakeholder: undefined,
  byQuery: undefined,
};

const stakeholderSlice = createSlice({
  name: "stakeholder",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllStakeholder.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.stakeholders = action.payload.response;
        }
      })
      .addCase(thunkAddStakeholder.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateStakeholder.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkStakeholder.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.stakeholder = action.payload;
        }
      })
      .addCase(thunkRemoveStakeholder.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkStakeholderByQuery.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.byQuery = action.payload;
        }
      });
  },
});

export default stakeholderSlice.reducer;

export const thunkAllStakeholder = createAsyncThunk(
  "stakeholder/get_all",
  async (thunkApi) => {
    try {
      const stakeholderResp = await axios.get(
        `/api/administrator/stakeholders`
      );

      return { errorStatus: false, ...stakeholderResp.data };
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

export const thunkAddStakeholder = createAsyncThunk(
  "stakeholder/add",
  async (stakeholder, thunkApi) => {
    try {
      const stakeholderResp = await axios.post(
        `/api/administrator/stakeholders`,
        stakeholder
      );

      return { errorStatus: false, ...stakeholderResp.data };
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

export const thunkUpdateStakeholder = createAsyncThunk(
  "stakeholder/update",
  async (stakeholder, thunkApi) => {
    try {
      const stakeholderResp = await axios.put(
        `/api/administrator/stakeholders`,
        stakeholder
      );

      return { errorStatus: false, ...stakeholderResp.data };
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

export const thunkStakeholder = createAsyncThunk(
  "stakeholder/find_one",
  async (id, thunkApi) => {
    try {
      const stakeholderResp = await axios.get(
        `/api/administrator/stakeholders/${id}`
      );

      return { errorStatus: false, ...stakeholderResp.data };
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

export const thunkStakeholderByQuery = createAsyncThunk(
  "stakeholder/find_by_query",
  async (query, thunkApi) => {
    try {
      const stakeholderResp = await axios.post(
        `/api/administrator/stakeholders/query`,
        query
      );

      return { errorStatus: false, ...stakeholderResp.data };
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

export const thunkRemoveStakeholder = createAsyncThunk(
  "stakeholder/delete_one",
  async (id, thunkApi) => {
    try {
      const stakeholderResp = await axios.delete(
        `/api/administrator/stakeholders/${id}`
      );

      return { errorStatus: false, ...stakeholderResp.data };
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
