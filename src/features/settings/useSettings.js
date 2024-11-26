import { getSettings as getSettingsApi } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";
export const useSettings = () => {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryFn: getSettingsApi,
    queryKey: ["settings"],
  });

  return { isLoading, error, settings };
};
