"use client";

import PageContainer from "@/components/layout/PageContainer";
import TrainRouteForm from "../../TrainRouteForm";
import FormCardSkeleton from "../../FormCardSkeleton";
import { toast } from "sonner";
import { TrainRoute } from "@/interfaces";
import { useState } from "react";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useGetPagedListStationQuery } from "@/services/stationApi";
import { useCreateTrainRouteMutation } from "@/services/trainRoute";

type PageProps = { params: { trainRouteId: string } };

export default function Page({ params: { trainRouteId } }: PageProps) {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataStation, isFetching: isFetchingTrain } = useGetPagedListStationQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  // Set up the mutation hook for updating the train
  const [CreateTrainRoute] = useCreateTrainRouteMutation();

  // Handle form submission
  const handleSubmit = async (values: TrainRoute) => {
    // console.log('dataddd:', values);
    try {
      toast.loading("Create TrainRoute...", { id: "create-TrainRoute" });

      const result = await CreateTrainRoute(values).unwrap();

      if (result?.success) {
        toast.success("TrainRoute create successfully!", { id: "create-TrainRoute" });
      } else {
        toast.error("TrainRoute create failed. Please try again.", {
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
        {/* Render the TrainForm component with the fetched data */}
        <TrainRouteForm
          mode="create"
          initialData={null}
          listdataStation={dataStation?.data || []}
          pageTitle={"Create Train Route"}
          onSubmit={handleSubmit}
          TrainId={parseInt(trainRouteId)}
        />

      </div>
    </PageContainer>
  );
}
