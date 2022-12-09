import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart';
import ui from './slices/ui';

export const store = configureStore({
  reducer: {
    cart,
    ui,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
