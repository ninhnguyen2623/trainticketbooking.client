"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateCarriageClassMutation } from "@/services/carriageClassApi";
import { toast } from "sonner";
import { Carriage, CarriageClass } from "@/interfaces";
import CarriageClassForm from "../components/CarriageClassForm";

export default function Page() {
    const [createCarriageClass, { isLoading }] = useCreateCarriageClassMutation();

    const handleSubmit = async (values: CarriageClass) => {
        try {
            toast.loading("Creating carriage...", { id: "create-carriage" });

            const result = await createCarriageClass(values).unwrap();

            if (result.success) {
                toast.success("Carriage type created successfully!", { id: "create-carriageClass" });
            } else {
                toast.error("Carriage type creation failed. Please try again.", {
                    id: "create-carriageClass"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the carriage type.";
            toast.error(errorMessage, { id: "create-carriageClass" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <CarriageClassForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create Carriage Types"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
