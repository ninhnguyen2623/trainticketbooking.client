"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/ProvinceForm";
import { useGetProvinceByIdQuery } from "@/services/provinceApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";

type PageProps = { params: { provinceId: string } };

export default function Page({ params: { provinceId } }: PageProps) {
  const { data, isLoading } = useGetProvinceByIdQuery(provinceId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <ProvinceForm
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
