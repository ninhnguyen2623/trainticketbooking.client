"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateStationMutation } from "@/services/stationApi";
import { toast } from "sonner";
import { Station } from "@/interfaces";
import StationForm from "../components/StationForm";
import { useGetPagedListProvinceQuery } from "@/services/provinceApi";
import { useState } from "react";

export default function Page() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 30
    });

    const { data: dataProvince, isFetching: isFetchingTrain } = useGetPagedListProvinceQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const [createStation, { isLoading }] = useCreateStationMutation();

    const handleSubmit = async (values: Station) => {
        try {
            toast.loading("Creating Station...", { id: "create-Station" });

            const result = await createStation(values).unwrap();

            if (result.success) {
                toast.success("Station created successfully!", { id: "create-Station" });
            } else {
                toast.error("Station creation failed. Please try again.", {
                    id: "create-Station"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the Station.";
            toast.error(errorMessage, { id: "create-Station" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <StationForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create Station"}
                        onSubmit={handleSubmit}
                        listdataProvince={dataProvince?.data}
                    />
                )}
            </div>
        </PageContainer>
    );
}
