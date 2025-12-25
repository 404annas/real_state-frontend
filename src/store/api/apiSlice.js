import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logout } from "../slices/authSlice"
import { toast } from "sonner"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8001/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
  credentials: "include",
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // Check if the error is due to unauthorized access (session expired)
  if (result.error && result.error.status === 401) {
    // Logout the user and redirect to login
    api.dispatch(logout())
    toast.error("Session expired. Please log in again.")
    window.location.href = "/login" // Redirect to login page
  }

  return result
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Property", "User", "Auth", "Inquiry"],
  endpoints: () => ({}),
})
