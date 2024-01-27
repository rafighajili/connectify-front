import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.connectify.az",
    credentials: "include",
  }),
  tagTypes: ["Event", "Sponsorship"],
  endpoints: () => ({}),
});
