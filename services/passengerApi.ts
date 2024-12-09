import {  ApiParams, Passenger } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const passengerApi = createApi({
  reducerPath: "passengerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Passenger"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListPassenger: builder.query<ApiResponse<Passenger[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Passenger/GetPassengersPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Passenger", id: "LIST" }] : []) // Return a LIST tag
    }),

    getPassengerById: builder.query<ApiResponse<Passenger>, string>({
      query: (id) => ({ url: `/Passenger/GetPassengerById/${id}` })
    }),

    createPassenger: builder.mutation<ApiResponse<Passenger>, Passenger>({
      query: (Passenger) => ({
        url: "/Passenger/CreatePassenger",
        method: "POST",
        body: Passenger
      }),
      invalidatesTags: [{ type: "Passenger", id: "LIST" }]
    }),
    
    updatePassenger: builder.mutation<ApiResponse<Passenger>, Passenger>({
      query: ( body ) => ({
        url: `/Passenger/UpdatePassenger/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Passenger", id: "LIST" }]
    }),

    deletePassenger: builder.mutation<ApiResponse<Passenger>, number>({
      query: (id) => ({
        url: `/Passenger/DeletePassenger/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Passenger", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListPassengerQuery,
  useGetPassengerByIdQuery,
  useCreatePassengerMutation,
  useUpdatePassengerMutation,
  useDeletePassengerMutation
} = passengerApi;
