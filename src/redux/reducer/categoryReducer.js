import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  subCategories: [],
  added: {},
  update: {},
  remove: undefined,
  category: undefined,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllCategory.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.categories = action.payload.response;
        }
      })
      .addCase(thunkAllCategoryAsSub.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.subCategories = action.payload.response;
        }
      })
      .addCase(thunkAddCategory.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateCategory.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkRemoveCegory.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkCategory.fulfilled, (state, action) => {
        console.log("Action Category ID ", action.payload);
        if (!isEmptyOrNull(action.payload)) {
          state.category = action.payload;
        }
      });
  },
});

export default categorySlice.reducer;

export const thunkAllCategoryAsSub = createAsyncThunk(
  "category/get_open_all_sub",
  async (thunkApi) => {
    try {
      const categoryResp = await axios.get(`/api/categories?type=sub`);
      return { errorStatus: false, ...categoryResp.data };
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

export const thunkAllCategory = createAsyncThunk(
  "category/get_open_all",
  async (thunkApi) => {
    try {
      const categoryResp = await axios.get(`/api/categories`);
      return { errorStatus: false, ...categoryResp.data };
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

export const thunkCategory = createAsyncThunk(
  "category/get_one",
  async (id, thunkApi) => {
    try {
      const categoryResp = await axios.get(`/api/categories/${id}`);
      console.log("Redux Category ID, ", categoryResp);

      return { errorStatus: false, ...categoryResp.data };
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

export const thunkAddCategory = createAsyncThunk(
  "category/add",
  async (category, thunkApi) => {
    try {
      const categoryResp = await axios.post(`/api/categories`, category);

      return { errorStatus: false, ...categoryResp.data };
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

export const thunkUpdateCategory = createAsyncThunk(
  "category/update",
  async (category, thunkApi) => {
    try {
      const categoryResp = await axios.put(`/api/categories`, category);

      return { errorStatus: false, ...categoryResp.data };
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

export const thunkRemoveCegory = createAsyncThunk(
  "category/remove",
  async (id, thunkApi) => {
    try {
      const categoryResp = await axios.delete(`/api/categories/${id}`);

      return { errorStatus: false, ...categoryResp.data };
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
