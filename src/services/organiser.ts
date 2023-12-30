import { apiSlice } from "#/store/slices";
import { Event, EventEntity } from "#/entities";

export const organizerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => ({ url: `/organizer/get-events`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
  }),
});

export const { useGetAllEventsQuery } = organizerService;
