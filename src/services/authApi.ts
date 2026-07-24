import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "./apiConfig";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginUser = {
  id: string;
  email: string;
  password: string;
  name: string;
};

type LoginResponse = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      async queryFn(credentials, _queryApi, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/users?email=${encodeURIComponent(
            credentials.email,
          )}&password=${encodeURIComponent(credentials.password)}`,
        });

        if (result.error) {
          return { error: result.error };
        }

        const users = result.data as LoginUser[];
        const user = users[0];

        if (!user) {
          return {
            error: {
              status: 401,
              data: "Invalid email or password",
            },
          };
        }

        return {
          data: {
            token: `fake-token-${user.id}`,
            user: {
              email: user.email,
              name: user.name,
            },
          },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
