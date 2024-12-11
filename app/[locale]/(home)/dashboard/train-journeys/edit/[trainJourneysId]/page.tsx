"use client";

import PageContainer from "@/components/layout/PageContainer";
import TrainjourneyForm from "../../components/TrainJourneyForm";
import { useGetTrainJourneyByIdQuery, useUpdateTrainJourneyMutation } from "@/services/trainJourneyApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { TrainJourney } from "@/interfaces";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useMemo, useState } from "react";

type PageProps = { params: { trainJourneysId: string } };

export default function Page({ params: { trainJourneysId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetTrainJourneyByIdQuery(trainJourneysId);

  // Set up the mutation hook for updating the train
  const [updateTrainjourney] = useUpdateTrainJourneyMutation();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const formattedData: TrainJourney | null = useMemo(() => {
    if (!data?.data) return null;

    return {
      id: data.data.id || 0,
      trainId: data.data.trainId || 0,
      trainName: data.data.trainName || "",
      departureDate: data.data.departureDate
        ? new Date(data.data.departureDate).toISOString()
        : "",
      arrivalDate: data.data.arrivalDate
        ? new Date(data.data.arrivalDate).toISOString()
        : "",
      status: data.data.status || "",
    };
  }, [data]);
  // Handle form submission

  const handleSubmit = async (values: TrainJourney) => {
    console.log('hdhdhdh:', values);
    try {
      toast.loading("Updating Trainjourney...", { id: "update-Trainjourney" });
      const result = await updateTrainjourney(values).unwrap();

      if (result?.success) {
        toast.success("Trainjourney updated successfully!", { id: "update-Trainjourney" });
        await refetch()
      } else {
        toast.error("Trainjourney update failed. Please try again.", {
          id: "update-Trainjourney"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the Trainjourney.";
      toast.error(errorMessage, { id: "update-Trainjourney" });
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
        <TrainjourneyForm
          mode="edit"
          initialData={formattedData}
          listdataTrain={dataTrain?.data}
          pageTitle={"Edit Trainjourney"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
