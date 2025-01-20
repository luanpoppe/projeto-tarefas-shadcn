import { useState } from "react";

export function useIsLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
  };
}
