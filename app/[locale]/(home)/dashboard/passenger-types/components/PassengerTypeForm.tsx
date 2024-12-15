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
import { PassengerType, Province, Train } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  type: z.string().nonempty("Province name is required."),
  discountPercentage: z.number(),
});

type FormMode = "create" | "edit" | "view";

export default function PassengerTypeForm({
  initialData,
  pageTitle,
  mode,
  onSubmit
}: {
  initialData: PassengerType | null | undefined;
  pageTitle: string;
  mode: FormMode;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) {
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const isCreateMode = mode === "create";

  const defaultValues = {
    id: initialData?.id || 0,
    type: initialData?.type || "",
    discountPercentage: initialData?.discountPercentage || 0,

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
                      <FormLabel>Province ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Province ID"
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Type"
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
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>discountPercentage</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number" // Đặt type là number
                        placeholder="Enter discountPercentage"
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

            </div>

            <div className="flex space-x-4">
              <Link href="/dashboard/passenger-types">
                <Button variant="secondary">Back</Button>
              </Link>
              {!isViewMode && (
                <Button type="submit">
                  {isCreateMode ? "Create Province" : "Update Province"}
                </Button>
              )}

              {isViewMode && (
                <Link href={`/dashboard/passenger-types/edit/${defaultValues.id}`}>
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
