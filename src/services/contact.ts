import { apiSlice } from "#/store/slices";
import {
  ContactRequestType,
  contactResponseSchema,
  ContactResponseType,
  ContactSponsorRequestType,
  contactSponsorResponseSchema,
  ContactSponsorResponseType,
} from "#/schemas";
import { DataMetaEntity, DataMetaType } from "#/entities";
import { PageParamsType } from "#/types";

export const contactService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<void, ContactRequestType>({
      query: (body) => ({ url: `/contact`, method: "post", body }),
    }),
    getContact: builder.query<DataMetaType<ContactResponseType[]>, PageParamsType>({
      query: (params) => ({ url: `/contact`, method: "get", params: { ...params, take: 12 } }),
      transformResponse: (res: unknown) => DataMetaEntity(contactResponseSchema.array()).parse(res),
    }),

    createContactSponsor: builder.mutation<void, ContactSponsorRequestType>({
      query: (body) => ({ url: `/sponsor-contact`, method: "post", body }),
    }),
    getContactSponsor: builder.query<DataMetaType<ContactSponsorResponseType[]>, PageParamsType>({
      query: (params) => ({ url: `/sponsor-contact`, method: "get", params: { ...params, take: 12 } }),
      transformResponse: (res: unknown) => DataMetaEntity(contactSponsorResponseSchema.array()).parse(res),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactQuery,
  useCreateContactSponsorMutation,
  useGetContactSponsorQuery,
} = contactService;
