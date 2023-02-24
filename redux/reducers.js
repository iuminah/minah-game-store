import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountSlice from "../redux/accountSlice";
import languageSlice from "./languageSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  account: accountSlice,
  language: languageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
