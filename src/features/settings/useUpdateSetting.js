import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export const useUpdateSetting = () => {
  const useQuery = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully edited!!");
      useQuery.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err),
  });
  return { isUpdating, updateSetting };
};
