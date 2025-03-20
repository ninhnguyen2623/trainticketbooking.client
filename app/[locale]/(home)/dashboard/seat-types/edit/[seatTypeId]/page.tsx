"use client";

import PageContainer from "@/components/layout/PageContainer";
import SeatTypeForm from "../../components/SeatTypeForm";
import {
  useGetSeatTypeByIdQuery,
  useUpdateSeatTypeMutation
} from "@/services/seatTypeApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { SeatType } from "@/interfaces";
import { toast } from "sonner";

type PageProps = { params: { seatTypeId: string } };

export default function Page({ params: { seatTypeId } }: PageProps) {
  // Fetch seatType data by ID
  const { data, isLoading, isError, refetch } = useGetSeatTypeByIdQuery(seatTypeId);

  // Set up the mutation hook for updating the seatType
  const [updateSeatType] = useUpdateSeatTypeMutation();

  // Handle form submission
  const handleSubmit = async (values: SeatType) => {
    // console.log('data seat type:', values);
    try {
      toast.loading("Updating seatType...", { id: "update-seatType" });

      const result = await updateSeatType(values).unwrap();

      if (result?.success) {
        toast.success("seatType updated successfully!", { id: "update-seatType" });
        await refetch()
      } else {
        toast.error("seatType update failed. Please try again.", {
          id: "update-seatType"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the seatType.";
      toast.error(errorMessage, { id: "update-seatType" });
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
            Failed to load seatType data. Please try again later.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {/* Render the seatTypeForm component with the fetched data */}
        <SeatTypeForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit seatType"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
