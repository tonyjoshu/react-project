export const uploadImageToCloudinary = async (imageFile) =>
{
  try
  {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "from_web");

    // "https://api.cloudinary.com/v1_1/hhes/image/upload",
    const { secure_url } = await fetch(
      "https://api.cloudinary.com/v1_1/nbcassets/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    return secure_url;
  } catch (error)
  {
    console.log({ cloudinaryError: error });
    return "";
  }
};
