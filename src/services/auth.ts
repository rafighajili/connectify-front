import { apiSlice } from "#/store/slices";
import { LoginRequest, LoginResponse, loginResponseSchema, RegisterRequest, VerifyRequest } from "#/schemas";
import { User, UserEntity } from "#/entities";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOrganizer: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: `/organizer/login`, method: "post", body }),
      transformResponse: (res: unknown) => loginResponseSchema.parse(res),
    }),

    loginSponsor: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: `/sponsor/login`, method: "post", body }),
      transformResponse: (res: unknown) => loginResponseSchema.parse(res),
    }),

    loginAdmin: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: `/admin/login`, method: "post", body }),
      transformResponse: (res: unknown) => loginResponseSchema.parse(res),
    }),

    registerOrganizer: builder.mutation<void, RegisterRequest>({
      query: (body) => ({ url: `/organizer/register`, method: "post", body }),
    }),

    registerSponsor: builder.mutation<void, RegisterRequest>({
      query: (body) => ({ url: `/sponsor/register`, method: "post", body }),
    }),

    verify: builder.mutation<void, VerifyRequest>({
      query: (params) => ({ url: `/verification/verify`, method: "post", params }),
    }),

    getUser: builder.query<User, void>({
      query: () => ({ url: `/user/current-user`, method: "get" }),
      transformResponse: (res: unknown) => UserEntity.parse(res),
    }),
  }),
});

export const {
  useLoginOrganizerMutation,
  useLoginSponsorMutation,
  useLoginAdminMutation,
  useRegisterOrganizerMutation,
  useRegisterSponsorMutation,
  useVerifyMutation,
  useGetUserQuery,
} = authService;
