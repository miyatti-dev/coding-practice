import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'modules';

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
