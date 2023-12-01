import { ConnectifyStarIcon } from "#/assets/icons";
import { ConditionalLoadingType } from "#/lib/types";
import { Skeleton } from "#/lib";

export function RateStars({
  isLoading,
  rate,
  starsCount = 5,
}: ConditionalLoadingType<{ rate: string | number }> & { starsCount?: number }) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex">
        {Array(starsCount)
          .fill("star")
          .map((_, index) => (
            <ConnectifyStarIcon
              key={index}
              className={`h-5 w-5 ${isLoading ? "animate-pulse text-default-1000/10" : "text-primary-500"}`}
            />
          ))}
      </div>
      {isLoading ? (
        <Skeleton className="h-4 w-6 rounded-full" />
      ) : (
        <p className="font-medium text-default-700">{rate}</p>
      )}
    </div>
  );
}
