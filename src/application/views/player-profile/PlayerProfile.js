import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Column from "src/application/shared/components/Column";
import Label from "src/application/shared/components/Label";
import Row from "src/application/shared/components/Row";
import goBack from "src/helper_functions/goBack";
import usePlayerProfile from "./usePlayerProfile";
import PlayerPersonalInformation from "./components/player-personal-info/personal-info";
import PlayerProfileImage from "./components/player-profile-image";
import PlayerCurrentTeamInfo from "./components/player-current-team-info";
import PlayerStatsTable from "./components/player-stats-table";

const PlayerProfile = () => {
  let navigate = useNavigate();
  const playerProfileHook = usePlayerProfile();

  if (playerProfileHook.loading) {
    return <Label text={"loading ..."} />;
  } else {
    return (
      <Column gap={30}>
        <Row
          a_center
          j_start
          gap={5}
          onClick={() => goBack(navigate)}
          style={{
            cursor: "pointer",
            width: 100,
            alignSelf: "flex-start",
          }}
        >
          <MdArrowBackIos />
          <Label noWrap text={"Players"} />
        </Row>

        <Row a_center j_center gap={20}>
          <Row a_center j_center gap={10} style={{ width: "fit-content" }}>
            <PlayerCurrentTeamInfo playerProfileHook={playerProfileHook} />
            <PlayerProfileImage playerProfileHook={playerProfileHook} />
          </Row>
          <PlayerPersonalInformation playerProfileHook={playerProfileHook} />
        </Row>

        <PlayerStatsTable playerProfileHook={playerProfileHook} />
      </Column>
    );
  }
};

export default PlayerProfile;
