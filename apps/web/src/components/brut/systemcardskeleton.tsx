import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./card";
import { Skeleton } from "./skeleton";

export function SystemCardSkeleton() {
  return (
    <Card className="h-[480px] flex flex-col bg-surface border-2 border-ink rounded-none overflow-hidden shadow-hard">
      <CardHeader className="p-6 pb-2">
        {/* Icon */}
        <Skeleton className="w-12 h-12 mb-4" />

        {/* Title */}
        <Skeleton className="h-7 w-3/4" />

        {/* Stats */}
        <div className="flex gap-3 mt-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Description */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-14" />
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        {/* Updated */}
        <div className="w-full space-y-2 mb-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardFooter>
    </Card>
  );
}
