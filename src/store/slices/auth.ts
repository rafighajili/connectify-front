import { createSlice } from "@reduxjs/toolkit";
import { User } from "#/entities";
import { RootState } from "#/store";
import { authService } from "#/services";

const initialState: {
  user: User | null;
  token: string | null;
  isLoading: boolean;
} = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetAuth: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authService.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.token = payload.access_token;
      localStorage.setItem("token", payload.access_token);
    });
    builder.addMatcher(authService.endpoints.loginSponsor.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.token = payload.access_token;
      localStorage.setItem("token", payload.access_token);
    });
    builder.addMatcher(authService.endpoints.loginOrganizer.matchFulfilled, (state, { payload }) => {
      state.user = payload;
      state.token = payload.access_token;
      localStorage.setItem("token", payload.access_token);
    });

    builder.addMatcher(authService.endpoints.getUser.matchPending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addMatcher(authService.endpoints.getUser.matchFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addMatcher(authService.endpoints.getUser.matchRejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { resetAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
