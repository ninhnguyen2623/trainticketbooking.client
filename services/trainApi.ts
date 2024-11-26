import { Train, TrainApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trainApi = createApi({
  reducerPath: "trainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["Train"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListTrain: builder.query<ApiResponse<Train[]>, TrainApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "Train/GetPagedListTrain",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "Train", id: "LIST" }] : []) // Return a LIST tag
    }),

    getTrainById: builder.query<ApiResponse<Train>, string>({
      query: (id) => ({ url: `Train/GetTrainById/${id}` })
    }),

    createTrain: builder.mutation<ApiResponse<Train>, Train>({
      query: (train) => ({
        url: "Train/CreateTrain",
        method: "POST",
        body: train
      }),
      invalidatesTags: [{ type: "Train", id: "LIST" }]
    }),

    updateTrain: builder.mutation<ApiResponse<Train>, Train>({
      query: ({ id, ...body }) => ({
        url: `/Train/UpdateTrain/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "Train", id: "LIST" }]
    }),

    deleteTrain: builder.mutation<ApiResponse<Train>, number>({
      query: (id) => ({
        url: `/Train/DeleteTrain/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "Train", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListTrainQuery,
  useGetTrainByIdQuery,
  useCreateTrainMutation,
  useUpdateTrainMutation,
  useDeleteTrainMutation
} = trainApi;
