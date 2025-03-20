"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreatePassengerTypeMutation } from "@/services/passengerTypeApi";
import { toast } from "sonner";
import { PassengerType } from "@/interfaces";
import PassengerTypeForm from "../components/PassengerTypeForm";

export default function Page() {
    const [createPassengerType, { isLoading }] = useCreatePassengerTypeMutation();

    const handleSubmit = async (values: PassengerType) => {
        try {
            toast.loading("Creating PassengerType...", { id: "create-PassengerType" });

            const result = await createPassengerType(values).unwrap();

            if (result.success) {
                toast.success("PassengerType created successfully!", { id: "create-PassengerType" });
            } else {
                toast.error("PassengerType creation failed. Please try again.", {
                    id: "create-PassengerType"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the PassengerType.";
            toast.error(errorMessage, { id: "create-PassengerType" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <PassengerTypeForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create PassengerType"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
