import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col space-y-3 mt-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
