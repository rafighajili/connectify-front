import { apiSlice } from "#/store/slices";
import { AuthResponse, authResponseSchema, LoginRequest, RegisterRequest } from "#/schemas";
import { User, UserEntity } from "#/entities";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: `/auth/login`, method: "post", body }),
      transformResponse: (res: { data: unknown }) => authResponseSchema.parse(res.data),
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: `/auth/register`, method: "post", body }),
      transformResponse: (res: { data: unknown }) => authResponseSchema.parse(res.data),
    }),

    getLoggedInUser: builder.query<User, void>({
      query: () => ({ url: `/auth/user`, method: "get" }),
      transformResponse: (res: { data: unknown }) => UserEntity.parse(res.data),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetLoggedInUserQuery } = authService;
