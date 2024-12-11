"use client";

import PageContainer from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/Separator";
import { DataTableSkeleton } from "@/components/ui/table/DataTableSkeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { SearchParams } from "nuqs/parsers";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { Link } from "@/i18n/routing";
import { useGetPagedListTrainJourneyQuery } from "@/services/trainJourneyApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import Datepicker from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included
import { TrainJourney } from "@/interfaces";

type pageProps = {
    searchParams: SearchParams;
};
type DateValueType = {
    startDate: Date | null;
    endDate: Date | null;
};

export default function Page({ searchParams }: pageProps) {
    searchParamsCache.parse(searchParams);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 31
    });

    const { data, isFetching } = useGetPagedListTrainJourneyQuery({
        pageNumber: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
    });

    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });


    const handleDateChange = (newValue: DateValueType) => {
        setValue(newValue);
    };
    const [filteredData, setFilteredData] = useState<TrainJourney[]>([]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const trainDataMock: TrainJourney[] = [
        {
            id: 1,
            trainId: 1,
            trainName: "Express Alpha",
            departureDate: "2024-11-11T06:00:00.000Z",
            arrivalDate: "2024-12-11T10:00:00.000Z",
            status: "On Time",
        },
        {
            id: 2,
            trainId: 2,
            trainName: "Regional Beta",
            departureDate: "2024-10-11T12:30:00.000Z",
            arrivalDate: "2024-11-11T16:45:00.000Z",
            status: "Delayed",
        },
        {
            id: 3,
            trainId: 3,
            trainName: "Intercity Gamma",
            departureDate: "2024-09-11T14:15:00.000Z",
            arrivalDate: "2024-10-11T18:30:00.000Z",
            status: "Cancelled",
        },
        {
            id: 4,
            trainId: 4,
            trainName: "Express Delta",
            departureDate: "2024-08-11T08:45:00.000Z",
            arrivalDate: "2024-09-11T11:30:00.000Z",
            status: "On Time",
        },
        {
            id: 5,
            trainId: 5,
            trainName: "Regional Epsilon",
            departureDate: "2024-07-11T19:00:00.000Z",
            arrivalDate: "2024-08-11T23:00:00.000Z",
            status: "On Time",
        },
    ];

    useEffect(() => {
        const formatTrainData = (data: TrainJourney[]) =>
            data.map((journey) => ({
                ...journey,
                departureDate: formatDate(journey.departureDate),
                arrivalDate: formatDate(journey.arrivalDate),
            }));

        if (value.startDate && value.endDate) {
            const filtered = trainDataMock.filter((journey) => {
                const departure = new Date(journey.departureDate).getTime();
                const start = value.startDate ? value.startDate.getTime() : 0;
                const end = value.endDate ? value.endDate.getTime() : Infinity;
                return departure >= start && departure <= end;
            });
            setFilteredData(formatTrainData(filtered));
        } else {
            setFilteredData(formatTrainData(trainDataMock));
        }
    }, [value]);

    return (
        <PageContainer>
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <Heading title="TrainJourneys" description="Manage TrainJourneys" />
                    <Link
                        href="/dashboard/train-journeys/create"
                        className={cn(buttonVariants(), "text-xs md:text-sm")}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </div>
                <Separator />
                <div className="">
                    <h2 className="text-xl font-bold mb-4">Select DepartureDate</h2>
                    {/* Lịch hiển thị cố định */}
                    <div className="relative max-w-screen-sm ">
                        <Datepicker
                            value={value}
                            onChange={handleDateChange}
                            showShortcuts={true}
                            showFooter={true} // Hiển thị nút trong lịch
                            asSingle={false} // Dành cho range picker
                            displayFormat="DD-MM-YYYY"
                            containerClassName="static border-2 border-gray-300 rounded-md ouline-none focus:outline-none" // Thêm viền cho container của Datepicker
                            inputClassName="w-full p-2 rounded-md focus:outline-none"
                        />
                    </div>
                </div>
                {isFetching ? (
                    <DataTableSkeleton columnCount={4} rowCount={10} />
                ) : (
                    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                        {filteredData.length > 0 ? (
                            <DataTable
                                data={filteredData}
                                columns={columns}
                                totalItems={filteredData.length}
                                pagination={pagination}
                                onPaginationChange={setPagination}
                            />
                        ) : (
                            <div>No TrainJourney found.</div>
                        )}
                    </div>
                )}
            </div>
        </PageContainer>
    );
}
