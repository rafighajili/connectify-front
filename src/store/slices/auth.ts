import { createSlice } from "@reduxjs/toolkit";
import { User } from "#/entities";
import { RootState } from "#/store";
import { authService } from "#/services";

const initialState: {
  user: User | null;
  token: string | null;
} = {
  user: null,
  token: typeof(window) !== "undefined" ? localStorage.getItem("token") : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.access_token;
      localStorage.setItem("token", payload.access_token);
    });

    builder.addMatcher(authService.endpoints.getLoggedInUser.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
