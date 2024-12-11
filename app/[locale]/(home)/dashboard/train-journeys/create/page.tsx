"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateTrainJourneyMutation } from "@/services/trainJourneyApi";
import { toast } from "sonner";
import { TrainJourney } from "@/interfaces";
import TrainJourneyForm from "../components/TrainJourneyForm";
import { useState } from "react";
import { useGetPagedListTrainQuery } from "@/services/trainApi";

export default function Page() {
    const [createTrainJourney, { isLoading }] = useCreateTrainJourneyMutation();

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 30
    });
    const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const handleSubmit = async (values: TrainJourney) => {
        try {
            toast.loading("Creating TrainJourney...", { id: "create-TrainJourney" });

            const result = await createTrainJourney(values).unwrap();

            if (result.success) {
                toast.success("TrainJourney created successfully!", { id: "create-TrainJourney" });
            } else {
                toast.error("TrainJourney creation failed. Please try again.", {
                    id: "create-TrainJourney"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the TrainJourney.";
            toast.error(errorMessage, { id: "create-TrainJourney" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <TrainJourneyForm
                        mode="create"
                        initialData={null}
                        listdataTrain={dataTrain?.data}
                        pageTitle={"Create TrainJourney"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
