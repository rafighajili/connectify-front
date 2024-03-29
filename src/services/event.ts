import { apiSlice } from "#/store/slices";
import { DataMetaEntity, DataMetaType, EventEntity, EventType, ItemEntity, ItemType } from "#/entities";
import {
  CreateEventRequestType,
  eventCompactSchema,
  EventCompactType,
  eventSponsoredSchema,
  EventSponsoredType,
  UpdateEventRequestType,
} from "#/schemas";
import { objectToFormData } from "#/utils";
import { EventParamsType } from "#/types";

export const eventService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<void, CreateEventRequestType>({
      query: (body) => ({ url: `/event`, method: "post", body: objectToFormData(body) }),
      invalidatesTags: ["Event"],
    }),
    getEvent: builder.query<EventType, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
      providesTags: (result, error, arg) => [{ type: "Event", id: arg }],
    }),
    updateEvent: builder.mutation<EventType, UpdateEventRequestType>({
      query: ({ id, ...body }) => ({ url: `/event/${id}`, method: "put", body: objectToFormData(body) }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
      invalidatesTags: (result, error, arg) => [{ type: "Event", id: arg.id }],
    }),
    deleteEvent: builder.mutation<void, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "delete" }),
      invalidatesTags: (result, error, arg) => [{ type: "Event", id: arg }],
    }),

    getEvents: builder.query<DataMetaType<EventCompactType[]>, EventParamsType>({
      query: (params) => ({ url: `/event`, method: "get", params }),
      transformResponse: (res: unknown) => DataMetaEntity(eventCompactSchema.array()).parse(res),
      providesTags: (result, error, arg) =>
        result ? ["Event", ...result.data.map(({ id }) => ({ type: "Event" as const, id }))] : ["Event"],
    }),
    getEventsOrganized: builder.query<DataMetaType<EventType[]>, EventParamsType>({
      query: (params) => ({ url: `/event/organized`, method: "get", params }),
      transformResponse: (res: unknown) => DataMetaEntity(EventEntity.array()).parse(res),
      providesTags: (result, error, arg) =>
        result ? ["Event", ...result.data.map(({ id }) => ({ type: "Event" as const, id }))] : ["Event"],
    }),
    getEventsSponsored: builder.query<DataMetaType<EventSponsoredType[]>, EventParamsType>({
      query: (params) => ({ url: `/event/sponsored`, method: "get", params }),
      transformResponse: (res: unknown) => DataMetaEntity(eventSponsoredSchema.array()).parse(res),
      providesTags: (result, error, arg) =>
        result
          ? ["Sponsorship", ...result.data.map(({ id }) => ({ type: "Sponsorship" as const, id }))]
          : ["Sponsorship"],
    }),
    getEventsAdmin: builder.query<DataMetaType<EventType[]>, EventParamsType>({
      query: (params) => ({ url: `/event/admin`, method: "get", params }),
      transformResponse: (res: unknown) => DataMetaEntity(EventEntity.array()).parse(res),
      providesTags: (result, error, arg) =>
        result ? ["Event", ...result.data.map(({ id }) => ({ type: "Event" as const, id }))] : ["Event"],
    }),

    approveEvent: builder.mutation<EventType, ItemType["id"]>({
      query: (id) => ({ url: `/event/${id}/approve`, method: "post" }),
      invalidatesTags: (result, error, arg) => [{ type: "Event", id: arg }],
    }),
    rejectEvent: builder.mutation<EventType, ItemType["id"]>({
      query: (id) => ({ url: `/event/${id}/reject`, method: "post" }),
      invalidatesTags: (result, error, arg) => [{ type: "Event", id: arg }],
    }),

    getEventTypes: builder.query<ItemType[], void>({
      query: () => ({ url: `/event-type`, method: "get" }),
      transformResponse: (res: unknown) => ItemEntity.array().parse(res),
    }),
    getEventCategories: builder.query<ItemType[], void>({
      query: () => ({ url: `/category`, method: "get" }),
      transformResponse: (res: unknown) => ItemEntity.array().parse(res),
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventsQuery,
  useGetEventsOrganizedQuery,
  useGetEventsSponsoredQuery,
  useGetEventsAdminQuery,
  useApproveEventMutation,
  useRejectEventMutation,
  useGetEventTypesQuery,
  useGetEventCategoriesQuery,
} = eventService;
