"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/TrainJourneyForm";
import { useGetTrainJourneyByIdQuery } from "@/services/trainJourneyApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import TrainForm from "../../../trains/components/TrainForm";
import TrainJourneyForm from "../../components/TrainJourneyForm";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useMemo, useState } from "react";
import { TrainJourney } from "@/interfaces";

type PageProps = { params: { trainJourneysId: string } };

export default function Page({ params: { trainJourneysId } }: PageProps) {
  const { data, isLoading } = useGetTrainJourneyByIdQuery(trainJourneysId);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30
  });
  const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  const formattedData: TrainJourney | null = useMemo(() => {
    if (!data?.data) return null;

    return {
      id: data.data.id || 0,
      trainId: data.data.trainId || 0,
      trainName: data.data.trainName || "",
      departureDate: data.data.departureDate
        ? new Date(data.data.departureDate).toISOString()
        : "",
      arrivalDate: data.data.arrivalDate
        ? new Date(data.data.arrivalDate).toISOString()
        : "",
      status: data.data.status || "",
    };
  }, [data]);
  // console.log('format data:', formattedData);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <TrainJourneyForm
            mode="view"
            initialData={formattedData}
            listdataTrain={dataTrain?.data}
            pageTitle={`Detail TrainJourney#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
