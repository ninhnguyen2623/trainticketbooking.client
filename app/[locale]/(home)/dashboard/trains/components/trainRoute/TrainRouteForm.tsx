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
} from "@/components/ui/Select";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Input } from "@/components/ui/Input";
import { Link } from "@/i18n/routing";
import { Carriage, CarriageClass, Station, Train, TrainRoute } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
import { useGetRoutesByTrainIdQuery } from "@/services/trainRoute";
import { useGetTrainByIdQuery } from "@/services/trainApi";

const formSchema = z.object({
    id: z.number(),
    distance: z.number().min(0, "Distance must be a non-negative number."),
    arrivalTime: z.string().nonempty("Arrival time is required."),
    departureTime: z.string().nonempty("Departure time is required."),
    stationNumber: z.number().min(0, "Station number must be a non-negative number."),
    status: z.string().nonempty("Status is required."),
    dateNumber: z.number().min(0, "Date number must be a non-negative number."),
    trainId: z.number().min(0, "Train ID must be a non-negative number."),
    startStationId: z.number().min(0, "Start station ID must be a non-negative number."),
    endStationId: z.number().min(0, "End station ID must be a non-negative number."),
    startStationName: z.string().nonempty("startStationName is required."),
    endStationName: z.string().nonempty("endStationName is required."),
    trainName: z.string().nonempty("trainName is required."),
    trainType: z.string().nonempty("trainType is required."),
});

type FormMode = "create" | "edit" | "view";

export default function TrainRouteForm({
    initialData,
    listdataStation,
    pageTitle,
    mode,
    TrainId,
    onSubmit
}: {
    initialData: TrainRoute | null | undefined;
    listdataStation: Station[] | undefined;
    pageTitle: string;
    mode: FormMode;
    TrainId: number | 0;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";

    const defaultValues = {
        id: initialData?.id || 0,
        distance: initialData?.distance || 0,
        arrivalTime: initialData?.arrivalTime || "",
        departureTime: initialData?.departureTime || "",
        stationNumber: initialData?.stationNumber || 0,
        status: initialData?.status || "",
        dateNumber: initialData?.dateNumber || 0,
        trainId: initialData?.trainId || 0,
        startStationId: initialData?.startStationId || 0,
        endStationId: initialData?.endStationId || 0,
        startStationName: initialData?.startStationName || "",
        endStationName: initialData?.endStationName || "",
        trainName: initialData?.trainName || "",
        trainType: initialData?.trainType || ""
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });


    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        if (!isViewMode) {
            onSubmit(values);
        }
    };

    const { data: dataTrain } = useGetTrainByIdQuery(TrainId.toString());
    const datalis: Train | undefined = dataTrain?.data;
    if (datalis) {
        form.setValue("trainId", datalis.id);
        form.setValue("trainName", datalis.name || "");
        form.setValue("trainType", datalis.trainType || "");
    }
    const selectedClassStart = listdataStation?.find(
        (item) => item.id === form.getValues("startStationId")
    );
    const selectedClassEnd = listdataStation?.find(
        (item) => item.id === form.getValues("endStationId")
    );
    if (selectedClassStart && selectedClassEnd) {
        form.setValue("startStationName", selectedClassStart.name);
        form.setValue("endStationName", selectedClassEnd.name);
    }
    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className="text-left text-2xl font-bold">
                    {pageTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* ID Field */}
                            {(isEditMode || isViewMode) && (
                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Route ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Route ID"
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
                                name="distance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Distance</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number" // Đặt type là number
                                                placeholder="Enter distance"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    // Chuyển đổi giá trị đầu vào thành kiểu số
                                                    const value = e.target.value ? parseFloat(e.target.value) : 0;
                                                    field.onChange(value); // Cập nhật giá trị vào form
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="arrivalTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>arrival</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="time"
                                                value={field.value ? field.value.slice(0, 5) : ""} // Chỉ lấy HH:mm từ HH:mm:ss
                                                placeholder="Enter departure time"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    const time = e.target.value;
                                                    const formattedTime = `${time}:00`; // Thêm giây "00" vào thời gian
                                                    field.onChange(formattedTime); // Cập nhật giá trị với đầy đủ HH:mm:ss
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="departureTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>departure</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="time"
                                                value={field.value ? field.value.slice(0, 5) : ""} // Chỉ lấy HH:mm từ HH:mm:ss
                                                placeholder="Enter departure time"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    const time = e.target.value;
                                                    const formattedTime = `${time}:00`; // Thêm giây "00" vào thời gian
                                                    field.onChange(formattedTime); // Cập nhật giá trị với đầy đủ HH:mm:ss
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stationNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>stationNumber</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number" // Đặt type là number
                                                placeholder="Enter distance"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    // Chuyển đổi giá trị đầu vào thành kiểu số
                                                    const value = e.target.value ? parseFloat(e.target.value) : 0;
                                                    field.onChange(value); // Cập nhật giá trị vào form
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>status</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString()}
                                                onValueChange={(value) => {
                                                    field.onChange((value)); // Gán id cho field trainId
                                                }}
                                                disabled={isViewMode}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Train" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <ScrollArea>
                                                        <SelectGroup>
                                                            <SelectItem value="Active">
                                                                Actived
                                                            </SelectItem>
                                                            <SelectItem value="Failed">
                                                                Failted
                                                            </SelectItem>
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
                                name="dateNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>dateNumber</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number" // Đặt type là number
                                                placeholder="Enter distance"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    // Chuyển đổi giá trị đầu vào thành kiểu số
                                                    const value = e.target.value ? parseFloat(e.target.value) : 0;
                                                    field.onChange(value); // Cập nhật giá trị vào form
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startStationId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>startStationId</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString() || listdataStation?.[0]?.id.toString()}
                                                onValueChange={(value) => {

                                                    field.onChange(parseInt(value)); // Gán id cho field trainId
                                                }}
                                                disabled={isViewMode}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Train" />
                                                </SelectTrigger>
                                                <SelectContent className="h-80 overflow-auto">
                                                    <ScrollArea>
                                                        <SelectGroup>
                                                            {listdataStation?.map((item) => (
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
                                name="endStationId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>endStationId</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString() || listdataStation?.[0]?.id.toString()}
                                                onValueChange={(value) => {
                                                    field.onChange(parseInt(value)); // Gán id cho field trainId
                                                }}
                                                disabled={isViewMode}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Train" />
                                                </SelectTrigger>
                                                <SelectContent className="h-80 overflow-auto">
                                                    <ScrollArea>
                                                        <SelectGroup>
                                                            {listdataStation?.map((item) => (
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
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/dashboard/trains">
                                <Button variant="secondary">Back</Button>
                            </Link>
                            {!isViewMode && (
                                <Button type="submit">
                                    {isCreateMode ? "Create" : "Update"}
                                </Button>
                            )}

                            {isViewMode && (
                                <Link href={`/dashboard/trains/components/trainRoute/edit/${defaultValues.id}`}>
                                    <Button variant="destructive">Switch to Update</Button>
                                </Link>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
