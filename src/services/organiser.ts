import { apiSlice } from "#/store/slices";
import { LoginRequest, RegisterRequest, VerifyRequest } from "#/schemas";
import { Event, EventEntity, User, UserEntity } from "#/entities";

export const organizerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<Event[], void>({
      query: () => ({ url: `/organizer/get-all-events`, method: "get" }),
      transformResponse: (res: unknown) => EventEntity.array().parse(res),
    }),
  }),
});

export const { useGetAllEventsQuery } = organizerService;
