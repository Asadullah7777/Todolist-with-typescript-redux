import dataReducer from "./Reducer/FormSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistDataConfig = {
  key: "data",
  storage,
};
const persistedDataReducer = persistReducer(persistDataConfig, dataReducer);

const Store = configureStore({
  reducer: combineReducers({
    data: persistedDataReducer,
  }),
});
export default Store;
export const persistor = persistStore(Store);

// window.localStorage.clear()
