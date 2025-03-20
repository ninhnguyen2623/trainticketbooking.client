"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/routing";
import { Carriage, CarriageClass } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    id: z.number(),
    name: z.string().nonempty(" name is required."),
});

type FormMode = "create" | "edit" | "view";

export default function CarriageForm({
    initialData,
    pageTitle,
    mode,
    onSubmit
}: {
    initialData: CarriageClass | null | undefined;
    pageTitle: string;
    mode: FormMode;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";

    const defaultValues = {
        id: initialData?.id || 0,
        name: initialData?.name || "",
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        // console.log(values);
        if (!isViewMode) {
            onSubmit(values);
        }
    };

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className="text-left text-2xl font-bold">
                    {pageTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* ID Field */}
                            {(isEditMode || isViewMode) && (
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Carriage types ID"
                                                    readOnly
                                                    className="cursor-not-allowed"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {/* Name en Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter  name"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className="flex space-x-4">
                            <Link href="/dashboard/carriage-types">
                                <Button variant="secondary">Back</Button>
                            </Link>
                            {!isViewMode && (
                                <Button type="submit">
                                    {isCreateMode ? "Create " : "Update "}
                                </Button>
                            )}

                            {isViewMode && (
                                <Link href={`/dashboard/carriage-types/edit/${defaultValues.id}`}>
                                    <Button variant="destructive">Swicth Update</Button>
                                </Link>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
