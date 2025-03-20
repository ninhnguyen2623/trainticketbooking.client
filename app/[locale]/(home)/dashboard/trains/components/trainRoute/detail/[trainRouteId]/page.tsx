"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainRouteForm from "../../TrainRouteForm";
import FormCardSkeleton from "../../FormCardSkeleton";
import { useState } from "react";
import { useGetStationByIdQuery } from "@/services/stationApi";
import { useGetPagedListStationQuery } from "@/services/stationApi";
import { useGetTrainRouteByIdQuery } from "@/services/trainRoute";
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
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <TrainRouteForm
            mode="view"
            initialData={data?.data}
            listdataStation={dataStation?.data || []}
            pageTitle={"Create Train Route"}
            onSubmit={() => { }}
            TrainId={parseInt(trainRouteId)}
          />
        )}
      </div>
    </PageContainer>
  );
}
