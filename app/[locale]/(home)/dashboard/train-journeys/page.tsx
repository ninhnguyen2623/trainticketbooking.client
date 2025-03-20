"use client";

import PageContainer from "@/components/layout/PageContainer";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { DataTableSkeleton } from "@/components/ui/table/DataTableSkeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { SearchParams } from "nuqs/parsers";
import { Link } from "@/i18n/routing";
import { useGetPagedListTrainJourneyQuery, useGetTrainsWithJourneysQuery } from "@/services/trainJourneyApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included
import { TrainJourney } from "@/interfaces";
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { FiEdit } from "react-icons/fi";
import { useSyncTrainJourneysMutation } from "@/services/trainJourneyApi";

type pageProps = {
    searchParams: SearchParams;
};
type DateValueType = {
    startDate: Date | null;
    endDate: Date | null;
};
type Item = {
    id: number;
    name: string;
};

export default function Page({ searchParams }: pageProps) {
    searchParamsCache.parse(searchParams);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const queryDate = selectedDate ? selectedDate.toString() : "";
    const { data: dataTrainJourneys, error, isLoading, refetch } = useGetTrainsWithJourneysQuery(queryDate);
    const [events, setEvents] = useState<EventInput[]>([]);

    // Cập nhật selectedIds khi dataTrainJourneys thay đổi
    useEffect(() => {
        if (dataTrainJourneys?.data) {
            const checkedTrain = dataTrainJourneys.data
                .filter((item) => item.selected)
                .map((item) => item.trainId) ?? [];
            setSelectedIds(checkedTrain);
        }
    }, [dataTrainJourneys]);
    // click calendar
    const handleDateClick = (info: any) => {
        const newEvent: EventInput = {
            start: info.dateStr,
            allDay: true,
            display: 'background',
            className: '!bg-blue-700',
        };
        setEvents([newEvent]);
        setSelectedDate(info.dateStr);
    };

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Hàm xử lý khi click vào checkbox
    const handleCheckboxChange = (trainId: number, isChecked: boolean) => {
        setSelectedIds((prevSelectedIds) => {
            if (isChecked) {
                return [...prevSelectedIds, trainId];
            } else {
                return prevSelectedIds.filter(id => id !== trainId);
            }
        });
    };

    // Hàm xử lý chọn tất cả
    const handleSelectAll = (isChecked: boolean) => {
        if (isChecked) {
            const allIds = dataTrainJourneys?.data.map((item) => item.trainId) ?? [];
            setSelectedIds(allIds);
        } else {
            if (dataTrainJourneys?.data) {
                const checkedTrain = dataTrainJourneys.data
                    .filter((item) => item.selected)
                    .map((item) => item.trainId) ?? [];
                setSelectedIds(checkedTrain);
            }
        }
    };
    // Kiểm tra trạng thái "Select All"
    const isAllSelected = selectedIds.length === dataTrainJourneys?.data.length;
    const handleSync = async () => {
        try {
            toast.loading("Creating TrainJourney...", { id: "create-TrainJourney" });
            const response = await syncTrainJourneys({
                departureDate: selectedDate || "",
                trainIds: selectedIds || []
            }).unwrap();

            if (response.success) {
                toast.success("TrainJourney created successfully!", { id: "create-TrainJourney" });
                await refetch();
            } else {
                toast.error("TrainJourney creation failed. Please try again.", {
                    id: "create-TrainJourney"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the TrainJourney.";
            toast.error(errorMessage, { id: "create-TrainJourney" });
        }
    };
    const handleUpdateSync = async () => {
        try {
            toast.loading("Update TrainJourney...", { id: "Update-TrainJourney" });
            const response = await syncTrainJourneys({
                departureDate: selectedDate || "",
                trainIds: selectedIds || []
            }).unwrap();

            if (response.success) {
                toast.success("TrainJourney Update successfully!", { id: "Update-TrainJourney" });
                await refetch();
            } else {
                toast.error("TrainJourney creation failed. Please try again.", {
                    id: "Update-TrainJourney"
                });
            }
        } catch (err: any) {
            const errorMessage =
                err?.message || "An error occurred while creating the TrainJourney.";
            toast.error(errorMessage, { id: "Update-TrainJourney" });
        }
    };
    // create 
    const [syncTrainJourneys] = useSyncTrainJourneysMutation();
    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading title="TrainJourneys" description="Manage TrainJourneys" />
                    <Button variant="destructive"
                        className={cn(buttonVariants(), "text-xs md:text-sm")}
                        onClick={() => handleSync()}
                    ><Plus className="mr-2 h-4 w-4" /> Add New</Button>
                </div>
                <Separator />
                <div className="flex">
                    <div className="flex-1">
                        {/* Lịch hiển thị cố định */}
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            dateClick={handleDateClick}
                        />
                    </div>

                    <div className="flex-1">

                        <div className="mx-4 border  border-black-200 rounded-md">
                            <div className="">
                                <header className=" h-[65px] flex justify-between items-center  
                            border-collapse border-b  border-black-200 pl-1 ">
                                    <div className="w-[10%] h-full flex justify-center items-center pl-2">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </div>
                                    <h2 className="w-[70%] font-bold">Train</h2>
                                    <Button variant="destructive"
                                        className={cn(buttonVariants(), " w-[115px] mr-7 text-xs md:text-sm")}
                                        onClick={() => handleUpdateSync()}
                                    ><FiEdit className="text-white mr-2" size={20} /> Edit</Button>
                                </header>

                            </div>
                            <div className="">
                                <div className="max-h-[593px] overflow-y-auto block px-2 rounded-md">
                                    {dataTrainJourneys?.data.map((item) => (
                                        <div className=" h-[41px] flex items-center  
                            border-collapse border border-black-200 rounded-md my-2" key={item.trainId}>
                                            <div className="w-[10%] h-full flex justify-center items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(item.trainId)}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(item.trainId, e.target.checked)
                                                    }
                                                />
                                            </div>
                                            <div className="w-[90%]">
                                                {item.trainName}
                                            </div>
                                        </div>

                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
