"use client";

import PageContainer from "@/components/layout/PageContainer";
import PassengerTypeForm from "../../components/PassengerTypeForm";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { PassengerType } from "@/interfaces";
import { useGetPassengerTypeByIdQuery, useUpdatePassengerTypeMutation } from "@/services/passengerTypeApi";

type PageProps = { params: { passengerTypeId: string } };

export default function Page({ params: { passengerTypeId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetPassengerTypeByIdQuery(passengerTypeId);


  // Set up the mutation hook for updating the train
  const [updatePassengerType] = useUpdatePassengerTypeMutation();

  // Handle form submission
  const handleSubmit = async (values: PassengerType) => {
    try {
      toast.loading("Updating PassengerType...", { id: "update-PassengerType" });
      const result = await updatePassengerType(values).unwrap();

      if (result?.success) {
        toast.success("PassengerType updated successfully!", { id: "update-PassengerType" });
        await refetch()
      } else {
        toast.error("PassengerType update failed. Please try again.", {
          id: "update-PassengerType"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the PassengerType.";
      toast.error(errorMessage, { id: "update-PassengerType" });
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
        <PassengerTypeForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit PassengerType"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
