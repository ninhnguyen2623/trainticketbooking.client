"use client";

import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../../components/TrainForm";
import {
  useGetTrainByIdQuery,
  useUpdateTrainMutation
} from "@/services/trainApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { Train } from "@/interfaces";
import { toast } from "sonner";

type PageProps = { params: { trainId: string } };

export default function Page({ params: { trainId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError } = useGetTrainByIdQuery(trainId);

  // Set up the mutation hook for updating the train
  const [updateTrain] = useUpdateTrainMutation();

  // Handle form submission
  const handleSubmit = async (values: Train) => {
    try {
      toast.loading("Updating train...", { id: "update-train" });

      const result = await updateTrain(values).unwrap();

      if (result?.success) {
        toast.success("Train updated successfully!", { id: "update-train" });
      } else {
        toast.error("Train update failed. Please try again.", {
          id: "update-train"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the train.";
      toast.error(errorMessage, { id: "update-train" });
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
        <TrainForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit Train"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
