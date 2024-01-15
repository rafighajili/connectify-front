import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connectify-mz4i.onrender.com",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
