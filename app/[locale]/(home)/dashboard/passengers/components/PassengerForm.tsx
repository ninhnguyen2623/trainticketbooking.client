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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/routing";
import { Passenger, PassengerType, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Value } from "@radix-ui/react-select";
import { useEffect } from "react";

const formSchema = z.object({
    id: z.number(),
    fullName: z.string().nonempty(" Passenger number is required."),
    passengerTypeId: z.number(),
    identityCardNumber: z.string().nonempty("Passenger class is required."),
    passengerTypeName: z.string().nonempty("Passenger class is required."),
    discountPercentage: z.number({
        required_error: "Discount percentage is required.",
        invalid_type_error: "Discount percentage must be a number.",
    })
        .min(0, "Discount percentage cannot be less than 0.") // Giá trị tối thiểu là 0
        .max(100, "Discount percentage cannot exceed 100."), // Giá trị tối đa là 100
});

type FormMode = "create" | "edit" | "view";

export default function PassengerForm({
    initialData,
    listdataPassengerType,
    pageTitle,
    mode,
    onSubmit
}: {
    initialData: Passenger | null | undefined;
    listdataPassengerType: PassengerType[] | undefined;
    pageTitle: string;
    mode: FormMode;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";

    const defaultValues = {
        id: initialData?.id || 0,
        fullName: initialData?.fullName || "",
        passengerTypeId: initialData?.passengerTypeId || 0,
        identityCardNumber: initialData?.identityCardNumber || "",
        passengerTypeName: initialData?.passengerTypeName || "",
        discountPercentage: initialData?.discountPercentage || 0
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        if (!isViewMode) {
            // console.log(values);
            onSubmit(values);
        }
    };
    useEffect(() => {
        const selectedClass = listdataPassengerType?.find(
            (item) => item.id === form.getValues("passengerTypeId")
        );
        if (selectedClass) {
            form.setValue("passengerTypeName", selectedClass.type);
            form.setValue("discountPercentage", 0);
        }
    }, [form.getValues("passengerTypeId"), listdataPassengerType, form]);

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
                                            <FormLabel>Passenger ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Passenger ID"
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
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Passenger Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter  Passenger full name"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="passengerTypeId"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Train</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString() || listdataPassengerType?.[0]?.id.toString()}
                                                onValueChange={(value) => {
                                                    const selectedTrain = listdataPassengerType?.find(
                                                        (item) => item.id.toString() === value
                                                    );
                                                    field.onChange(parseInt(value)); // Gán id cho field trainId
                                                }}
                                            >
                                                <SelectTrigger className="w-full" disabled={isViewMode}>
                                                    <SelectValue placeholder="Select Train" />
                                                </SelectTrigger>
                                                <SelectContent className="h-80 overflow-auto">
                                                    <ScrollArea>
                                                        <SelectGroup>
                                                            {listdataPassengerType?.map((item) => (
                                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                                    {`${item.id} - ${item.type}`}

                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </ScrollArea>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Name en Field */}
                            <FormField
                                control={form.control}
                                name="identityCardNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Passenger Identity Card Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter  Passenger identity card number"
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
                            <Link href="/dashboard/passengers">
                                <Button variant="secondary">Back</Button>
                            </Link>
                            {!isViewMode && (
                                <Button type="submit">
                                    {isCreateMode ? "Create " : "Update "}
                                </Button>
                            )}

                            {isViewMode && (
                                <Link href={`/dashboard/passengers/edit/${defaultValues.id}`}>
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
