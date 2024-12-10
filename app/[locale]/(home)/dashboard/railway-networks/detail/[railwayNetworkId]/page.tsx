"use client";
import PageContainer from "@/components/layout/PageContainer";
import ProvinceForm from "../../components/RailwayNetworkForm";
import { useGetRailwayNetworkByIdQuery } from "@/services/railwayNetworkApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";

type PageProps = { params: { railwayNetworkId: string } };

export default function Page({ params: { railwayNetworkId } }: PageProps) {
  const { data, isLoading } = useGetRailwayNetworkByIdQuery(railwayNetworkId);
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <ProvinceForm
            mode="view"
            initialData={data?.data}
            pageTitle={`Detail Railway-Network#${data?.data?.id}`}
            onSubmit={() => { }}
          />
        )}
      </div>
    </PageContainer>
  );
}
