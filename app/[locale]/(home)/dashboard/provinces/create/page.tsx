"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateProvinceMutation } from "@/services/provinceApi";
import { toast } from "sonner";
import { Province } from "@/interfaces";
import ProvinceForm from "../components/ProvinceForm";

export default function Page() {
    const [createProvince, { isLoading }] = useCreateProvinceMutation();

    const handleSubmit = async (values: Province) => {
        try {
            toast.loading("Creating province...", { id: "create-province" });

            const result = await createProvince(values).unwrap();

            if (result.success) {
                toast.success("Province created successfully!", { id: "create-province" });
            } else {
                toast.error("Province creation failed. Please try again.", {
                    id: "create-Province"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the Province.";
            toast.error(errorMessage, { id: "create-Province" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <ProvinceForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create Province"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
