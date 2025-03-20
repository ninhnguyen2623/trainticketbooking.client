"use client";
import PageContainer from "@/components/layout/PageContainer";
import { useGetCarriageByIdQuery } from "@/services/carriageApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import BookingForm from "../../components/BookingForm";
import { useState } from "react";
import { useGetPagedListCarriageClassQuery } from "@/services/carriageClassApi";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useGetBookingByIdQuery } from "@/services/bookingApi";
import { useGetPagedListStationQuery } from "@/services/stationApi";
import { DataTable } from "../../components/ticket/DataTable";
import { columns } from "../../components/ticket/columns";
import { CardHeader, CardTitle } from "@/components/ui/Card";

type PageProps = { params: { booingId: string } };

export default function Page({ params: { booingId } }: PageProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1000
  });
  const { data: dataStation, isFetching: isFetchingTrain } = useGetPagedListStationQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const { data, isLoading } = useGetBookingByIdQuery(booingId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <BookingForm
            mode="view"
            initialData={data?.data}
            listdataStation={dataStation?.data}
            pageTitle={`Detail Booking#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
      <div className="">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold">
            Titket
          </CardTitle>
        </CardHeader>
        <DataTable
          data={data?.data?.tickets || []}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>
    </PageContainer>
  );
}
