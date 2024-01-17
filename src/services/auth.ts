import { apiSlice } from "#/store/slices";
import { LoginRequestType, RegisterRequestType } from "#/schemas";
import { UserEntity, UserType } from "#/entities";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerOrganizer: builder.mutation<UserType, RegisterRequestType>({
      query: (body) => ({ url: `/auth/register`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    registerSponsor: builder.mutation<UserType, RegisterRequestType>({
      query: (body) => ({ url: `/auth/register-as`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    login: builder.mutation<UserType, LoginRequestType>({
      query: (body) => ({ url: `/auth/login`, method: "post", body }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: `/auth/logout`, method: "post" }),
    }),

    getUser: builder.query<UserType, void>({
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
