"use client";

import PageContainer from "@/components/layout/PageContainer";
import CarriageClassForm from "../../components/CarriageClassForm";
import { useGetCarriageClassByIdQuery, useUpdateCarriageClassMutation } from "@/services/carriageClassApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { CarriageClass } from "@/interfaces";

type PageProps = { params: { carriageClassId: string } };

export default function Page({ params: { carriageClassId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetCarriageClassByIdQuery(carriageClassId);

  // Set up the mutation hook for updating the train
  const [updateCarriageClass] = useUpdateCarriageClassMutation();

  // Handle form submission
  const handleSubmit = async (values: CarriageClass) => {
    try {
      toast.loading("Updating CarriageClass...", { id: "update-CarriageClass" });
      console.log(values);
      const result = await updateCarriageClass(values).unwrap();

      if (result?.success) {
        toast.success("CarriageClass updated successfully!", { id: "update-CarriageClass" });
        await refetch()
      } else {
        toast.error("CarriageClass update failed. Please try again.", {
          id: "update-CarriageClass"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the Carriage types.";
      toast.error(errorMessage, { id: "update-CarriageClass" });
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
        <CarriageClassForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit CarriageClass"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
