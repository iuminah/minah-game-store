import {createSlice} from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    userID: null,
    userData: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {setUserID, setToken, setUserData} = accountSlice.actions;

export const selectUserID = (state) => state.account.userID;
export const selectToken = (state) => state.account.token;
export const selectUserData = (state) => state.account.userData;

export default accountSlice.reducer;
