"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/CarriageClassForm";
import { useGetCarriageClassByIdQuery } from "@/services/carriageClassApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";

type PageProps = { params: { carriageClassId: string } };

export default function Page({ params: { carriageClassId } }: PageProps) {
  const { data, isLoading } = useGetCarriageClassByIdQuery(carriageClassId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <ProvinceForm
            mode="view"
            initialData={data?.data}
            pageTitle={`Detail CarriageClass#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
