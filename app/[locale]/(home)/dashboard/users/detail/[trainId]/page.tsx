"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../../components/TrainForm";
import { useGetTrainByIdQuery } from "@/services/trainApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";

type PageProps = { params: { trainId: string } };

export default function Page({ params: { trainId } }: PageProps) {
  const { data, isLoading } = useGetTrainByIdQuery(trainId);

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (
          <TrainForm
            mode="view"
            initialData={data?.data}
            pageTitle={`Detail Train#${data?.data?.id}`}
            onSubmit={() => {}}
          />
        )}
      </div>
    </PageContainer>
  );
}
