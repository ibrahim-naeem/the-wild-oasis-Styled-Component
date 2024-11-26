import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
  const useQuery = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin is created successfully!!");
      useQuery.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err),
  });
  return { isCreating, createCabin };
};
