import {  ApiParams, Station } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const stationApi = createApi({
  reducerPath: "stationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Station"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListStation: builder.query<ApiResponse<Station[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Station/GetStationsPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Station", id: "LIST" }] : []) // Return a LIST tag
    }),

    getStationById: builder.query<ApiResponse<Station>, string>({
      query: (id) => ({ url: `/Station/GetStationById/${id}` })
    }),

    createStation: builder.mutation<ApiResponse<Station>, Station>({
      query: (Station) => ({
        url: "/Station/CreateStation",
        method: "POST",
        body: Station
      }),
      invalidatesTags: [{ type: "Station", id: "LIST" }]
    }),
    
    updateStation: builder.mutation<ApiResponse<Station>, Station>({
      query: ( body ) => ({
        url: `/Station/UpdateStation/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Station", id: "LIST" }]
    }),

    deleteStation: builder.mutation<ApiResponse<Station>, number>({
      query: (id) => ({
        url: `/Station/DeleteStation/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Station", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListStationQuery,
  useGetStationByIdQuery,
  useCreateStationMutation,
  useUpdateStationMutation,
  useDeleteStationMutation
} = stationApi;
