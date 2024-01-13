import { apiSlice } from "#/store/slices";
import { Event, EventEntity } from "#/entities";
import { Key } from "react";
import { CreateEventRequest, UpdateEventRequest } from "#/schemas";

export const organizerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query<Event, Key>({
      query: (id) => ({ url: `/organizer/get-event`, method: "get", params: { id } }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    createEvent: builder.mutation<Event, CreateEventRequest & { userId: Key }>({
      query: (values) => {
        const { userId, eventImage, ...body } = values;

        const bodyFormData = new FormData();
        bodyFormData.append("createNewEventRequest", JSON.stringify(body));
        bodyFormData.append("id", userId.toString());
        bodyFormData.append("imageFile", eventImage);

        return { url: `/organizer/create-event`, method: "post", formData: true, body: bodyFormData };
      },
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    updateEvent: builder.mutation<Event, Partial<UpdateEventRequest> & { eventId: Key }>({
      query: ({ eventId, ...body }) => ({ url: `/organizer/update-event`, method: "put", body, params: { eventId } }),
      transformResponse: (res: unknown) => EventEntity.parse(res),
    }),
    deleteEvent: builder.mutation<void, Key>({
      query: (id) => ({ url: `/organizer/delete-event`, method: "delete", params: { id } }),
    }),

    getAllEvents: builder.query<Event[], { userId?: Key; type?: string }>({
      query: (params) => ({ url: `/organizer/get-events`, method: "get", params }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
    getEventTypes: builder.query<string[], void>({
      query: () => ({ url: `/organizer/event-types`, method: "get" }),
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
} = organizerService;
