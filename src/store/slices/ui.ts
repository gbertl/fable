import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UiState {
  isSideCartOpen: boolean;
}

const initialState: UiState = {
  isSideCartOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSideCart: (state) => {
      state.isSideCartOpen = true;
    },
    hideSideCart: (state) => {
      state.isSideCartOpen = false;
    },
  },
});

export const { showSideCart, hideSideCart } = uiSlice.actions;

export const selectIsSideCartOpen = (state: RootState) =>
  state.ui.isSideCartOpen;

export default uiSlice.reducer;
