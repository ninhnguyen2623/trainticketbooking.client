"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateCarriageMutation } from "@/services/carriageApi";
import { toast } from "sonner";
import { Carriage } from "@/interfaces";
import CarriageForm from "../components/CarriageForm";
import { useGetPagedListCarriageClassQuery } from "@/services/carriageClassApi";
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useState } from "react";

export default function Page() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 30
    });
    const { data, isFetching } = useGetPagedListCarriageClassQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const [createCarriage, { isLoading }] = useCreateCarriageMutation();

    const handleSubmit = async (values: Carriage) => {

        try {
            toast.loading("Creating carriage...", { id: "create-carriage" });

            const result = await createCarriage(values).unwrap();

            if (result.success) {
                toast.success("Carriage created successfully!", { id: "create-carriage" });
            } else {
                toast.error("Carriage creation failed. Please try again.", {
                    id: "create-carriage"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the carriage.";
            toast.error(errorMessage, { id: "create-carriage" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <CarriageForm
                        mode="create"
                        initialData={null}
                        listdataCarriageClass={data?.data}
                        listdataTrain={dataTrain?.data}
                        pageTitle={"Create Carriage"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
