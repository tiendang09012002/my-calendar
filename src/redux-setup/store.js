import {configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
const persistConfig = {
    key: "tien",
    storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer:{
        Auth : persistedReducer
    }
});
export const persistor = persistStore(store);