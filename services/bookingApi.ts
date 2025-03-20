import { Booking, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Booking"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListBooking: builder.query<ApiResponse<Booking[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "Booking/GetBookingsPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Booking", id: "LIST" }] : []) // Return a LIST tag
    }),

    getBookingById: builder.query<ApiResponse<Booking>, string>({
      query: (id) => ({ url: `Booking/GetById/${id}` })
    }),

    createBooking: builder.mutation<ApiResponse<Booking>, Booking>({
      query: (Booking) => ({
        url: "Booking/Create",
        method: "POST",
        body: Booking
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }]
    }),

    updateBooking: builder.mutation<ApiResponse<Booking>, Booking>({
      query: ({ id, ...body }) => ({
        url: `/Booking/Update/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }]
    }),

    deleteBooking: builder.mutation<ApiResponse<Booking>, number>({
      query: (id) => ({
        url: `/Booking/Delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListBookingQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation
} = bookingApi;
