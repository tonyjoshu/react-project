import { toast } from 'react-hot-toast'

const popUpFormValidation = (
  name,
  country,
  height,
  currentClub,
  uploadedImageFile
) => {
  if (name === "") {
    toast.error("Name field should not be empty")
    return false;
  }
  if (country === "") {
    toast.error("Country field should not be empty")
    return false;
  }
  if (currentClub === "") {
    toast.error("Club field should be selected")
    return false;
  }

  if (!uploadedImageFile) {
    toast.error("Image file should be selected")
    return false;
  }

  return true;
};

export default popUpFormValidation;
