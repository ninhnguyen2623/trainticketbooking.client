"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../../components/TrainForm";
import { useGetTrainByIdQuery } from "@/services/trainApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
type PageProps = { params: { trainId: string } };

export default function Page({ params: { trainId } }: PageProps) {
  const { data, isLoading } = useGetTrainByIdQuery(trainId);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Edit',
      children: <TrainForm
        mode="view"
        initialData={data?.data}
        pageTitle={`Detail Train#${data?.data?.id}`}
        onSubmit={() => { }}
      />,
    },
    {
      key: '2',
      label: 'Edit',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        {isLoading ? (
          <FormCardSkeleton />
        ) : (

          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        )}
      </div>
    </PageContainer>
  );
}
