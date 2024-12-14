"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainRouteForm from "../../TrainRouteForm";
import FormCardSkeleton from "../../FormCardSkeleton";
import { useState } from "react";
import { useGetStationByIdQuery } from "@/services/stationApi";
import { useGetPagedListStationQuery } from "@/services/stationApi";
import { useGetTrainRouteByIdQuery, useUpdateTrainRouteMutation } from "@/services/trainRoute";
import { toast } from "sonner";
import { TrainRoute } from "@/interfaces";
type PageProps = { params: { trainRouteId: string } };

export default function Page({ params: { trainRouteId } }: PageProps) {
  const { data, isLoading } = useGetTrainRouteByIdQuery(trainRouteId);
  console.log("daaaaa", data?.data);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataStation, isFetching: isFetchingTrain } = useGetPagedListStationQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const [UpdateTrainRoute] = useUpdateTrainRouteMutation();
  const handleSubmit = async (values: TrainRoute) => {
    try {
      toast.loading("Update TrainRoute...", { id: "Update-TrainRoute" });

      const result = await UpdateTrainRoute(values).unwrap();

      if (result?.success) {
        toast.success("TrainRoute Update successfully!", { id: "Update-TrainRoute" });
      } else {
        toast.error("TrainRoute Update failed. Please try again.", {
          id: "update-TrainRoute"
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.message || "An error occurred while updating the TrainRoute.";
      toast.error(errorMessage, { id: "update-TrainRoute" });
    }
  };
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <TrainRouteForm
            mode="edit"
            initialData={data?.data}
            listdataStation={dataStation?.data || []}
            pageTitle={"Update Train Route"}
            onSubmit={handleSubmit}
            TrainId={parseInt(trainRouteId)}
          />
        )}
      </div>
    </PageContainer>
  );
}
