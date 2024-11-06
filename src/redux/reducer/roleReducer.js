import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";
import { convertToAccessAsObj } from "@/src/utils/access/role.access.utils";

const initialState = {
  role: {},
  roles:[],
  access: [],
  userAccess: {},
  added: {},
  update: {},
  updateAccessItem: undefined,
};

const roleSlice = createSlice({
  name: "role",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllRole.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.roles = action.payload.response;
        }
      })
      .addCase(thunkRole.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.role = action.payload;
        }
      })

      .addCase(thunkAddRole.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateRole.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkRemoveRole.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkToggleActiveRole.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.activeStatus = action.payload;
        }
      })
      .addCase(thunkRoleAccess.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.access = action.payload;
          state.userAccess = convertToAccessAsObj(action.payload.response);
        }
      })
      .addCase(thunkUpdateRoleAccessItem.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.updateAccessItem = action.payload;
        }
      });
  },
});

export default roleSlice.reducer;

export const thunkAllRole = createAsyncThunk(
  "role/get_all",
  async (thunkApi) => {
    try {
      const roleResp = await axios.get(`/api/administrator/roles`);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkRole = createAsyncThunk(
  "role/get_one",
  async (id, thunkApi) => {
    try {
      const roleResp = await axios.get(`/api/administrator/roles/${id}`);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkAddRole = createAsyncThunk(
  "role/add",
  async (role, thunkApi) => {
    try {
      const roleResp = await axios.post(`/api/administrator/roles`, role);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkUpdateRole = createAsyncThunk(
  "role/update",
  async (role, thunkApi) => {
    try {
      const roleResp = await axios.put(`/api/administrator/roles`, role);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkRemoveRole = createAsyncThunk(
  "role/remove",
  async (id, thunkApi) => {
    try {
      const roleResp = await axios.put(`/api/administrator/roles/${id}`, role);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkToggleActiveRole = createAsyncThunk(
  "role/toggle",
  async (active, thunkApi) => {
    try {
      const roleResp = await axios.patch(`/api/administrator/roles`, role);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkRoleAccess = createAsyncThunk(
  "role/all_access",
  async (active, thunkApi) => {
    try {
      const roleResp = await axios.get(`/api/administrator/roles/access`);

      return { errorStatus: false, ...roleResp.data };
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

export const thunkUpdateRoleAccessItem = createAsyncThunk(
  "role/update_access",
  async (access, thunkApi) => {
    try {
      const roleResp = await axios.put(
        `/api/administrator/roles/access/${access.publicId}`,
        access
      );

      return { errorStatus: false, ...roleResp.data };
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
