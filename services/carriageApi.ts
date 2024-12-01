import { Carriage, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carriageApi = createApi({
  reducerPath: "carriageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Carriage"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListCarriage: builder.query<ApiResponse<Carriage[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Carriage/GetCarriagesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Carriage", id: "LIST" }] : []) // Return a LIST tag
    }),

    getCarriageById: builder.query<ApiResponse<Carriage>, string>({
      query: (id) => ({ url: `/Carriage/GetCarriageById/${id}` })
    }),

    createCarriage: builder.mutation<ApiResponse<Carriage>, Carriage>({
      query: (carriage) => ({
        url: "/Carriage/CreateCarriage",
        method: "POST",
        body: carriage
      }),
      invalidatesTags: [{ type: "Carriage", id: "LIST" }]
    }),

    updateCarriage: builder.mutation<ApiResponse<Carriage>, Carriage>({
      query: ({ id, ...body }) => ({
        url: `/Carriage/UpdateCarriage/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Carriage", id: "LIST" }]
    }),

    deleteCarriage: builder.mutation<ApiResponse<Carriage>, number>({
      query: (id) => ({
        url: `/Carriage/DeleteCarriage/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Carriage", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListCarriageQuery,
  useGetCarriageByIdQuery,
  useCreateCarriageMutation,
  useUpdateCarriageMutation,
  useDeleteCarriageMutation
} = carriageApi;
