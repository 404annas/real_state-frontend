import { api } from "./apiSlice"

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (params = {}) => ({
        url: "/properties",
        params,
      }),
      providesTags: ["Property"],
    }),
    getPropertyById: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),
    createProperty: builder.mutation({
      query: (formData) => ({
        url: "/properties",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/properties/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Property", id }, "Property"],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
    getFilterOptions: builder.query({
      query: () => "/properties/filter-options",
    }),
  }),
})

export const {
  useGetPropertiesQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetFilterOptionsQuery,
} = propertyApi
