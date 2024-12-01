"use client";

import PageContainer from "@/components/layout/PageContainer";
import CarriageForm from "../../components/CarriageForm";
import { useGetCarriageByIdQuery, useUpdateCarriageMutation } from "@/services/carriageApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { Carriage } from "@/interfaces";
import { useState } from "react";
import { useGetPagedListCarriageClassQuery } from "@/services/carriageClassApi";
import { useGetPagedListTrainQuery } from "@/services/trainApi";

type PageProps = { params: { carriageId: string } };

export default function Page({ params: { carriageId } }: PageProps) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataCarriageClass, isFetching } = useGetPagedListCarriageClassQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });

  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetCarriageByIdQuery(carriageId);

  // Set up the mutation hook for updating the train
  const [updateCarriage] = useUpdateCarriageMutation();

  // Handle form submission
  const handleSubmit = async (values: Carriage) => {
    try {
      toast.loading("Updating Carriage...", { id: "update-Carriage" });

      const result = await updateCarriage(values).unwrap();

      if (result?.success) {
        toast.success("Carriage updated successfully!", { id: "update-Carriage" });
        await refetch();
      } else {
        toast.error("Carriage update failed. Please try again.", {
          id: "update-Carriage"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the Carriage.";
      toast.error(errorMessage, { id: "update-Carriage" });
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
        <CarriageForm
          mode="edit"
          initialData={data?.data}
          listdataCarriageClass={dataCarriageClass?.data}
          listdataTrain={dataTrain?.data}
          pageTitle={"Edit Carriage"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
