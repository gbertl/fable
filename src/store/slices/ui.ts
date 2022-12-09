import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface UiState {
  isSideCartActive: boolean;
}

const initialState: UiState = {
  isSideCartActive: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSideCart: (state) => {
      state.isSideCartActive = true;
    },
    hideSideCart: (state) => {
      state.isSideCartActive = false;
    },
  },
});

export const { showSideCart, hideSideCart } = uiSlice.actions;

export const selectIsSideCartActive = (state: RootState) =>
  state.ui.isSideCartActive;

export default uiSlice.reducer;
