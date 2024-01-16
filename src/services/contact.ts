import { apiSlice } from "#/store/slices";
import {
  ContactRequestType,
  contactResponseSchema,
  ContactResponseType,
  ContactSponsorRequestType,
  contactSponsorResponseSchema,
  ContactSponsorResponseType,
} from "#/schemas";

export const eventService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<void, ContactRequestType>({
      query: (body) => ({ url: `/contact`, method: "post", body }),
    }),
    getContact: builder.query<ContactResponseType[], void>({
      query: () => ({ url: `/contact`, method: "get" }),
      transformResponse: (res: unknown) => contactResponseSchema.array().parse(res),
    }),

    createContactSponsor: builder.mutation<void, ContactSponsorRequestType>({
      query: (body) => ({ url: `/sponsor-contact`, method: "post", body }),
    }),
    getContactSponsor: builder.query<ContactSponsorResponseType[], void>({
      query: () => ({ url: `/sponsor-contact`, method: "get" }),
      transformResponse: (res: unknown) => contactSponsorResponseSchema.array().parse(res),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactQuery,
  useCreateContactSponsorMutation,
  useGetContactSponsorQuery,
} = eventService;
