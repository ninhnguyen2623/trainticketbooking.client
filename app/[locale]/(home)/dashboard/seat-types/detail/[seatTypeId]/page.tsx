"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/SeatTypeForm";
import { useGetSeatTypeByIdQuery } from "@/services/seatTypeApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import SeatTypeForm from "../../components/SeatTypeForm";

type PageProps = { params: { seatTypeId: string } };

export default function Page({ params: { seatTypeId } }: PageProps) {
  const { data, isLoading } = useGetSeatTypeByIdQuery(seatTypeId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <SeatTypeForm
            mode="view"
            initialData={data?.data}
            pageTitle={`Detail Province#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
