"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { toast } from "sonner";
import { Booking } from "@/interfaces";
import BookingForm from "../components/BookingForm"
import { useGetPagedListTrainQuery } from "@/services/trainApi";
import { useState } from "react";
import { useCreateBookingMutation } from "@/services/bookingApi";
import { useGetPagedListStationQuery } from "@/services/stationApi";
import { useGetPagedListPassengerQuery } from "@/services/passengerApi";

export default function Page() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 1000
    });
    const { data: dataStation, isFetching: isFetchingStation } = useGetPagedListStationQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const { data: dataPassenger, isFetching: isFetchingPassenger } = useGetPagedListPassengerQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const { data: dataTrain, isFetching: isFetchingTrain } = useGetPagedListTrainQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });
    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const handleSubmit = async (values: Booking) => {

        try {
            toast.loading("Creating Booking...", { id: "create-Booking" });

            const result = await createBooking(values).unwrap();

            if (result.success) {
                toast.success("Booking created successfully!", { id: "create-Booking" });
            } else {
                toast.error("Booking creation failed. Please try again.", {
                    id: "create-Booking"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the Booking.";
            toast.error(errorMessage, { id: "create-Booking" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <BookingForm
                        mode="create"
                        initialData={null}
                        listdataStation={dataStation?.data}
                        listdataPassenger={dataPassenger?.data}
                        listdataTrain={dataTrain?.data}
                        pageTitle={"Create Booking"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
