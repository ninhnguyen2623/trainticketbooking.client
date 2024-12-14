"use client";
import PageContainer from "@/components/layout/PageContainer";
import StationForm from "../../components/StationForm";
import { useGetPagedListProvinceQuery, useGetProvinceByIdQuery } from "@/services/provinceApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { useState } from "react";
import { useGetStationByIdQuery } from "@/services/stationApi";

type PageProps = { params: { stationId: string } };

export default function Page({ params: { stationId } }: PageProps) {
  const { data, isLoading } = useGetStationByIdQuery(stationId);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });

  const { data: dataProvince, isFetching: isFetchingTrain } = useGetPagedListProvinceQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <StationForm
            mode="view"
            initialData={data?.data}
            listdataProvince={dataProvince?.data}
            pageTitle={`Detail Station#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
