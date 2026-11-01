import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  orderBurgerApi,
  getOrdersApi,
  getOrderByNumberApi,
} from '../../utils/burger-api';

import type { TOrder } from '../../utils/types';

type TOrderState = {
  isLoading: boolean;
  error: string | null;
  orderModalData: TOrder | null;
  currentOrder: TOrder | null;
  orders: TOrder[];
};
const initialState: TOrderState = {
  isLoading: false,
  error: null,
  orderModalData: null,
  currentOrder: null,
  orders: [],
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order;
  }
);
export const fetchUserOrders = createAsyncThunk('order/fetchUserOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки истории';
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

export const selectOrderLoading = (state: { order: TOrderState }): boolean =>
  state.order.isLoading;
export const selectOrderModalData = (state: { order: TOrderState }): TOrder | null =>
  state.order.orderModalData;
export const selectCurrentOrder = (state: { order: TOrderState }): TOrder | null =>
  state.order.currentOrder;
export const selectUserOrders = (state: { order: TOrderState }): TOrder[] =>
  state.order.orders;
