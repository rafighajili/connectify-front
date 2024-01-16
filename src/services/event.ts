import { apiSlice } from "#/store/slices";
import { EventEntity, EventType, ItemEntity, ItemType } from "#/entities";
import { CreateEventRequest } from "#/schemas";

export const eventService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventType[], Partial<{}>>({
      query: (params) => ({ url: `/event`, method: "get", params }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    createEvent: builder.mutation<EventType, CreateEventRequest>({
      query: (body) => ({ url: `/event`, method: "post", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    getEvent: builder.query<EventType, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    updateEvent: builder.mutation<EventType, Partial<Omit<EventType, "id">> & Pick<EventType, "id">>({
      query: ({ id, ...body }) => ({ url: `/event/${id}`, method: "put", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    deleteEvent: builder.mutation<void, EventType["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
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
  useGetEventsQuery,
  useCreateEventMutation,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventTypesQuery,
  useGetEventCategoriesQuery,
} = eventService;
