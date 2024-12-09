"use client";

import PageContainer from "@/components/layout/PageContainer";
import PassengerForm from "../../components/PassengerForm";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { Passenger, Passenger } from "@/interfaces";
import { useState } from "react";
import { useGetPagedListPassengerTypeQuery } from "@/services/passengerTypeApi";
import { useGetPassengerByIdQuery, useUpdatePassengerMutation } from "@/services/passengerApi";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';

type PageProps = { params: { passengerId: string } };

export default function Page({ params: { passengerId } }: PageProps) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });

  const { data: datapassengerType, isFetching } = useGetPagedListPassengerTypeQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetPassengerByIdQuery(passengerId);

  // Set up the mutation hook for updating the train
  const [updatePassenger] = useUpdatePassengerMutation();

  // Handle form submission
  const handleSubmit = async (values: Passenger) => {
    try {
      toast.loading("Updating Passenger...", { id: "update-Passenger" });

      const result = await updatePassenger(values).unwrap();
      console.log('api result', result);
      if (result?.success) {
        toast.success("Passenger updated successfully!", { id: "update-Passenger" });
        await refetch();
      } else {
        toast.error("Passenger update failed. Please try again.", {
          id: "update-Passenger"
        });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message ||
        err?.message ||
        "An error occurred while updating the Passenger.";
      toast.error(errorMessage, { id: "update-Passenger" });
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
            Failed to load Passenger data. Please try again later.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {/* Render the TrainForm component with the fetched data */}
        <PassengerForm
          mode="edit"
          initialData={data?.data}
          listdataPassengerType={datapassengerType?.data}
          pageTitle={"Edit Passenger"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
