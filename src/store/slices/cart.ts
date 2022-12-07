import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Item } from '../../typings';

interface CartState {
  items: Item[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
