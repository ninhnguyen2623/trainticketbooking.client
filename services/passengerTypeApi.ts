import {  ApiParams, PassengerType } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passengerTypeApi = createApi({
  reducerPath: "passengerTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["PassengerType"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListPassengerType: builder.query<ApiResponse<PassengerType[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/PassengerType/GetPassengerTypesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "PassengerType", id: "LIST" }] : []) // Return a LIST tag
    }),

    getPassengerTypeById: builder.query<ApiResponse<PassengerType>, string>({
      query: (id) => ({ url: `/PassengerType/GetPassengerTypeById/${id}` })
    }),

    createPassengerType: builder.mutation<ApiResponse<PassengerType>, PassengerType>({
      query: (PassengerType) => ({
        url: "/PassengerType/CreatePassengerType",
        method: "POST",
        body: PassengerType
      }),
      invalidatesTags: [{ type: "PassengerType", id: "LIST" }]
    }),

    updatePassengerType: builder.mutation<ApiResponse<PassengerType>, PassengerType>({
      query: ({ id, ...body }) => ({
        url: `/PassengerType/UpdatePassengerType/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "PassengerType", id: "LIST" }]
    }),

    deletePassengerType: builder.mutation<ApiResponse<PassengerType>, number>({
      query: (id) => ({
        url: `/PassengerType/DeletePassengerType/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "PassengerType", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListPassengerTypeQuery,
  useGetPassengerTypeByIdQuery,
  useCreatePassengerTypeMutation,
  useUpdatePassengerTypeMutation,
  useDeletePassengerTypeMutation
} = passengerTypeApi;
