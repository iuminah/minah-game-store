import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountSlice from "../redux/accountSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  account: accountSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
