import { accentColor, mainColor } from "src/config/colors/colors";
import Column from "src/application/shared/components/Column";
import Row from "src/application/shared/components/Row";
import Label from "src/application/shared/components/Label";

export default function StatRow({ label, home_stat, away_stat, posession }) {
  let homePossession = isNaN(
    parseInt(home_stat) / (parseInt(home_stat) + parseInt(away_stat))
  )
    ? 0.5
    : parseInt(home_stat) / (parseInt(home_stat) + parseInt(away_stat));
  let awayPossession = isNaN(
    parseInt(away_stat) / (parseInt(home_stat) + parseInt(away_stat))
  )
    ? 0.5
    : parseInt(away_stat) / (parseInt(home_stat) + parseInt(away_stat));

  return (
    <Column style={{ height: "fit-content", gap: 5 }}>
      <Row j_between style={{ textTransform: "uppercase" }}>
        {posession ? (
          <Label
            bold
            text={`${Math.floor(
              isNaN(
                parseInt(home_stat) /
                  (parseInt(home_stat) + parseInt(away_stat))
              )
                ? 0.5
                : (parseInt(home_stat) /
                    (parseInt(home_stat) + parseInt(away_stat))) *
                    100
            )}%`}
          />
        ) : (
          <Label bold text={home_stat} />
        )}
        <Label capitalize small bold text={label} />
        {posession ? (
          <Label
            bold
            text={`${Math.floor(
              isNaN(
                parseInt(away_stat) /
                  (parseInt(home_stat) + parseInt(away_stat))
              )
                ? 0.5
                : (parseInt(away_stat) /
                    (parseInt(home_stat) + parseInt(away_stat))) *
                    100
            )}%`}
          />
        ) : (
          <Label bold text={away_stat} />
        )}
      </Row>
      <Row gap={5} style={{ display: label !== "possession" ? "none" : "" }}>
        <Column a_start gap={0}>
          <Row
            style={{
              height: 20,
              backgroundColor: accentColor,
              borderRadius: 5,
              overflow: "clip",
              justifyContent: "flex-end",
            }}
          >
            <Row
              style={{
                backgroundColor: mainColor,
                borderRadius: 5,
                height: "100%",
                width: home_stat,
              }}
            />
          </Row>
        </Column>

        <Column a_end gap={0}>
          <Row
            style={{
              height: 20,
              backgroundColor: accentColor,
              borderRadius: 5,
              overflow: "clip",
            }}
          >
            <Row
              style={{
                backgroundColor: mainColor,
                borderRadius: 5,
                height: "100%",
                width: away_stat,
              }}
            />
          </Row>
        </Column>
      </Row>
    </Column>
  );
}
