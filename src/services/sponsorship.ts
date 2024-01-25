import { apiSlice } from "#/store/slices";
import { CreateSponsorshipRequestType, sponsorshipSchema, SponsorshipType } from "#/schemas";
import { ItemType } from "#/entities";

export const sponsorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSponsorship: builder.mutation<void, CreateSponsorshipRequestType>({
      query: (body) => ({ url: `/sponsor`, method: "post", body }),
      invalidatesTags: ["Sponsorship"],
    }),
    getSponsorships: builder.query<SponsorshipType[], void>({
      query: () => ({ url: `/sponsor`, method: "get" }),
      transformResponse: (res: unknown) => sponsorshipSchema.array().parse(res),
      providesTags: (result, error, arg) =>
        result ? ["Sponsorship", ...result.map(({ id }) => ({ type: "Sponsorship" as const, id }))] : ["Sponsorship"],
    }),
    approveSponsorship: builder.mutation<void, ItemType["id"]>({
      query: (id) => ({ url: `/sponsor/${id}/approve`, method: "post" }),
      invalidatesTags: (result, error, arg) => [{ type: "Sponsorship", id: arg }],
    }),
    rejectSponsorship: builder.mutation<void, ItemType["id"]>({
      query: (id) => ({ url: `/sponsor/${id}/reject`, method: "post" }),
      invalidatesTags: (result, error, arg) => [{ type: "Sponsorship", id: arg }],
    }),
  }),
});

export const {
  useCreateSponsorshipMutation,
  useGetSponsorshipsQuery,
  useApproveSponsorshipMutation,
  useRejectSponsorshipMutation,
} = sponsorService;