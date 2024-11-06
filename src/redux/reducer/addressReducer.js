import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  suggestions: [],
  stakeholder: [],
  added: {},
  cities: [],
  cityRegions: [],
  regionAreas: [],
  regions: [],
  areas: [],
  checkoutAddress: "",
  addresses: [],
  address: {},
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,

  reducers: {
    restAdded: (state) => {
      state.added = {};
      return state;
    },

    setCheckoutAddress: (state, action) => {
      state.checkoutAddress = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkSearchAddresByWords.fulfilled, (state, action) => {
        esFrontLogger.info("thunkSearchAddresByWords Action ", action);
      })
      .addCase(thunkAddress.fulfilled, (state, action) => {
        if (!isEmptyOrNull(action.payload)) {
          state.address = action.payload;
        }
      })
      .addCase(thunkAllCity.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cities = action.payload.response;
        }
      })
      .addCase(thunkAllRegionByCity.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cityRegions = action.payload.response;
        }
      })
      .addCase(thunkAllRegion.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.regions = action.payload.response;
        }
      })
      .addCase(thunkAllRegionArea.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.regionAreas = action.payload.response;
        }
      })

      .addCase(thunkAddAddress.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.added = action.payload;
        }
      })
      .addCase(thunkGetAllStakholderAddress.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.stakeholder = action.payload.response;
        }
      })
      .addCase(thunkAllAddress.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.addresses = action.payload.response;
        }
      });
  },
});

export const thunkSearchAddresByWords = createAsyncThunk(
  "address/search_words",
  async (words, thunkApi) => {
    try {
      const resp = await axios.post(`/api/addresses/search`, words);

      return { errorStatus: false, ...resp.data };
    } catch (error) {
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAddress = createAsyncThunk(
  "address/get_one",
  async (id, thunkApi) => {
    try {
      const resp = await axios.get(`/api/addresses`, id);

      return { errorStatus: false, ...resp.data };
    } catch (error) {
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAllCity = createAsyncThunk(
  "address/get_all_city",
  async (thunkApi) => {
    try {
      const resp = await axios.get(`/api/addresses/cities`);
      console.log("thunkAllCity, ", resp);
      return { errorStatus: false, ...resp.data };
    } catch (error) {
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAllRegionByCity = createAsyncThunk(
  "address/get_city_region",
  async (city, thunkApi) => {
    try {
      const resp = await axios.get(`/api/addresses/regions?city=${city.code}`);
      return { errorStatus: false, ...resp.data };
    } catch (error) {
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAllRegion = createAsyncThunk(
  "address/get_all_region",
  async (thunkApi) => {
    try {
      const resp = await axios.get(`/api/addresses/regions`);

      return { errorStatus: false, ...resp.data };
    } catch (error) {
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAllRegionArea = createAsyncThunk(
  "address/get_region_areas",
  async (region, thunkApi) => {
    try {
      const resp = await axios.get(
        `/api/addresses/areas?region=${region.code}`
      );

      //esBackLogger.info("Zone Resp ", resp.data);
      return { errorStatus: false, ...resp.data };
    } catch (error) {
      //esBackLogger.info("Word Error ", error);
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAddAddress = createAsyncThunk(
  "address/add_via_thunk",
  async (address, thunkApi) => {
    try {
      //esBackLogger.info("thunkAddAddress ", address);
      const resp = await axios.post(`/api/addresses`, address, {
        headers: REQUEST_HEADER,
      });

      //esBackLogger.info("Address Resp ", resp.data);
      return { errorStatus: false, ...resp.data };
    } catch (error) {
      //esBackLogger.info("Word Error ", error);
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkGetAllStakholderAddress = createAsyncThunk(
  "address/thunk_address_stakeholder",
  async (stakeholder, thunkApi) => {
    try {
      //esBackLogger.info("Thunk Address Stakholder ", stakeholder);
      const respStakholder = await axios.get(
        `/api/addresses/stakeholder?id=${stakeholder}`,
        {
          headers: REQUEST_HEADER,
        }
      );

      //esBackLogger.info("Stakeholder Address Resp ", respStakholder.data);
      return { errorStatus: false, ...respStakholder.data };
    } catch (error) {
      //esBackLogger.info("Word Error ", error);
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const thunkAllAddress = createAsyncThunk(
  "address/get_all_address",
  async (stakeholder, thunkApi) => {
    try {
      //esBackLogger.info("Thunk Address Stakholder ", stakeholder);
      const respAddresses = await axios.get(`/api/addresses`, {
        headers: REQUEST_HEADER,
      });

      //esBackLogger.info("Stakeholder Address Resp ", respStakholder.data);
      return { errorStatus: false, ...respAddresses.data };
    } catch (error) {
      //esBackLogger.info("Word Error ", error);
      return {
        errorStatus: true,
        status: false,
        message: error.message,
        response: null,
      };
    }
  }
);

export const { restAdded, setCheckoutAddress } = addressSlice.actions;

export default addressSlice.reducer;
