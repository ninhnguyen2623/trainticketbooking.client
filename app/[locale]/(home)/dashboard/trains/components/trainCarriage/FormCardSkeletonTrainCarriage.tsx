import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function FormCardSkeleton() {
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <Skeleton className="h-8 w-48" /> {/* Title */}
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Grid layout for form fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/*  Name field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>

            {/* Type field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Select */}
            </div>
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}
