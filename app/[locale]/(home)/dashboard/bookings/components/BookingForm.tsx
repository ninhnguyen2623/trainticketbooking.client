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
import { Booking, Passenger, Station, Ticket, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { formatISO } from "date-fns";
import { Table, Button as AntButton } from "antd"; // Import thêm các thành phần từ Ant Design
import { DeleteOutlined } from "@ant-design/icons"; // Biểu tượng xóa

const passengerSchema = z.object({
    id: z.number(),
    passengerId: z.number(),
    fullName: z.string().nonempty("Full name is required."),
    passengerTypeId: z.number(),
    identityCardNumber: z.string().nonempty("Identity card number is required."),
    passengerTypeName: z.string().nonempty("Passenger type is required."),
    discountPercentage: z.number(),
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
    trainId: z.number(),
    startStationName: z.string().nonempty("Start station name is required."),
    endStationName: z.string().nonempty("End station name is required."),
    isDeparture: z.boolean(),
    seatReturnId: z.number(),
    seatReturnPrice: z.number(),
    seatReturnDepartureDate: z.string().nonempty("End station name is required."),
    passenger: passengerSchema,
});
const formSchema = z.object({
    id: z.number(),
    bookingTime: z.string().nonempty("Booking time is required."), // ISO 8601 date
    totalPrice: z.number(),
    startStationId: z.number(),
    endStationId: z.number(),
    startStation: z.string().nonempty("Start station is required."),
    endStation: z.string().nonempty("End station is required."),
    status: z.string().nonempty("Status is required."),
    startStationCode: z.string().nonempty("startStationCode is required."),
    endStationCode: z.string().nonempty("endStationCode is required."),
    departureDate: z.string().nonempty("Departure date is required."), // ISO 8601 date
    tickets: z.array(z.unknown()),
});

type FormMode = "create" | "edit" | "view";

export default function BookingForm({
    initialData,
    listdataStation,
    listdataPassenger,
    listdataTrain,
    pageTitle,
    mode,
    onSubmit
}: {
    initialData: Booking | null | undefined;
    listdataStation: Station[] | undefined;
    listdataTrain: Train[] | undefined;
    listdataPassenger: Passenger[] | undefined;
    pageTitle: string;
    mode: FormMode;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
    const isViewMode = mode === "view";
    const isEditMode = mode === "edit";
    const isCreateMode = mode === "create";
    const [valueTicket, setValueTicket] = useState<Ticket[]>([]);

    const defaultValues = {
        id: initialData?.id || 0,
        bookingTime: initialData?.bookingTime || "",
        totalPrice: initialData?.totalPrice || 0,
        startStationId: initialData?.startStationId || 0,
        endStationId: initialData?.endStationId || 0,
        startStation: initialData?.startStation || "",
        endStation: initialData?.endStation || "",
        status: initialData?.status || "",
        departureDate: initialData?.departureDate || "",
        tickets: initialData?.tickets || [],
        startStationCode: initialData?.startStationCode || "",
        endStationCode: initialData?.endStationCode || "",
    };
    const defaultValuesTicket = {
        ticketId: 0,
        price: 0,
        bookingDate: "",
        departureDate: "",
        status: "",
        seatId: 0,
        seatNumber: "",
        seatType: "",
        carriageName: "",
        trainName: "",
        trainId: 0,
        startStationName: "",
        endStationName: "",
        isDeparture: false,
        seatReturnId: 0,
        seatReturnPrice: 0,
        seatReturnDepartureDate: "",
        passenger: {
            id: 0,
            passengerId: 0,
            fullName: "",
            passengerTypeId: 0,
            identityCardNumber: "",
            passengerTypeName: "",
            discountPercentage: 0,
        }
    }
    const defaultValuesPassenger = {
        id: 0,
        passengerId: 0,
        fullName: "",
        passengerTypeId: 0,
        identityCardNumber: "",
        passengerTypeName: "",
        discountPercentage: 0,
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });
    const formTicket = useForm<z.infer<typeof ticketSchema>>({
        resolver: zodResolver(ticketSchema),
        values: defaultValuesTicket
    });
    const formPassenger = useForm<z.infer<typeof passengerSchema>>({
        resolver: zodResolver(passengerSchema),
        values: defaultValuesPassenger
    });

    const selectedStartStation = listdataStation?.find(
        (item) => item.name === form.getValues("startStation")
    );
    const selectedEndStation = listdataStation?.find(
        (item) => item.name === form.getValues("endStation")
    );
    const selectedPassenger = listdataPassenger?.find(
        (item) => item.fullName === formPassenger.getValues("fullName")
    );
    const selectedTrain = listdataTrain?.find(
        (item) => item.name === formTicket.getValues("trainName")
    );
    if (selectedStartStation && selectedEndStation && selectedPassenger && selectedTrain) {
        form.setValue("startStationCode", selectedStartStation.code);
        form.setValue("endStationCode", selectedEndStation.code);
        form.setValue("startStationId", selectedStartStation.id);
        form.setValue("endStationId", selectedEndStation.id);
        form.setValue("tickets", valueTicket);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        const isoTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        form.setValue("bookingTime", isoTime);
        // passenger
        formPassenger.setValue("passengerId", selectedPassenger.id);
        formPassenger.setValue("id", selectedPassenger.id);
        formPassenger.setValue("passengerTypeId", selectedPassenger.passengerTypeId);
        formPassenger.setValue("identityCardNumber", selectedPassenger.identityCardNumber);
        formPassenger.setValue("passengerTypeName", selectedPassenger.passengerTypeName);
        formPassenger.setValue("discountPercentage", selectedPassenger.discountPercentage);
        formTicket.setValue("trainId", selectedTrain.id);
        // console.log("trainid", formTicket.getValues("trainId"));

    }
    // Thêm vé vào danh sách
    const handleAddTicket = (ticket: Ticket) => {
        setValueTicket((prev) => [...prev, ticket]);
        form.setValue("tickets", [...valueTicket, ticket]); // Cập nhật vào form
        console.log(form.getValues('tickets'));
    };

    // Xóa vé khỏi danh sách
    const handleDeleteTicket = (ticketId: number) => {
        const updatedTickets = valueTicket.filter((ticket) => ticket.ticketId !== ticketId);
        setValueTicket(updatedTickets);
        form.setValue("tickets", updatedTickets); // Cập nhật vào form
    };

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: "Ticket ID",
            dataIndex: "ticketId",
            key: "ticketId",
        },
        {
            title: "Passenger",
            key: "Passenger",
            render: (_, record: Ticket) => record.passenger?.fullName || "N/A",
        },
        {
            title: "Seat Number",
            dataIndex: "seatNumber",
            key: "seatNumber",
        },
        {
            title: "Train ",
            dataIndex: "trainName",
            key: "trainName",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Departure Date",
            dataIndex: "departureDate",
            key: "departureDate",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Ticket) => (
                <AntButton
                    type="link"
                    className="text-red-600"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteTicket(record.ticketId)}
                >
                    Delete
                </AntButton>
            ),
        },
    ];
    const seatNum = [1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isViewMode) {
            await form.trigger("tickets");
            // console.log("dfdfsd", values);
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
                                                                    {`${item.id} - ${item.name} - ${item.code}`}

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
                                                                    {`${item.id} - ${item.name} - ${item.code}`}
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
                                                type="date"
                                                value={
                                                    field.value
                                                        ? field.value.slice(0, 10) // Lấy phần YYYY-MM-DD từ chuỗi
                                                        : ""
                                                }
                                                placeholder="Enter departure date"
                                                readOnly={isViewMode}
                                                className={isViewMode ? "cursor-not-allowed" : ""}
                                                onChange={(e) => {
                                                    const date = e.target.value; // Lấy giá trị YYYY-MM-DD từ input
                                                    const updatedDate = `${date}T00:00:00`; // Thêm phần giờ mặc định
                                                    field.onChange(updatedDate); // Cập nhật giá trị đầy đủ
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
                                                            <SelectItem value="Pending">
                                                                Pending
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


                            {/* Name en Field */}

                        </div>
                        {!isViewMode && (
                            <div className="">
                                <CardHeader>
                                    <CardTitle className="text-left text-2xl font-bold">
                                        Ticket
                                    </CardTitle>
                                </CardHeader>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* thêm form ticket tại đây dạng formField giống dưới */}
                                    <FormField
                                        control={formTicket.control}
                                        name="seatNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Seat Number</FormLabel>
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
                                                                    {seatNum?.map((item) => (
                                                                        <SelectItem key={item} value={item.toString()}>
                                                                            {item}
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
                                        control={formTicket.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        placeholder="Enter Price"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formTicket.control}
                                        name="departureDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Departure Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="date"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formPassenger.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passenger</FormLabel>
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
                                                                    {listdataPassenger?.map((item) => (
                                                                        <SelectItem key={item.id} value={item.fullName}>
                                                                            {`${item.id} - ${item.fullName}`}
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
                                        control={formTicket.control}
                                        name="trainName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Train</FormLabel>
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
                                                                    {listdataTrain?.map((item) => (
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
                                </div>
                                <div>
                                    <Button
                                        type="button"
                                        className="my-5"
                                        onClick={() =>
                                            handleAddTicket({
                                                ticketId: valueTicket.length + 1,
                                                seatNumber: formTicket.getValues("seatNumber"),
                                                price: parseInt(formTicket.getValues("price").toString()),
                                                departureDate: formTicket.getValues("departureDate"),
                                                bookingDate: formatISO(new Date()),
                                                status: "Pending",
                                                seatId: parseInt(formTicket.getValues("seatNumber").toString()), // Giá trị mẫu
                                                seatType: "", // Giá trị mẫu
                                                carriageName: "",
                                                trainId: 1,// Giá trị mẫu
                                                trainName: formTicket.getValues("trainName"), // Giá trị mẫu
                                                startStationName: "", // Giá trị mẫu
                                                endStationName: "", // Giá trị mẫu
                                                isDeparture: true,
                                                seatReturnId: 0,
                                                seatReturnPrice: 0,
                                                seatReturnDepartureDate: "2024-12-14T18:42:30.688Z",
                                                passenger: {
                                                    id: formPassenger.getValues("id"),
                                                    passengerId: formPassenger.getValues("passengerId"),
                                                    fullName: formPassenger.getValues("fullName"),
                                                    identityCardNumber: formPassenger.getValues("identityCardNumber"),
                                                    passengerTypeId: formPassenger.getValues("passengerTypeId"),
                                                    passengerTypeName: formPassenger.getValues("passengerTypeName"),
                                                    discountPercentage: formPassenger.getValues("discountPercentage"),
                                                },
                                            })
                                        }
                                    >
                                        Add Ticket
                                    </Button>
                                </div>

                                <Table
                                    dataSource={valueTicket}
                                    columns={columns}
                                    rowKey="ticketId"
                                />
                            </div>
                        )}
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
