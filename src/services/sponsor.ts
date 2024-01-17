import { apiSlice } from "#/store/slices";
import { CreateSponsorshipRequestType } from "#/schemas";
import { ItemType } from "#/entities";

export const sponsorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSponsorship: builder.mutation<void, CreateSponsorshipRequestType>({
      query: (body) => ({ url: `/sponsor`, method: "post", body }),
    }),
    getSponsorships: builder.query<any[], void>({
      query: () => ({ url: `/sponsor`, method: "get" }),
    }),
    approveSponsorship: builder.mutation<void, ItemType["id"]>({
      query: (id) => ({ url: `/sponsor/${id}/approve`, method: "post" }),
    }),
    rejectSponsorship: builder.mutation<void, ItemType["id"]>({
      query: (id) => ({ url: `/sponsor/${id}/reject`, method: "post" }),
    }),
  }),
});

export const {
  useCreateSponsorshipMutation,
  useGetSponsorshipsQuery,
  useApproveSponsorshipMutation,
  useRejectSponsorshipMutation,
} = sponsorService;
