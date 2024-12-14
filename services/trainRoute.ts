import { TrainRoute, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trainRouteApi = createApi({
  reducerPath: "trainRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["TrainRoute"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListTrainRoute: builder.query<ApiResponse<TrainRoute[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/Route/GetRoutesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "TrainRoute", id: "LIST" }] : []) // Return a LIST tag
    }),

    getTrainRouteById: builder.query<ApiResponse<TrainRoute>, string>({
      query: (id) => ({ url: `/Route/GetRouteById/${id}` })
    }),

    createTrainRoute: builder.mutation<ApiResponse<TrainRoute>, TrainRoute>({
      query: (TrainRoute) => ({
        url: "/Route/CreateRoute",
        method: "POST",
        body: TrainRoute
      }),
      invalidatesTags: [{ type: "TrainRoute", id: "LIST" }]
    }),

    updateTrainRoute: builder.mutation<ApiResponse<TrainRoute>, TrainRoute>({
      query: (body) => ({
        url: `/Route/UpdateRoute/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "TrainRoute", id: "LIST" }]
    }),

    deleteTrainRoute: builder.mutation<ApiResponse<TrainRoute>, number>({
      query: (id) => ({
        url: `/Route/DeleteRoute/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "TrainRoute", id: "LIST" }]
    }),
    getRoutesByTrainId: builder.query<ApiResponse<TrainRoute[]>, number>({
      query: (trainId) => ({
        url: `/Route/GetRoutesByTrainId/by-train/${trainId}`,
      }),
      providesTags: (result, error, trainId) =>
        result ? [{ type: "TrainRoute", id: trainId }] : [],
    }),
  })
});

export const {
  useGetPagedListTrainRouteQuery,
  useGetTrainRouteByIdQuery,
  useCreateTrainRouteMutation,
  useUpdateTrainRouteMutation,
  useDeleteTrainRouteMutation,
  useGetRoutesByTrainIdQuery

} = trainRouteApi;
