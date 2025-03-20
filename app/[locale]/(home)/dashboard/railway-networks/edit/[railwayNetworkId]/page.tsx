"use client";

import PageContainer from "@/components/layout/PageContainer";
import RailwayNetworkForm from "../../components/RailwayNetworkForm";
import { useGetRailwayNetworkByIdQuery, useUpdateRailwayNetworkMutation } from "@/services/railwayNetworkApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { toast } from "sonner";
import { RailwayNetwork } from "@/interfaces";

type PageProps = { params: { railwayNetworkId: string } };

export default function Page({ params: { railwayNetworkId } }: PageProps) {
  // Fetch Railway Network data by ID
  const { data, isLoading, isError, refetch } = useGetRailwayNetworkByIdQuery(railwayNetworkId);

  // Set up the mutation hook for updating the Railway Network
  const [updateRailwayNetwork] = useUpdateRailwayNetworkMutation();

  // Handle form submission
  const handleSubmit = async (values: RailwayNetwork) => {
    try {
      toast.loading("Updating RailwayNetwork...", { id: "update-RailwayNetwork" });
      const result = await updateRailwayNetwork(values).unwrap();

      if (result?.success) {
        toast.success("RailwayNetwork updated successfully!", { id: "update-RailwayNetwork" });
        await refetch()
      } else {
        toast.error("RailwayNetwork update failed. Please try again.", {
          id: "update-RailwayNetwork"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the RailwayNetwork.";
      toast.error(errorMessage, { id: "update-RailwayNetwork" });
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
            Failed to load Railway Network data. Please try again later.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {/* Render the Railway NetworkForm component with the fetched data */}
        <RailwayNetworkForm
          mode="edit"
          initialData={data?.data}
          pageTitle={"Edit RailwayNetwork"}
          onSubmit={handleSubmit}
        />
      </div>
    </PageContainer>
  );
}
