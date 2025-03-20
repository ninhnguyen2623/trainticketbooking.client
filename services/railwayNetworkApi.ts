import {  ApiParams, RailwayNetwork } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const railwayNetworkApi = createApi({
  reducerPath: "railwayNetworkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["RailwayNetwork"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListRailwayNetwork: builder.query<ApiResponse<RailwayNetwork[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "RailwayNetwork/paged",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "RailwayNetwork", id: "LIST" }] : []) // Return a LIST tag
    }),

    getRailwayNetworkById: builder.query<ApiResponse<RailwayNetwork>, string>({
      query: (id) => ({ url: `/RailwayNetwork/${id}` })
    }),

    createRailwayNetwork: builder.mutation<ApiResponse<RailwayNetwork>, RailwayNetwork>({
      query: (RailwayNetwork) => ({
        url: "/RailwayNetwork",
        method: "POST",
        body: RailwayNetwork
      }),
      invalidatesTags: [{ type: "RailwayNetwork", id: "LIST" }]
    }),
    
    updateRailwayNetwork: builder.mutation<ApiResponse<RailwayNetwork>, RailwayNetwork>({
      query: ( body ) => ({
        url: `/RailwayNetwork/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "RailwayNetwork", id: "LIST" }]
    }),

    deleteRailwayNetwork: builder.mutation<ApiResponse<RailwayNetwork>, number>({
      query: (id) => ({
        url: `/RailwayNetwork/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "RailwayNetwork", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListRailwayNetworkQuery,
  useGetRailwayNetworkByIdQuery,
  useCreateRailwayNetworkMutation,
  useUpdateRailwayNetworkMutation,
  useDeleteRailwayNetworkMutation
} = railwayNetworkApi;
