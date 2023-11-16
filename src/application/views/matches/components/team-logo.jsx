const TeamLogo = ({ url }) => {
    return (
      <img
        src={url ?? ""}
        alt="team logo"
        style={{ height: 40, aspectRatio: 1, borderRadius: "50%" }}
      />
    );
  };

  export default TeamLogo