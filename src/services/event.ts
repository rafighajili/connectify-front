import { apiSlice } from "#/store/slices";
import { Event, EventEntity } from "#/entities";
import { Key } from "react";
import { CreateEventRequest } from "#/schemas";

export const eventService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<Event, CreateEventRequest>({
      query: (body) => ({ url: `/event`, method: "post", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    getEvents: builder.query<Event[], void>({
      query: () => ({ url: `/event`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEvent: builder.query<Event, Event["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    updateEvent: builder.mutation<Event, Partial<Omit<Event, "id">> & Pick<Event, "id">>({
      query: ({ id, ...body }) => ({ url: `/event/${id}`, method: "put", body }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    deleteEvent: builder.mutation<void, Event["id"]>({
      query: (id) => ({ url: `/event/${id}`, method: "get" }),
    }),

    getAllEvents: builder.query<Event[], { userId?: Key; type?: string }>({
      query: (params) => ({ url: `/event/get-events`, method: "get", params }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEventTypes: builder.query<string[], void>({
      query: () => ({ url: `/event/event-types`, method: "get" }),
    }),
  }),
});

export const {
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,
  useGetEventTypesQuery,
} = eventService;
