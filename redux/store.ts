import { carriageApi } from "@/services/carriageApi";
import { carriageClassApi } from "@/services/carriageClassApi";
import { provinceApi } from "@/services/provinceApi";
import { trainApi } from "@/services/trainApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [trainApi.reducerPath]: trainApi.reducer,
    [provinceApi.reducerPath]:provinceApi.reducer,
    [carriageApi.reducerPath]: carriageApi.reducer,
    [carriageClassApi.reducerPath]: carriageClassApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trainApi.middleware,provinceApi.middleware,carriageApi.middleware,carriageClassApi.middleware),
});
setupListeners(store.dispatch);
// Infer the type of store
export type AppStore = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
