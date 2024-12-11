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
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Link } from "@/i18n/routing";
import { Train, TrainJourney } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included

const formSchema = z.object({
  id: z.number(),
  trainId: z.number(),
  trainName: z.string().nonempty("TrainJourney name is required."),
  departureDate: z.string().nonempty("Departure date is required."),
  arrivalDate: z.string().nonempty("Arrival date is required."),
  status: z.string().nonempty("Status is required."),
});

type FormMode = "create" | "edit" | "view";

export default function TrainJourneyForm({
  initialData,
  pageTitle,
  mode,
  listdataTrain,
  onSubmit
}: {
  initialData: TrainJourney | null | undefined;
  pageTitle: string;
  listdataTrain: Train[] | undefined;
  mode: FormMode;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const defaultValues = {
    id: initialData?.id || 0,
    trainId: initialData?.trainId || 0,
    trainName: initialData?.trainName || "",
    departureDate: initialData?.departureDate || "",
    arrivalDate: initialData?.arrivalDate || "",
    status: initialData?.status || ""
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!isViewMode) {
      console.log("value train journey:", values);
      onSubmit(values);
    }
  };

  const [value, setValue] = useState<DateValueType>({
    startDate: initialData?.departureDate ? new Date(initialData.departureDate) : null,
    endDate: initialData?.arrivalDate ? new Date(initialData.arrivalDate) : null,
  });

  const handleDateChange = (newValue: DateValueType | null) => {
    if (!newValue) return; // Nếu newValue là null, thoát khỏi hàm.
    setValue(newValue);
    if (newValue.startDate) {
      form.setValue("departureDate", new Date(newValue.startDate).toISOString());
    }
    if (newValue.endDate) {
      form.setValue("arrivalDate", new Date(newValue.endDate).toISOString());
    }
  };


  useEffect(() => {
    const selectedTrain = listdataTrain?.find(
      (item) => item.name === form.getValues("trainName")
    );
    if (selectedTrain) {
      form.setValue("trainId", selectedTrain.id);
    }
  }, [form.getValues("trainName"), listdataTrain, form]);

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
                      <FormLabel>TrainJourney ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="TrainJourney ID"
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
                name="trainName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Train</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || listdataTrain?.[0]?.id.toString()}
                        onValueChange={(value) => {
                          field.onChange(value); // Gán id cho field trainId
                        }}
                      >
                        <SelectTrigger className="w-full" disabled={isViewMode}>
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

              {/* Date Range Picker */}
              <FormField
                control={form.control}
                name="departureDate" // Liên kết với departureDate (bắt đầu)
                render={() => (
                  <FormItem>
                    <FormLabel>Ngày hành trình</FormLabel>
                    <FormControl>
                      <Datepicker
                        value={value}
                        onChange={handleDateChange}
                        disabled={isViewMode}
                        asSingle={false} // Chọn khoảng thời gian (không phải một ngày)
                        // displayFormat="DD-MM-YYYY"
                        containerClassName={`border ${isViewMode ? "cursor-not-allowed" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TrainJourney Status</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter TrainJourney status"
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
              <Link href="/dashboard/train-journeys">
                <Button variant="secondary">Back</Button>
              </Link>
              {!isViewMode && (
                <Button type="submit">
                  {isCreateMode ? "Create TrainJourney" : "Update TrainJourney"}
                </Button>
              )}

              {isViewMode && (
                <Link href={`/dashboard/train-journeys/edit/${defaultValues.id}`}>
                  <Button variant="destructive">Switch Update</Button>
                </Link>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
