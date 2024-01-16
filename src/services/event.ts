import { apiSlice } from "#/store/slices";
import { EventEntity, EventType, ItemEntity, ItemType } from "#/entities";
import { CreateEventRequest, UpdateEventRequest } from "#/schemas";

export const eventService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<EventType, CreateEventRequest>({
      query: (body) => ({ url: `/event`, method: "post", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    getEvent: builder.query<EventType, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    updateEvent: builder.mutation<EventType, UpdateEventRequest>({
      query: ({ id, ...body }) => ({ url: `/event/${id}`, method: "put", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    deleteEvent: builder.mutation<void, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
    }),

    getEvents: builder.query<
      EventType[],
      Partial<{ skip: number; take: number; typeId: ItemType["id"]; categories: ItemType["id"][] }>
    >({
      query: (params) => ({ url: `/event`, method: "get", params }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEventsOrganized: builder.query<EventType[], void>({
      query: () => ({ url: `/event/organized`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEventsSponsored: builder.query<EventType[], void>({
      query: () => ({ url: `/event/sponsored`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
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
  useGetEventTypesQuery,
  useGetEventCategoriesQuery,
} = eventService;