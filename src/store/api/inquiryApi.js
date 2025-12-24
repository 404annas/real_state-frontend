import { api } from "./apiSlice"

export const inquiryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    submitInquiry: builder.mutation({
      query: (inquiryData) => ({
        url: "/inquiries/submit",
        method: "POST",
        body: inquiryData,
      }),
      invalidatesTags: ["Inquiry"],
    }),
    getInquiries: builder.query({
      query: (params = {}) => ({
        url: "/inquiries",
        params,
      }),
      providesTags: ["Inquiry"],
    }),
    getInquiryById: builder.query({
      query: (id) => `/inquiries/${id}`,
      providesTags: (result, error, id) => [{ type: "Inquiry", id }],
    }),
  }),
})

export const {
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useGetInquiryByIdQuery,
} = inquiryApi