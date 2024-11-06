import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stakeholderTypes: [],
  added: {},
  update: {},
  remove: {},
  stakeholderType: undefined,
};

const stakeholderTypeSlice = createSlice({
  name: "stakeType",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllStakeholderType.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.stakeholderTypes = action.payload.response;
        }
      })
      .addCase(thunkAddStakeholderType.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateStakeholderType.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkStakeholderType.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.stakeholderType = action.payload;
        }
      })
      .addCase(thunkRemoveStakeholderType.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      });
  },
});

export default stakeholderTypeSlice.reducer;

export const thunkAllStakeholderType = createAsyncThunk(
  "stakeType/get_all",
  async (thunkApi) => {
    try {
      const stakeholderTypeResp = await axios.get(
        `/api/administrator/stakeholders/types`
      );

      return { errorStatus: false, ...stakeholderTypeResp.data };
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

export const thunkAddStakeholderType = createAsyncThunk(
  "stakeType/add",
  async (specKey, thunkApi) => {
    try {
      const stakeholderTypeResp = await axios.post(
        `/api/administrator/stakeholders/types`,
        specKey
      );

      return { errorStatus: false, ...stakeholderTypeResp.data };
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

export const thunkUpdateStakeholderType = createAsyncThunk(
  "stakeType/update",
  async (specKey, thunkApi) => {
    try {
      const stakeholderTypeResp = await axios.put(
        `/api/administrator/stakeholders/types`,
        specKey
      );

      return { errorStatus: false, ...stakeholderTypeResp.data };
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

export const thunkStakeholderType = createAsyncThunk(
  "stakeType/find_one",
  async (id, thunkApi) => {
    try {
      const stakeholderTypeResp = await axios.get(
        `/api/administrator/stakeholders/types/${id}`
      );

      return { errorStatus: false, ...stakeholderTypeResp.data };
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

export const thunkRemoveStakeholderType = createAsyncThunk(
  "stakeType/delete_one",
  async (id, thunkApi) => {
    try {
      const stakeholderTypeResp = await axios.delete(
        `/api/administrator/stakeholders/types/${id}`
      );

      return { errorStatus: false, ...stakeholderTypeResp.data };
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
