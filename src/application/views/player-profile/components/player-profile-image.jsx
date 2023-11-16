function PlayerProfileImage({ playerProfileHook }) {
  return (
    <div
      style={{
        minHeight: 200,
        maxHeight: 200,
        aspectRatio: 1,
        borderRadius: "50%",
        border: `1px solid tomato`,
        position: "relative",
        overflow: "clip",
        backgroundImage: `url(${playerProfileHook.playerDetails?.pic})`,
        objectFit: "contain",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 15,
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          backdropFilter: "blur(30px)",
          zIndex: 50,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={playerProfileHook.playerDetails?.pic}
          alt={``}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default PlayerProfileImage;
