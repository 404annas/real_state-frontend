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
    getPropertiesAdmin: builder.query({
      query: (params = {}) => ({
        url: "/properties/admin/all",
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
        headers: {
          // Don't set Content-Type header - let the browser set it with the correct boundary
        },
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: (request) => {
        const { id, body } = request;
        return {
          url: `/properties/${id}`,
          method: "PATCH",
          body: body,
          headers: {
            // Don't set Content-Type header - let the browser set it with the correct boundary
          },
        };
      },
      invalidatesTags: (result, error, request) => [{ type: "Property", id: request.id }, "Property"],
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
  useGetPropertiesAdminQuery,
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useGetFilterOptionsQuery,
} = propertyApi
