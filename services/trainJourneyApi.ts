import { TrainJourney, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trainJourneyApi = createApi({
  reducerPath: "trainJourneyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["TrainJourney"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListTrainJourney: builder.query<ApiResponse<TrainJourney[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/TrainJourney/GetTrainJourneysPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "TrainJourney", id: "LIST" }] : []) // Return a LIST tag
    }),

    getTrainJourneyById: builder.query<ApiResponse<TrainJourney>, string>({
      query: (id) => ({ url: `/TrainJourney/GetTrainJourneyById/${id}` })
    }),

    createTrainJourney: builder.mutation<ApiResponse<TrainJourney>, TrainJourney>({
      query: (TrainJourney) => ({
        url: "/TrainJourney/CreateTrainJourney",
        method: "POST",
        body: TrainJourney
      }),
      invalidatesTags: [{ type: "TrainJourney", id: "LIST" }]
    }),

    updateTrainJourney: builder.mutation<ApiResponse<TrainJourney>, TrainJourney>({
      query: (body) => ({
        url: `/TrainJourney/UpdateTrainJourney`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "TrainJourney", id: "LIST" }]
    }),

    deleteTrainJourney: builder.mutation<ApiResponse<TrainJourney>, number>({
      query: (id) => ({
        url: `/TrainJourney/DeleteTrainJourney/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "TrainJourney", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListTrainJourneyQuery,
  useGetTrainJourneyByIdQuery,
  useCreateTrainJourneyMutation,
  useUpdateTrainJourneyMutation,
  useDeleteTrainJourneyMutation
} = trainJourneyApi;
