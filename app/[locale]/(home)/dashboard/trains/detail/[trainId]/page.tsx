"use client";
import PageContainer from "@/components/layout/PageContainer";
import TrainForm from "../../components/TrainForm";
import { useGetTrainByIdQuery } from "@/services/trainApi";
import FormCardSkeleton from "../../components/FormCardSkeleton";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { DataTableTrainCarriage } from '@/app/[locale]/(home)/dashboard/trains/components/trainCarriage/DataTableTrainCarriage'
import { DataTableTrainRoute } from '@/app/[locale]/(home)/dashboard/trains/components/trainRoute/DataTableTrainRoute'
import { trainRouteColumns } from "../../components/trainRoute/trainRouteColumns";
import { useGetPagedListCarriageQuery } from "@/services/carriageApi";
import { useEffect, useState } from "react";
import { Carriage } from "@/interfaces";
import { max } from "date-fns";
import { useGetRoutesByTrainIdQuery } from "@/services/trainRoute";
import { trainCarriageColumns } from "../../components/trainCarriage/trainCarriageColumns";
import { DataTableSkeleton } from "@/components/ui/table/DataTableSkeleton";
type PageProps = { params: { trainId: string } };

export default function Page({ params: { trainId } }: PageProps) {
  const { data, isLoading } = useGetTrainByIdQuery(trainId);
  const { data: dataRoute, error, refetch: refetchRoutes, isFetching: routeFetching } = useGetRoutesByTrainIdQuery(parseInt(trainId));
  useEffect(() => {
    refetchRoutes();
  }, [refetchRoutes]);

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
      children:
        <div>
          {isFetching ? (
            <DataTableSkeleton columnCount={4} rowCount={10} />
          ) : (
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              {data ? (
                <DataTableTrainRoute
                  data={dataRoute?.data || []}
                  columns={trainRouteColumns}
                  totalItems={datalistTrainCarriage?.totalItems || 0}
                  pagination={pagination}
                  onPaginationChange={setPagination}
                />
              ) : (
                <div>No Train Route found.</div>
              )}
            </div>
          )}
        </div>

      ,
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
