"use client";

import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/ProvinceForm";
import { useGetProvinceByIdQuery, useUpdateProvinceMutation } from "@/services/provinceApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { Province } from "@/interfaces";

type PageProps = { params: { provinceId: string } };

export default function Page({ params: { provinceId } }: PageProps) {
  // Fetch train data by ID
  const { data, isLoading, isError, refetch } = useGetProvinceByIdQuery(provinceId);

  // Set up the mutation hook for updating the train
  const [updateProvince] = useUpdateProvinceMutation();

  // Handle form submission
  const handleSubmit = async (values: Province) => {
    try {
      toast.loading("Updating province...", { id: "update-province" });
      const result = await updateProvince(values).unwrap();

      if (result?.success) {
        toast.success("Province updated successfully!", { id: "update-province" });
        await refetch()
      } else {
        toast.error("Province update failed. Please try again.", {
          id: "update-province"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the province.";
      toast.error(errorMessage, { id: "update-province" });
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
        <ProvinceForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit Province"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
