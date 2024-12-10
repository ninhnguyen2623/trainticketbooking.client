import { SeatType, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const seatTypeApi = createApi({
  reducerPath: "seatTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["SeatType"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListSeatType: builder.query<ApiResponse<SeatType[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "SeatType/GetSeatTypesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "SeatType", id: "LIST" }] : []) // Return a LIST tag
    }),

    getSeatTypeById: builder.query<ApiResponse<SeatType>, string>({
      query: (id) => ({ url: `/SeatType/GetSeatTypeById/${id}` })
    }),

    createSeatType: builder.mutation<ApiResponse<SeatType>, SeatType>({
      query: (SeatType) => ({
        url: "/SeatType/CreateSeatType",
        method: "POST",
        body: SeatType
      }),
      invalidatesTags: [{ type: "SeatType", id: "LIST" }]
    }),

    updateSeatType: builder.mutation<ApiResponse<SeatType>, SeatType>({
      query: ({ id, ...body }) => ({
        url: `/SeatType/UpdateSeatType/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "SeatType", id: "LIST" }]
    }),

    deleteSeatType: builder.mutation<ApiResponse<SeatType>, number>({
      query: (id) => ({
        url: `/SeatType/DeleteSeatType/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "SeatType", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListSeatTypeQuery,
  useGetSeatTypeByIdQuery,
  useCreateSeatTypeMutation,
  useUpdateSeatTypeMutation,
  useDeleteSeatTypeMutation
} = seatTypeApi;
