"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateSeatTypeMutation } from "@/services/seatTypeApi";
import { toast } from "sonner";
import { SeatType } from "@/interfaces";
import SeatTypeForm from "../components/SeatTypeForm";

export default function Page() {
    const [createSeatType, { isLoading }] = useCreateSeatTypeMutation();

    const handleSubmit = async (values: SeatType) => {
        try {
            toast.loading("Creating SeatType...", { id: "create-SeatType" });

            const result = await createSeatType(values).unwrap();

            if (result.success) {
                toast.success("SeatType created successfully!", { id: "create-SeatType" });
            } else {
                toast.error("SeatType creation failed. Please try again.", {
                    id: "create-SeatType"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the SeatType.";
            toast.error(errorMessage, { id: "create-SeatType" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <SeatTypeForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create SeatType"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
