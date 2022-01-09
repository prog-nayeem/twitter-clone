import { configureStore } from '@reduxjs/toolkit';
import reducerModel from '../feature/modelSlice';


export const store = configureStore({
  reducer: {
    model: reducerModel,
  },
});
