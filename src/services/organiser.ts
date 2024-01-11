import { apiSlice } from "#/store/slices";
import { Event, EventEntity } from "#/entities";
import { Key } from "react";

export const organizerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query<Event, Key>({
      query: (id) => ({ url: `/organizer/get-event`, method: "get", params: { id } }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    createEvent: builder.query<Event, Event>({
      query: (event) => ({ url: `/organizer/create-event`, method: "post" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    updateEvent: builder.query<Event, Event>({
      query: (event) => ({ url: `/organizer/update-event`, method: "put" }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    deleteEvent: builder.query<void, Key>({
      query: (id) => ({ url: `/organizer/delete-event`, method: "delete", params: { id } }),
    }),

    getAllEvents: builder.query<Event[], void>({
      query: () => ({ url: `/organizer/get-events`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEventTypes: builder.query<string[], void>({
      query: () => ({ url: `/organizer/event-types`, method: "get" }),
    }),
  }),
});

export const { useGetAllEventsQuery } = organizerService;
