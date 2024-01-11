import { apiSlice } from "#/store/slices";

export const sponsorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    testSponsor: builder.query<void, void>({
      query: () => ({ url: `/organizer/login`, method: "get" }),
    }),
  }),
});

export const {} = sponsorService;
