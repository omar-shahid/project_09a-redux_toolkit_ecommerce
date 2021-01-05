import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartSlice from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
