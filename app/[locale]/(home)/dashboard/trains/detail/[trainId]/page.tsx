"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../../components/TrainForm";
import { useGetTrainByIdQuery } from "@/services/trainApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { DataTableTrainCarriage } from '@/app/[locale]/(home)/dashboard/trains/components/trainCarriage/DataTableTrainCarriage'
import { trainCarriageColumns } from "../../components/trainCarriage/trainCarriageColumns";
import { useGetPagedListCarriageQuery } from "@/services/carriageApi";
import { useState } from "react";
import { Carriage } from "@/interfaces";
import { max } from "date-fns";
import { Tabs } from 'antd';
type PageProps = { params: { trainId: string } };

export default function Page({ params: { trainId } }: PageProps) {
  const { data, isLoading } = useGetTrainByIdQuery(trainId);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1000
  });
  const { data: datalistTrainCarriage, isFetching } = useGetPagedListCarriageQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  // get data carriage by train id
  const getCarriagesByTrainId = (datalist: Carriage[] | undefined, trainId: number): Carriage[] => {
    if (!datalist) return [];
    return datalist.filter((item) => item.trainId === trainId);
  };
  const listCarriageByTrainId = getCarriagesByTrainId(datalistTrainCarriage?.data || [], parseInt(trainId));

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Detail',
      children: <TrainForm
        mode="view"
        initialData={data?.data}
        pageTitle={`Detail Train#${data?.data?.id}`}
        onSubmit={() => { }}
      />,
    },
    {
      key: '2',
      label: 'Carriage Train',
      children: <DataTableTrainCarriage
        data={listCarriageByTrainId}
        columns={trainCarriageColumns}
        totalItems={datalistTrainCarriage?.totalItems || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
      />,
    },
    {
      key: '3',
      label: 'Route',
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
