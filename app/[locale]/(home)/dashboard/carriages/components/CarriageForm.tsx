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
import { Carriage, CarriageClass, Seat, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Value } from "@radix-ui/react-select";
import { useEffect } from "react";
import { Table, Button as AntButton } from "antd"; // Import thêm các thành phần từ Ant Design

const formSchema = z.object({
    id: z.number(),
    carriageNumber: z.string().nonempty(" Carrage number is required."),
    carriageClass: z.string().nonempty("Carriage class is required."),
    carriageClassId: z.number(),
    trainId: z.number()
});

type FormMode = "create" | "edit" | "view";

export default function CarriageForm({
    initialData,
    listdataCarriageClass,
    listdataTrain,
    listdataSeat,
    pageTitle,
    mode,
    onSubmit
}: {
    initialData: Carriage | null | undefined;
    listdataCarriageClass: CarriageClass[] | undefined;
    listdataTrain: Train[] | undefined;
    listdataSeat: Seat[] | undefined;
    pageTitle: string;
    mode: FormMode;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";

    const defaultValues = {
        id: initialData?.id || 0,
        carriageClass: initialData?.carriageClass || "",
        carriageClassId: initialData?.carriageClassId || 0,
        carriageNumber: initialData?.carriageNumber || "",
        trainId: initialData?.trainId || 0
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
        const selectedClass = listdataCarriageClass?.find(
            (item) => item.name === form.getValues("carriageClass")
        );
        if (selectedClass) {
            form.setValue("carriageClassId", selectedClass.id);
        }
    }, [form.getValues("carriageClass"), listdataCarriageClass, form]);
    const columns = [
        {
            title: "Seat ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "seatNumber",
            key: "seatNumber",
            dataIndex: "seatNumber",

        },
        {
            title: "Seat Type",
            dataIndex: "seatTypeName",
            key: "seatTypeName",
        },
        {
            title: "Status ",
            dataIndex: "status",
            key: "status",
        },
    ];
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
                                            <FormLabel>Carriage ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Carriage ID"
                                                    readOnly
                                                    className="cursor-not-allowed"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="trainId"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Train</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString() || listdataTrain?.[0]?.id.toString()}
                                                onValueChange={(value) => {
                                                    const selectedTrain = listdataTrain?.find(
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
                                                            {listdataTrain?.map((item) => (
                                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                                    {`${item.id} - ${item.name}`}

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
                            <FormField
                                control={form.control}
                                name="carriageClass"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Carriage Types</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString() || listdataCarriageClass?.[0]?.id.toString()}
                                                onValueChange={(value) => {
                                                    // const selectedClass = listdataCarriageClass?.find(
                                                    //     (item) => item.name === value
                                                    // );
                                                    field.onChange((value));
                                                    // form.setValue("carriageClassId", selectedClass?.id || 0 );
                                                }}

                                            >
                                                <SelectTrigger className="w-full" disabled={isViewMode}>
                                                    <SelectValue placeholder="Select Carriage Class" />
                                                </SelectTrigger>
                                                <SelectContent className="h-80 overflow-auto">
                                                    <ScrollArea>
                                                        <SelectGroup>
                                                            {listdataCarriageClass?.map((item) => (
                                                                <SelectItem key={item.id} value={item.name}>
                                                                    {`${item.id} - ${item.name}`}
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
                                name="carriageNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Carriage Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter  carriage number"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Name en Field */}

                        </div>
                        {isViewMode && (
                            <div className="">
                                <CardHeader>
                                    <CardTitle className="text-left text-2xl font-bold">
                                        Seat In Carriage
                                    </CardTitle>
                                </CardHeader>
                                <Table
                                    dataSource={listdataSeat}
                                    columns={columns}
                                    rowKey="id"
                                />
                            </div>
                        )}
                        <div className="flex space-x-4">
                            <Link href="/dashboard/carriages">
                                <Button variant="secondary">Back</Button>
                            </Link>
                            {!isViewMode && (
                                <Button type="submit">
                                    {isCreateMode ? "Create " : "Update "}
                                </Button>
                            )}

                            {isViewMode && (
                                <Link href={`/dashboard/carriages/edit/${defaultValues.id}`}>
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
