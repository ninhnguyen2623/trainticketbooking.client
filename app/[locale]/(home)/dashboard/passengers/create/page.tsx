"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreatePassengerMutation } from "@/services/passengerApi";
import { toast } from "sonner";
import { Passenger } from "@/interfaces";
import PassengerForm from "../components/PassengerForm";
import { useGetPagedListPassengerTypeQuery } from "@/services/passengerTypeApi";
import { useState } from "react";

export default function Page() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 30
    });
    const { data, isFetching } = useGetPagedListPassengerTypeQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    console.log('data passenger type query', data);
    const [createPassenger, { isLoading }] = useCreatePassengerMutation();

    const handleSubmit = async (values: Passenger) => {

        try {
            toast.loading("Creating Passenger...", { id: "create-Passenger" });

            const result = await createPassenger(values).unwrap();

            if (result.success) {
                toast.success("Passenger created successfully!", { id: "create-Passenger" });
            } else {
                toast.error("Passenger creation failed. Please try again.", {
                    id: "create-Passenger"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the Passenger.";
            toast.error(errorMessage, { id: "create-Passenger" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <PassengerForm
                        mode="create"
                        initialData={null}
                        listdataPassengerType={data?.data}
                        pageTitle={"Create Passenger"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
