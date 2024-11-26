import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = () => {
  const useQuery = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited!!");
      useQuery.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err),
  });
  return { isEditing, editCabin };
};
