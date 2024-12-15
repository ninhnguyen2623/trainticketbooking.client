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
import { Booking, Carriage, CarriageClass, Station, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Value } from "@radix-ui/react-select";
import { useEffect } from "react";
const passengerSchema = z.object({
    passengerId: z.number(),
    fullName: z.string().nonempty("Full name is required."),
    identityCardNumber: z.string().nonempty("Identity card number is required."),
    passengerType: z.string().nonempty("Passenger type is required."),
});
const ticketSchema = z.object({
    ticketId: z.number(),
    price: z.number(),
    bookingDate: z.string().nonempty("Booking date is required."), // ISO 8601 date
    departureDate: z.string().nonempty("Departure date is required."), // ISO 8601 date
    status: z.string().nonempty("Status is required."),
    seatId: z.number(),
    seatNumber: z.string().nonempty("Seat number is required."),
    seatType: z.string().nonempty("Seat type is required."),
    carriageName: z.string().nonempty("Carriage name is required."),
    trainName: z.string().nonempty("Train name is required."),
    startStationName: z.string().nonempty("Start station name is required."),
    endStationName: z.string().nonempty("End station name is required."),
    isDeparture: z.boolean(),
    passenger: passengerSchema,
});
const formSchema = z.object({
    id: z.number(),
    bookingTime: z.string().nonempty("Booking time is required."), // ISO 8601 date
    totalPrice: z.number(),
    startStation: z.string().nonempty("Start station is required."),
    endStation: z.string().nonempty("End station is required."),
    status: z.string().nonempty("Status is required."),
    startStationCode: z.string().nonempty("startStationCode is required."),
    endStationCode: z.string().nonempty("endStationCode is required."),
    departureDate: z.string().nonempty("Departure date is required."), // ISO 8601 date
    tickets: z.array(ticketSchema),
});

type FormMode = "create" | "edit" | "view";

export default function BookingForm({
    initialData,
    listdataStation,
    pageTitle,
    mode,
    onSubmit
}: {
    initialData: Booking | null | undefined;
    listdataStation: Station[] | undefined;
    pageTitle: string;
    mode: FormMode;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";

    const defaultValues = {
        id: initialData?.id || 0,
        bookingTime: initialData?.bookingTime || "",
        totalPrice: initialData?.totalPrice || 0,
        startStation: initialData?.startStation || "",
        endStation: initialData?.endStation || "",
        status: initialData?.status || "",
        departureDate: initialData?.departureDate || "",
        tickets: initialData?.tickets || [],
        startStationCode: initialData?.startStationCode || "",
        endStationCode: initialData?.endStationCode || "",
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
    // useEffect(() => {
    //     const selectedClass = listdataCarriageClass?.find(
    //         (item) => item.name === form.getValues("carriageClass")
    //     );
    //     if (selectedClass) {
    //         form.setValue("carriageClassId", selectedClass.id);
    //     }
    // }, [form.getValues("carriageClass"), listdataCarriageClass, form]);

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

                            {/* Name en Field */}
                            <FormField
                                control={form.control}
                                name="totalPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>total Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number" // Đặt type là number
                                                placeholder="Enter total Price"
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
                                name="bookingTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>bookingTime</FormLabel>
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
                                name="startStation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>startStation</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString()}
                                                onValueChange={(value) => {

                                                    field.onChange(value); // Gán id cho field trainId
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
                            <FormField
                                control={form.control}
                                name="endStation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>endStationId</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value?.toString()}
                                                onValueChange={(value) => {
                                                    field.onChange(value); // Gán id cho field trainId
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
                            <FormField
                                control={form.control}
                                name="departureDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>departureDate</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="date" // Đặt type là number
                                                placeholder="Enter departureDate"
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

                        <div className="flex space-x-4">
                            <Link href="/dashboard/bookings">
                                <Button variant="secondary">Back</Button>
                            </Link>
                            {!isViewMode && (
                                <Button type="submit">
                                    {isCreateMode ? "Create " : "Update "}
                                </Button>
                            )}

                            {isViewMode && (
                                <Link href={`/dashboard/bookings/edit/${defaultValues.id}`}>
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
