import { apiSlice } from "#/store/slices";
import { LoginRequest, RegisterRequest } from "#/schemas";
import { User, UserEntity } from "#/entities";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerOrganizer: builder.mutation<User, RegisterRequest>({
      query: (body) => ({ url: `/auth/register`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    registerSponsor: builder.mutation<User, RegisterRequest>({
      query: (body) => ({ url: `/auth/register-as`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    login: builder.mutation<User, LoginRequest>({
      query: (body) => ({ url: `/auth/login`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: `/auth/logout`, method: "post" }),
    }),

    getUser: builder.query<User, void>({
      query: () => ({ url: `/auth/me`, method: "get" }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),
  }),
});

export const {
  useRegisterOrganizerMutation,
  useRegisterSponsorMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authService;
