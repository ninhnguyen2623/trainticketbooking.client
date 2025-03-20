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
import { Province, Station, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z.string().nonempty("Station name is required."),
  code: z.string().nonempty("Station code is required."),
  latitude: z.number(),
  longitude: z.number(),
  provinceId: z.number(),
  ggMapLink: z.string().nonempty("Station ggmapLink en is required."),

});

type FormMode = "create" | "edit" | "view";

export default function StationForm({
  initialData,
  pageTitle,
  mode,
  listdataProvince,
  onSubmit
}: {
  initialData: Station | null | undefined;
  pageTitle: string;
  mode: FormMode;
  listdataProvince: Province[] | undefined;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const defaultValues = {
    id: initialData?.id || 0,
    name: initialData?.name || "",
    code: initialData?.code || "",
    ggMapLink: initialData?.ggMapLink || "",
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    provinceId: initialData?.provinceId || 0,
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
  form.setValue("longitude", 0);
  form.setValue("latitude", 0);

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
                      <FormLabel>Station ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Station ID"
                          readOnly
                          className="cursor-not-allowed"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Station name"
                        readOnly={isViewMode}
                        className={isViewMode ? "cursor-not-allowed" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name en Field */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station Name En</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Station name en"
                        readOnly={isViewMode}
                        className={isViewMode ? "cursor-not-allowed" : ""}
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Name en Field */}
              <FormField
                control={form.control}
                name="ggMapLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station ggMapLink</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Station ggMapLink"
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
                name="provinceId"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString() || listdataProvince?.[0]?.id.toString()}
                        onValueChange={(value) => {
                          const selectedTrain = listdataProvince?.find(
                            (item) => item.id.toString() === value
                          );
                          field.onChange(parseInt(value)); // Gán id cho field trainId
                        }}
                      >
                        <SelectTrigger className="w-full" disabled={isViewMode}>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent className="h-80 overflow-auto">
                          <ScrollArea>
                            <SelectGroup>
                              {listdataProvince?.map((item) => (
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
              <Link href="/dashboard/stations">
                <Button variant="secondary">Back</Button>
              </Link>
              {!isViewMode && (
                <Button type="submit">
                  {isCreateMode ? "Create Station" : "Update Station"} m m
                </Button>
              )}

              {isViewMode && (
                <Link href={`/dashboard/stations/edit/${defaultValues.id}`}>
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
