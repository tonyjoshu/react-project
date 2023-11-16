function ImageBanner({ imageBanner }) {
  return (
    <div
      style={{
        height: "90%",
        aspectRatio: 1,
        borderRadius: 10,
        overflow: "clip",
      }}
    >
      <img
        src={imageBanner}
        alt=""
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

export default ImageBanner;
