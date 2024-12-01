"use client";
import PageContainer from "@/components/layout/PageContainer";
import { useGetCarriageByIdQuery } from "@/services/carriageApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import CarriageForm from "../../components/CarriageForm";
import { useState } from "react";
import { useGetPagedListCarriageClassQuery } from "@/services/carriageClassApi";
import { useGetPagedListTrainQuery } from "@/services/trainApi";

type PageProps = { params: { carriageId: string } };

export default function Page({ params: { carriageId } }: PageProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataCarriageClass, isFetching } = useGetPagedListCarriageClassQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const { data, isLoading } = useGetCarriageByIdQuery(carriageId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <CarriageForm
            mode="view"
            initialData={data?.data}
            listdataCarriageClass={dataCarriageClass?.data}
            listdataTrain={dataTrain?.data}
            pageTitle={`Detail Carriage#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
