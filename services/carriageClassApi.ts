import { CarriageClass, ApiParams } from "@/interfaces";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carriageClassApi = createApi({
  reducerPath: "carriageClassApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  tagTypes: ["CarriageClass"], // Tag types for cache management
  endpoints: (builder) => ({
    getPagedListCarriageClass: builder.query<ApiResponse<CarriageClass[]>, ApiParams>({
      query: ({ pageNumber, pageSize }) => ({
        url: "/CarriageClass/GetCarriageClassesPagedList",
        params: { pageNumber, pageSize }
      }),
      providesTags: (result) => (result ? [{ type: "CarriageClass", id: "LIST" }] : []) // Return a LIST tag
    }),

    getCarriageClassById: builder.query<ApiResponse<CarriageClass>, string>({
      query: (id) => ({ url: `/CarriageClass/GetCarriageClassById/${id}` })
    }),

    createCarriageClass: builder.mutation<ApiResponse<CarriageClass>, CarriageClass>({
      query: (carriageClass) => ({
        url: "/CarriageClass/CreateCarriageClass",
        method: "POST",
        body: carriageClass
      }),
      invalidatesTags: [{ type: "CarriageClass", id: "LIST" }]
    }),

    updateCarriageClass: builder.mutation<ApiResponse<CarriageClass>, CarriageClass>({
      query: (body) => ({
        url: `/CarriageClass/UpdateCarriageClass/${body.id}`, // Truyền ID trong URL
        method: "PUT",
        body // Truyền toàn bộ dữ liệu bao gồm ID trong body
      }),
      invalidatesTags: [{ type: "CarriageClass", id: "LIST" }]
    }),
    // updateCarriageClass: builder.mutation<ApiResponse<CarriageClass>, CarriageClass>({
    //   query: ({ id, ...body }) => ({ 
    //     url: `/CarriageClass/UpdateCarriageClass/${id}`,
    //     method: "PUT",
    //     body
    //   }),
    //   invalidatesTags: [{ type: "CarriageClass", id: "LIST" }]
    // }),

    deleteCarriageClass: builder.mutation<ApiResponse<CarriageClass>, number>({
      query: (id) => ({
        url: `/CarriageClass/DeleteCarriageClass/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [{ type: "CarriageClass", id: "LIST" }]
    })
  })
});

export const {
  useGetPagedListCarriageClassQuery,
  useGetCarriageClassByIdQuery,
  useCreateCarriageClassMutation,
  useUpdateCarriageClassMutation,
  useDeleteCarriageClassMutation
} = carriageClassApi;
