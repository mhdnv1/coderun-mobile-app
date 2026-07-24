import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "../features/auth/authSlice";
import { contactsApi } from "../services/contactsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
