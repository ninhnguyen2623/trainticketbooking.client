"use client";
import FormCardSkeleton from "@/components/FormCardSkeleton";
import PageContainer from "@/components/layout/PageContainer";
import { useCreateRailwayNetworkMutation } from "@/services/railwayNetworkApi";
import { toast } from "sonner";
import { RailwayNetwork } from "@/interfaces";
import RailwayNetworkForm from "../components/RailwayNetworkForm";

export default function Page() {
    const [createRailwayNetwork, { isLoading }] = useCreateRailwayNetworkMutation();

    const handleSubmit = async (values: RailwayNetwork) => {
        try {
            toast.loading("Creating RailwayNetwork...", { id: "create-RailwayNetwork" });

            const result = await createRailwayNetwork(values).unwrap();

            if (result.success) {
                toast.success("RailwayNetwork created successfully!", { id: "create-RailwayNetwork" });
            } else {
                toast.error("RailwayNetwork creation failed. Please try again.", {
                    id: "create-RailwayNetwork"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the RailwayNetwork.";
            toast.error(errorMessage, { id: "create-RailwayNetwork" });
        }
    };
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                {isLoading ? (
                    <FormCardSkeleton />
                ) : (
                    <RailwayNetworkForm
                        mode="create"
                        initialData={null}
                        pageTitle={"Create RailwayNetwork"}
                        onSubmit={handleSubmit}
                    />
                )}
            </div>
        </PageContainer>
    );
}
