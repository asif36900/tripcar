import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./Slices/bookingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "./storage";

const persistConfig = {
  key: "booking",
  storage,
};

const persistedBookingReducer = persistReducer(persistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    booking: persistedBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
