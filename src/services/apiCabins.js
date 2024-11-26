import supabase from "./supabase";
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createEditCabin(cabinData, id) {
  const hasImagePath = cabinData.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinData.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(hasImagePath);
  let query = supabase.from("cabins");

  // 1. create cabin
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);

  //2. edit cabin
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { error, data } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created!!");
  }

  if (hasImagePath) return data;

  // 2.Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and cabin is not created"
    );
  }
  return data;
}
