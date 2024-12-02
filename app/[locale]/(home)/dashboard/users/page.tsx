"use client";

import PageContainer from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { DataTableSkeleton } from "@/components/ui/table/DataTableSkeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { SearchParams } from "nuqs/parsers";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { Link } from "@/i18n/routing";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type pageProps = {
  searchParams: SearchParams;
};

export default function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20
  });

  const { data, isFetching } = useGetPagedListTrainQuery({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize
  });
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Trains" description="Manage Trains" />
          <Link
            href="/dashboard/trains/create"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        {isFetching ? (
          <DataTableSkeleton columnCount={5} rowCount={10} />
        ) : (
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            {data ? (
              <DataTable
                data={data?.data || []}
                columns={columns}
                totalItems={data?.totalItems}
                pagination={pagination}
                onPaginationChange={setPagination}
              />
            ) : (
              <div>No users found.</div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
