import { useNavigate } from "react-router-dom";
import { routeStrings } from "src/application/routing/routes";
import Column from "src/application/shared/components/Column";
import GridStyled from "src/application/shared/components/GridStyled";
import Label from "src/application/shared/components/Label";
import useTeamsBySeason from "./use-teams-by-season";

export default function TeamsBySeason({ seasonYears, selectedSeasonIndex }) {
  let navigate = useNavigate();
  const useTeamsBySeasonData = useTeamsBySeason(
    seasonYears[selectedSeasonIndex]
  );
  return (
    <Column style={{ marginBottom: 30, paddingTop: 20 }}>
      {useTeamsBySeasonData.loading ? (
        <p>loading ,,,</p>
      ) : (
        <>
          {useTeamsBySeasonData.data.length === 0 ? (
            <p>no data available</p>
          ) : (
            <GridStyled
              style={{
                width: "100%",
                gridTemplateColumns: "repeat(6, 1fr)",
                marginBlock: 0,
                textAlign: "center",
              }}
            >
              {useTeamsBySeasonData.data.map((teamInfo, index) => {
                return (
                  <Column
                    key={index}
                    j_center
                    style={{
                      aspectRatio: 1,
                      backgroundColor: "white",
                      paddingBlock: 20,
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`${routeStrings.teamProfile}/${teamInfo._id}`);
                    }}
                  >
                    <Label xBold small color={"grey"} text={teamInfo.name} />
                    <div style={{ width: "35%" }}>
                      <img
                        src={teamInfo.logo}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Column>
                );
              })}
            </GridStyled>
          )}
        </>
      )}
    </Column>
  );
}
