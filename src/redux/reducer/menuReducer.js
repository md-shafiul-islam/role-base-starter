import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  menus: [],
  added: {},
  update: {},
  remove: {}
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllMenus.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.menus = action.payload.response;
        }
      })
      .addCase(thunkAddMenu.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateMenu.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkDeleteMenu.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      });
  },
});

export default menuSlice.reducer;

export const thunkAllMenus = createAsyncThunk(
  "menu/get_all",
  async (thunkApi) => {
    try {
      const menuResp = await axios.get(`/api/administrator/menus`);

      return { errorStatus: false, ...menuResp.data };
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

export const thunkAddMenu = createAsyncThunk(
  "menu/add",
  async (menu, thunkApi) => {
    try {
      const menuResp = await axios.post(`/api/administrator/menus`, menu);

      return { errorStatus: false, ...menuResp.data };
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

export const thunkUpdateMenu = createAsyncThunk(
  "menu/update",
  async (menu, thunkApi) => {
    try {
      const menuResp = await axios.put(`/api/administrator/menus`, menu);

      return { errorStatus: false, ...menuResp.data };
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

export const thunkDeleteMenu = createAsyncThunk(
  "menu/remove",
  async (id, thunkApi) => {
    try {
      const menuResp = await axios.delete(`/api/administrator/menus/${id}`);

      return { errorStatus: false, ...menuResp.data };
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
