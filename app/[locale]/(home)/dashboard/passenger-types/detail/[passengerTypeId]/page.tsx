"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/PassengerTypeForm";
import { useGetProvinceByIdQuery } from "@/services/provinceApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import { useGetPassengerTypeByIdQuery } from "@/services/passengerTypeApi";

type PageProps = { params: { passengerTypeId: string } };

export default function Page({ params: { passengerTypeId } }: PageProps) {
  const { data, isLoading } = useGetPassengerTypeByIdQuery(passengerTypeId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <ProvinceForm
            mode="view"
            initialData={data?.data}
            pageTitle={`Detail Passenger-type#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
