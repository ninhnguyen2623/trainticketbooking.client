"use client";

import PageContainer from "@/components/layout/PageContainer";
import StationForm from "../../components/StationForm";
import { useGetStationByIdQuery, useUpdateStationMutation } from "@/services/stationApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { Station } from "@/interfaces";
import { useState } from "react";
import { useGetPagedListProvinceQuery } from "@/services/provinceApi";

type PageProps = { params: { stationId: string } };

export default function Page({ params: { stationId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetStationByIdQuery(stationId);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });

  const { data: dataProvince, isFetching: isFetchingTrain } = useGetPagedListProvinceQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });

  // Set up the mutation hook for updating the train
  const [updateStation] = useUpdateStationMutation();

  // Handle form submission
  const handleSubmit = async (values: Station) => {
    try {
      toast.loading("Updating Station...", { id: "update-Station" });
      const result = await updateStation(values).unwrap();

      if (result?.success) {
        toast.success("Station updated successfully!", { id: "update-Station" });
        await refetch()
      } else {
        toast.error("Station update failed. Please try again.", {
          id: "update-Station"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the Station.";
      toast.error(errorMessage, { id: "update-Station" });
    }
  };

  if (isLoading) {
    return <FormCardSkeleton />;
  }

  if (isError) {
    return (
      <PageContainer scrollable>
        <div className="flex-1 space-y-4">
          <p className="text-red-500">
            Failed to load train data. Please try again later.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {/* Render the TrainForm component with the fetched data */}
        <StationForm
          mode="edit"
          initialData={data?.data}
          listdataProvince={dataProvince?.data}
          pageTitle={"Edit Station"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
