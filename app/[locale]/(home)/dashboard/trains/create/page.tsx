"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../components/TrainForm";
import { useCreateTrainMutation } from "@/services/trainApi";
import { toast } from "sonner";
import { Train } from "@/interfaces";

export default function Page() {
  const [createTrain, { isLoading }] = useCreateTrainMutation();

  const handleSubmit = async (values: Train) => {
    try {
      toast.loading("Creating train...", { id: "create-train" });

      const result = await createTrain(values).unwrap();

      if (result.success) {
        toast.success("Train created successfully!", { id: "create-train" });
      } else {
        toast.error("Train creation failed. Please try again.", {
          id: "create-train"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while creating the train.";
      toast.error(errorMessage, { id: "create-train" });
    }
  };
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <TrainForm
            mode="create"
            initialData={null}
            pageTitle={"Create Train"}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </PageContainer>
  );
}
