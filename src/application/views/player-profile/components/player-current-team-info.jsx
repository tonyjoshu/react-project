import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";

function PlayerCurrentTeamInfo({ playerProfileHook }) {
  return (
    <Column a_end j_center style={{ width: "fit-content", gap: 0 }}>
      <Label
        xLarge
        noWrap
        capitalize
        text={playerProfileHook.playerDetails?.name}
      />
      <Label
        small
        noWrap
        text={`${playerProfileHook.playerDetails?.position ?? ""}, ${
          playerProfileHook.playerDetails?.position_short ?? ""
        }`}
      />
      <Row
        a_center
        gap={5}
        style={{
          padding: 5,
          borderRadius: 10,
          backgroundColor:
            playerProfileHook.playerDetails?.current_club?.team_color,
        }}
      >
        <img
          src={playerProfileHook.playerDetails?.current_club?.logo}
          alt={``}
          style={{
            width: 40,
            aspectRatio: 1,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            backgroundColor: `#21212155`,
            paddingInline: 5,
            borderRadius: 10,
          }}
        >
          <Label
            large
            noWrap
            xBold
            color={"white"}
            text={playerProfileHook.playerDetails?.current_club?.name}
          />
        </div>
      </Row>
    </Column>
  );
}

export default PlayerCurrentTeamInfo;
