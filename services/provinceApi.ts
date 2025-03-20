import { Province, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const provinceApi = createApi({
  reducerPath: "provinceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Province"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListProvince: builder.query<ApiResponse<Province[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Province/GetProvincesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Province", id: "LIST" }] : []) // Return a LIST tag
    }),

    getProvinceById: builder.query<ApiResponse<Province>, string>({
      query: (id) => ({ url: `Province/GetProvinceById/${id}` })
    }),

    createProvince: builder.mutation<ApiResponse<Province>, Province>({
      query: (province) => ({
        url: "/Province/CreateProvince",
        method: "POST",
        body: province
      }),
      invalidatesTags: [{ type: "Province", id: "LIST" }]
    }),

    updateProvince: builder.mutation<ApiResponse<Province>, Province>({
      query: ({ id, ...body }) => ({
        url: `/Province/UpdateProvince/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Province", id: "LIST" }]
    }),

    deleteProvince: builder.mutation<ApiResponse<Province>, number>({
      query: (id) => ({
        url: `/Province/DeleteProvince/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Province", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListProvinceQuery,
  useGetProvinceByIdQuery,
  useCreateProvinceMutation,
  useUpdateProvinceMutation,
  useDeleteProvinceMutation
} = provinceApi;
