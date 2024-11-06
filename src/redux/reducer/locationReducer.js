import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { REQUEST_HEADER } from "@/src/app/components/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";

const initialState = {
  isOpenDrawer: false,
  cart: {
    id: "",
    stakeholder: "",
    discountPar: "",
    discount: "",
    couponCode: "",
    totalAmount: "",
    totalQty: "",
    cartItemReqs: new Array(),
  },
};

const isCartItemExist = (cart, cartItem) => {
  let status = false;
  if (!isEmptyOrNull(cart) && !isEmptyOrNull(cartItem)) {
    if (Array.isArray(cart.cartItemReqs)) {
      cart.cartItemReqs.forEach((item) => {
        if (item.id === cartItem.id) {
          status = true;
        }
      });
    }
  }
  return status;
};

const addItemToCart = (state, item) => {
  //esFrontLogger.info("addItemToCart state, ", state);
  if (!isCartItemExist(state.cart, item)) {
    state.cart.cartItemReqs = state.cart.cartItemReqs.push(item);
  }

  if (Array.isArray(state.cart.cartItemReqs)) {
    let totalAmount = 0,
      totalQty = 0;
    state.cart.cartItemReqs.forEach((item) => {
      let subTotal = 0;
      if (item.discountPrice > 0) {
        subTotal = item.discountPrice * item.qty;
      }
      totalQty = totalQty + item.qty;
      totalAmount = totalAmount + subTotal;
    });
    state.cart.totalAmount = totalAmount;
    state.cart.totalQty = totalQty;
  }

  return state;
};

export const updateCartItemAction = (cartItem) => {
  //esFrontLogger.info("Rdux Reducer updateCartItemAction", cartItem);
};

const removeCartItemAction = (cartItem) => {
  //esFrontLogger.info("Rdux Reducer removeCartItemAction", cartItem);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,

  reducers: {
    createCart: (state, action) => {
      state.cart = action.payload;
      return state;
    },
    updateCart: (state, action) => {
      return { ...state, cart: action.payload };
    },
    addCartItem: (state, action) => {
      const item = action.payload;
      if (!Array.isArray(state.cart.cartItemReqs)) {
        state.cart.cartItemReqs = [];
      } else {
        if (!isCartItemExist(state.cart, item)) {
          state.cart.cartItemReqs = [...state.cart.cartItemReqs, item];
        }
      }

      let totalAmount = 0,
        totalQty = 0;
      if (Array.isArray(state.cart.cartItemReqs)) {
        state.cart.cartItemReqs.forEach((item) => {
          let subTotal = 0;
          if (item.variant.discountPrice > 0) {
            subTotal = item.variant.discountPrice * item.variant.qty;
          }
          //esFrontLogger.info("item.variant.qty, ", item.variant.qty);
          totalQty = totalQty + item.variant.qty;
          totalAmount = totalAmount + subTotal;
        });
        state.cart.totalAmount = totalAmount;
        state.cart.totalQty = totalQty;
      }

      return state;

      // return addItemToCart(state, action.payload);
    },
    toggleCartDrawer: (state, action) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
    updateCartItem: (state, action) => {
      updateCartItemAction(action.payload);
    },
    removeCartItem: (state, action) => {
      removeCartItemAction(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrUpdateCart.fulfilled, (state, action) => {
        state.cart = action.payload.response;
      })
      .addCase(itemAddOrUpdateCart.fulfilled, (state, action) => {
        state.cart = action.payload.response;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload.response;
      })
      .addCase(getIncrementCartItem.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      })
      .addCase(getDecrementCartItem.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      })
      .addCase(thunkRemoveCartItem.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      })
      .addCase(thunkCartItemChooseToggleAction.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      })
      .addCase(thunkCartItemsChooseToggleAction.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      })
      .addCase(thunkApplyCouponCartAction.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.cart = action.payload.response;
        }
      });
  },
});

export const addOrUpdateCart = createAsyncThunk(
  "cart/add_or_update",
  async (cart, thunkApi) => {
    try {
      const resp = await axios.post("/api/carts/", cart, {
        headers: REQUEST_HEADER,
      });

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const itemAddOrUpdateCart = createAsyncThunk(
  "cart/item_add_or_update",
  async (cartItem, thunkApi) => {
    try {
      //esFrontLogger.info("Cart Add Or Update Redux ", cartItem);
      let id = cartItem?.cart ? cartItem?.cart : -1;
      const resp = await axios.post(`/api/carts/${id}/items`, cartItem, {
        headers: REQUEST_HEADER,
      });

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/get_cart",
  async (id = -1, thunkApi) => {
    try {
      const resp = await axios.get(`/api/carts/${id}`, {
        headers: REQUEST_HEADER,
      });

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("Get Cart Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const getIncrementCartItem = createAsyncThunk(
  "cart/get_cart_item_inc",
  async (cartItem, thunkApi) => {
    try {
      const resp = await axios.post(
        `/api/carts/${cartItem.cart}/increment`,
        cartItem,
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("getIncrementCartItem Resp, ", resp);
      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("Get Cart Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const getDecrementCartItem = createAsyncThunk(
  "cart/get_cart_item_dec",
  async (cartItem, thunkApi) => {
    try {
      const resp = await axios.post(
        `/api/carts/${cartItem.cart}/decrement`,
        cartItem,
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("getDecrementCartItem Resp, ", resp);

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("Get Cart Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const thunkRemoveCartItem = createAsyncThunk(
  "cart/remove_cart_item",
  async (cartItem, thunkApi) => {
    try {
      const resp = await axios.post(
        `/api/carts/${cartItem.cart}/delete`,
        cartItem,
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("thunkRemoveCartItem Resp, ", resp);

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("thunkRemoveCartItem Delete Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const thunkCartItemsChooseToggleAction = createAsyncThunk(
  "cart/toggle_all_cart_item",
  async (choose, thunkApi) => {
    try {
      const resp = await axios.post(
        `/api/carts/${choose.id}/choose`,
        { ...choose, type: -1 },
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("thunkRemoveCartItem Resp, ", resp);

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("thunkRemoveCartItem Delete Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const thunkCartItemChooseToggleAction = createAsyncThunk(
  "cart/toggle_cart_item",
  async (toggleItem, thunkApi) => {
    try {
      const resp = await axios.post(
        `/api/carts/${toggleItem.id}/choose`,
        { ...toggleItem, type: 1 },
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("thunkRemoveCartItem Resp, ", resp);

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("thunkRemoveCartItem Delete Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const thunkApplyCouponCartAction = createAsyncThunk(
  "cart/apply_coupon_cart",
  async (coupon, thunkApi) => {
    try {
      //esFrontLogger.info("thunkApplyCouponCartAction Ac, ", coupon);
      const resp = await axios.post(
        `/api/carts/${coupon.id}/coupon`,
        coupon,
        { headers: REQUEST_HEADER }
      );
      //esFrontLogger.info("thunkApplyCouponCartAction Resp, ", resp);

      if (!isEmptyOrNull(resp.data)) {
        if (resp.data.status) {
          return { errorStatus: false, ...resp.data };
        } else {
          return { errorStatus: true, ...resp.data };
        }
      }
    } catch (error) {
      //esFrontLogger.info("thunkApplyCouponCartAction Delete Error ", error);
      return {
        errorStatus: true,
        message: error.message,
        status: false,
        response: null,
      };
    }
  }
);

export const {
  createCart,
  updateCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  toggleCartDrawer,
} = cartSlice.actions;

export default cartSlice.reducer;
