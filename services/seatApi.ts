import { Seat, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seatApi = createApi({
  reducerPath: "seatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Seat"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListSeat: builder.query<ApiResponse<Seat[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Seat/GetSeatsPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Seat", id: "LIST" }] : []) // Return a LIST tag
    }),

    getSeatById: builder.query<ApiResponse<Seat>, string>({
      query: (id) => ({ url: `/Seat/GetSeatById/${id}` })
    }),

    createSeat: builder.mutation<ApiResponse<Seat>, Seat>({
      query: (Seat) => ({
        url: "/Seat/CreateSeat",
        method: "POST",
        body: Seat
      }),
      invalidatesTags: [{ type: "Seat", id: "LIST" }]
    }),

    updateSeat: builder.mutation<ApiResponse<Seat>, Seat>({
      query: ({ id, ...body }) => ({
        url: `/Seat/UpdateSeat/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Seat", id: "LIST" }]
    }),

    deleteSeat: builder.mutation<ApiResponse<Seat>, number>({
      query: (id) => ({
        url: `/Seat/DeleteSeat/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Seat", id: "LIST" }]
    }),
    getSeatsByCarriageId: builder.query<ApiResponse<Seat[]>, { carriageId: string }>({
      query: ({ carriageId }) => ({
        url: `Seat/GetSeatsByCarriageId/by-carriage/${carriageId}`,
      }),
      providesTags: (result) =>
        result && result.data
          ? result.data.map((seat) => ({ type: "Seat", id: seat.id })) // Tag each seat by its ID
          : [{ type: "Seat", id: "LIST" }], // Fallback tag
    }),
  })
});

export const {
  useGetPagedListSeatQuery,
  useGetSeatByIdQuery,
  useCreateSeatMutation,
  useUpdateSeatMutation,
  useDeleteSeatMutation,
  useGetSeatsByCarriageIdQuery
} = seatApi;
