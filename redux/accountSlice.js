import {createSlice} from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    username: "username",
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {setUserName, increment, decrement, incrementByAmount} =
  accountSlice.actions;

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

export const selectAccount = (state) => state.account.username;

export default accountSlice.reducer;
