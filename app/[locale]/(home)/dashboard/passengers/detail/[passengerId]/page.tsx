"use client";
import PageContainer from "@/components/layout/PageContainer";
import { useGetCarriageByIdQuery } from "@/services/carriageApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import CarriageForm from "../../components/PassengerForm";
import { useState } from "react";
import { useGetPagedListPassengerTypeQuery } from "@/services/passengerTypeApi";
import { useGetPassengerByIdQuery } from "@/services/passengerApi";


type PageProps = { params: { passengerId: string } };

export default function Page({ params: { passengerId } }: PageProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: datapassengerType, isFetching } = useGetPagedListPassengerTypeQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const { data, isLoading } = useGetPassengerByIdQuery(passengerId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <CarriageForm
            mode="view"
            initialData={data?.data}
            listdataPassengerType={datapassengerType?.data}
            pageTitle={`Detail Passenger#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
