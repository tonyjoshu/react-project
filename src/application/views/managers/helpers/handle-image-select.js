function imageSelect(event, setImage, set_uploadedImageFile) {
  const fileUploaded = event.target.files[0];
  let localImageUrl = URL.createObjectURL(fileUploaded);
  setImage(localImageUrl);
  set_uploadedImageFile(fileUploaded);
}

export default imageSelect;
