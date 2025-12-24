import { api } from "./apiSlice"

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/users/verify",
        method: "POST",
        body: otpData,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getUsers: builder.query({
      query: (params = {}) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUsersQuery,
} = userApi