import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  added: {},
  update: {},
  remove: {},
  register: {},
  toggleActive: undefined,
  user: undefined,
  verify: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllUser.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.users = action.payload.response;
        }
      })
      .addCase(thunkAddUser.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkAddRegister.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.register = action.payload;
        }
      })
      .addCase(thunkUpdateUser.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkUser.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.user = action.payload;
        }
      })
      .addCase(thunkRemoveUser.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkUserActiveToggle.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.toggleActive = action.payload;
        }
      })
      .addCase(thunkUserVerify.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.verify = action.payload;
        }
      })
      .addCase(thunkCreateStakeholderByUser.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.createStake = action.payload;
        }
      });
  },
});

export default userSlice.reducer;

export const thunkAllUser = createAsyncThunk(
  "user/get_all",
  async (thunkApi) => {
    try {
      const userResp = await axios.get(`/api/administrator/users`);

      return { errorStatus: false, ...userResp.data };
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

export const thunkAddRegister = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const userResp = await axios.post(`/api/users`, user);

      return { errorStatus: false, ...userResp.data };
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

export const thunkAddUser = createAsyncThunk(
  "user/add",
  async (user, thunkApi) => {
    try {
      const userResp = await axios.post(`/api/administrator/users`, user);

      return { errorStatus: false, ...userResp.data };
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

export const thunkUpdateUser = createAsyncThunk(
  "user/update",
  async (user, thunkApi) => {
    try {
      const userResp = await axios.put(`/api/administrator/users`, user);

      return { errorStatus: false, ...userResp.data };
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

export const thunkUser = createAsyncThunk(
  "user/find_one",
  async (id, thunkApi) => {
    try {
      const userResp = await axios.get(`/api/administrator/users/${id}`);
      return { errorStatus: false, ...userResp.data };
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

export const thunkRemoveUser = createAsyncThunk(
  "user/delete_one",
  async (id, thunkApi) => {
    try {
      const userResp = await axios.delete(`/api/administrator/users/${id}`);

      return { errorStatus: false, ...userResp.data };
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

export const thunkUserActiveToggle = createAsyncThunk(
  "user/toggle_active",
  async (reqActive, thunkApi) => {
    try {
      const userResp = await axios.put(
        `/api/administrator/users/${reqActive?.id}`,
        reqActive
      );

      return { errorStatus: false, ...userResp.data };
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

export const thunkUserVerify = createAsyncThunk(
  "user/verify",
  async (reqVerify, thunkApi) => {
    try {
      const userResp = await axios.patch(
        `/api/administrator/users/${reqVerify?.id}`,
        reqVerify
      );

      return { errorStatus: false, ...userResp.data };
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

export const thunkCreateStakeholderByUser = createAsyncThunk(
  "user/add_stakeholder",
  async (id, thunkApi) => {
    try {
      const userResp = await axios.post(`/api/administrator/users/${id}`, {
        id,
      });

      console.log("thunkCreateStakeholderByUser, ", userResp);
      return { errorStatus: false, ...userResp.data };
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
