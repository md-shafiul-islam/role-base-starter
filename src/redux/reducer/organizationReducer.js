import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  organizations: [],
  added: {},
  update: {},
  remove: {},
  toggle: undefined,
  verify: undefined,
  organization: undefined,
  addUser: undefined,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState: initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(thunkAllOrganization.fulfilled, (state, action) => {
        console.log("organizations, ", action.payload);
        if (action.payload.status) {
          state.organizations = action.payload.response;
        }
      })
      .addCase(thunkAddOrganization.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.added = action.payload;
        }
      })
      .addCase(thunkUpdateOrganization.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.update = action.payload;
        }
      })
      .addCase(thunkOrganization.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.organization = action.payload;
        }
      })
      .addCase(thunkRemoveOrganization.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.remove = action.payload;
        }
      })
      .addCase(thunkUserAddOrganization.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.addUser = action.payload;
        }
      })
      .addCase(thunkOrganizationToggleActive.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.toggle = action.payload;
        }
      })
      .addCase(thunkOrganizationVerify.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.verify = action.payload;
        }
      });
  },
});

export default organizationSlice.reducer;

export const thunkUserAddOrganization = createAsyncThunk(
  "organization/add_user",
  async (addUser, thunkApi) => {
    try {
      const organizationResp = await axios.post(
        `/api/administrator/organizations/users`,
        addUser
      );
      console.log("User Add organizationResp, ", organizationResp);
      return { errorStatus: false, ...organizationResp.data };
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

export const thunkAllOrganization = createAsyncThunk(
  "organization/get_all",
  async (thunkApi) => {
    try {
      const organizationResp = await axios.get(
        `/api/administrator/organizations`
      );

      return { errorStatus: false, ...organizationResp.data };
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

export const thunkAddOrganization = createAsyncThunk(
  "organization/add",
  async (organization, thunkApi) => {
    try {
      const organizationResp = await axios.post(
        `/api/administrator/organizations`,
        organization
      );

      return { errorStatus: false, ...organizationResp.data };
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

export const thunkUpdateOrganization = createAsyncThunk(
  "organization/update",
  async (organization, thunkApi) => {
    try {
      const organizationResp = await axios.put(
        `/api/administrator/organizations`,
        organization
      );

      return { errorStatus: false, ...organizationResp.data };
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

export const thunkOrganization = createAsyncThunk(
  "organization/find_one",
  async (id, thunkApi) => {
    try {
      console.log("thunkOrganization, ", id);
      const organizationResp = await axios.get(
        `/api/administrator/organizations/${id}`
      );
      console.log("Thunk organizationResp, ", organizationResp);
      return { errorStatus: false, ...organizationResp.data };
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

export const thunkRemoveOrganization = createAsyncThunk(
  "organization/delete_one",
  async (id, thunkApi) => {
    try {
      const organizationResp = await axios.delete(
        `/api/administrator/organizations/${id}`
      );

      return { errorStatus: false, ...organizationResp.data };
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

export const thunkOrganizationToggleActive = createAsyncThunk(
  "organization/toggle_active",
  async (activeReq, thunkApi) => {
    try {
      const organizationResp = await axios.patch(
        `/api/administrator/organizations/${activeReq.id}`,
        activeReq
      );

      return { errorStatus: false, ...organizationResp.data };
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

export const thunkOrganizationVerify = createAsyncThunk(
  "organization/verify",
  async (verifyReq, thunkApi) => {
    try {
      const organizationResp = await axios.put(
        `/api/administrator/organizations/${verifyReq.id}`,
        verifyReq
      );

      return { errorStatus: false, ...organizationResp.data };
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
