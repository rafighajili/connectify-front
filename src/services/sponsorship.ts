import { apiSlice } from "#/store/slices";
import { CreateSponsorshipRequestType, sponsorshipSchema, SponsorshipType } from "#/schemas";
import { DataMetaEntity, DataMetaType, ItemType } from "#/entities";
import { EventParamsType } from "#/types";

export const sponsorService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSponsorship: builder.mutation<void, CreateSponsorshipRequestType>({
      query: (body) => ({ url: `/sponsor`, method: "post", body }),
      invalidatesTags: ["Sponsorship"],
    }),
    getSponsorships: builder.query<DataMetaType<SponsorshipType[]>, EventParamsType>({
      query: () => ({ url: `/sponsor`, method: "get" }),
      transformResponse: (res: unknown) => DataMetaEntity(sponsorshipSchema.array()).parse(res),
      providesTags: (result, error, arg) =>
        result
          ? ["Sponsorship", ...result.data.map(({ id }) => ({ type: "Sponsorship" as const, id }))]
          : ["Sponsorship"],
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
