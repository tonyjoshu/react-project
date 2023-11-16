import TabComponent from "../tabs/Tabs";
import useMatchHook from "./match-hook";
import GridStyled from "src/application/shared/components/GridStyled";
import Row from "src/application/shared/components/Row";
import { mainColor } from "src/config/colors/colors";
import { BsCaretDownFill, BsDashLg } from "react-icons/bs";
import AddMatch from "./components/add-match/AddMatch";
import TabLabel from "./components/tabLabel";
import MatchStatEntity from "./components/match-stat-entity/match-stat-entity";
import useWindowWidth from "src/helper_functions/use-window-width";
import Label from "src/application/shared/components/Label";

const Matches = () => {
  const matchHookData = useMatchHook()
  const { allRounds } = matchHookData

  const { windowWidth } = useWindowWidth();

  const getMatchStatus = (status) => {
    if (status.toLowerCase() === "live") return "live";
    if (status.toLowerCase() === "full time") return "fin";
    return "nor";
  };

  return (
    <>
      <Label xBold capitalize noWrap xLarge color={"grey"} text={"Matches"} />
      <br />
      <Row
        gap={10}
        style={{
          borderBottom: "1px solid #85F4FF",
          alignItems: "flex-end",
          borderRadius: 10,
          overflow: "clip",
        }}
      >
        <TabComponent
          value={matchHookData.value}
          handleChange={matchHookData.handleChange}
          tabs={matchHookData.tabs}
          backgroundColor={"transparent"}
        />
        {matchHookData.loading ? (
          <Label text={"loading ..."} />
        ) : (
          <Row gap={10} style={{ width: "fit-content", marginBottom: 10 }}>
            <div style={{ position: "relative" }}>
              <BsCaretDownFill
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
              <select
                value={ matchHookData.roundValue }
                onChange={ matchHookData.handleRoundValueChange }
                style={{
                  padding: 15,
                  borderRadius: 10,
                  appearance: "none",
                  minWidth: 200,
                  outline: "none",
                  border: "none",
                  border: "1px solid #85F4FF",
                }}
              >
                {allRounds?.map((round, index) => {
                  return (
                    <option key={index} value={index}>
                      Match Round {round.num}
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={{ position: "relative", marginBottom: 10 }}>
              <BsCaretDownFill
                style={{
                  position: "absolute",
                  right: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
              <select
                value={matchHookData.seasonValue}
                onChange={matchHookData.handleSeasonValueChange}
                style={{
                  padding: 15,
                  borderRadius: 10,
                  appearance: "none",
                  minWidth: 200,
                  outline: "none",
                  border: "none",
                  border: "1px solid #85F4FF",
                }}
              >
                {matchHookData.seasons?.map((season, index) => {
                  return (
                    <option key={index} value={index}>
                      Season {season}
                    </option>
                  );
                })}
              </select>
            </div>
          </Row>
        )}
      </Row>

      <button
        disabled={Boolean(
          matchHookData.loading ||
            matchHookData.endMatchLoading ||
            matchHookData.startMatchLoading
        )}
        className="w-full py-2 my-2 text-sm transition-all bg-gray-300 rounded-lg hover:bg-gray-400 hover:text-white"
        onClick={matchHookData.handleRefresh}
      >
        Refresh
      </button>

      {Boolean(
        matchHookData.loading ||
          matchHookData.endMatchLoading ||
          matchHookData.startMatchLoading
      ) ? (
        <Label text={"loading ..."} />
      ) : (
        <>
          {(function (tabs, value) {
            switch (tabs[value]) {
              case tabs[0]:
                return (
                  <GridStyled windowWidth={windowWidth}>
                    {matchHookData.data
                      ?.filter(
                        (x) =>
                          x.season ===
                            matchHookData.seasons[matchHookData.seasonValue] &&
                          x.round.num ===
                            matchHookData.rounds[matchHookData.roundValue]
                      )
                      .map((datum, index) => {
                        if (datum.status === "live") {
                          return (
                            <MatchStatEntity
                              index={index}
                              testData={datum}
                              open={matchHookData.open}
                              handleOpen={matchHookData.handleOpen}
                              handleClose={matchHookData.handleClose}
                              matchHookData={matchHookData}
                            />
                          );
                        }
                      })}
                  </GridStyled>
                );

              case tabs[1]:
                return (
                  <GridStyled windowWidth={windowWidth}>
                    {matchHookData.data
                      ?.filter(
                        (x) =>
                          x.season ===
                            matchHookData.seasons[matchHookData.seasonValue] &&
                          x.round.num ===
                            matchHookData.rounds[matchHookData.roundValue]
                      )
                      .map((datum, index) => {
                        if (datum.status === "fin") {
                          return (
                            <MatchStatEntity
                              index={index}
                              testData={datum}
                              handleOpen={matchHookData.handleOpen}
                              matchHookData={matchHookData}
                            />
                          );
                        }
                      })}
                  </GridStyled>
                );

              case tabs[2]:
                return (
                  <GridStyled windowWidth={windowWidth}>
                    {matchHookData.data
                      ?.filter(
                        (x) =>
                          x.season ===
                            matchHookData.seasons[matchHookData.seasonValue] &&
                          x.round.num ===
                            matchHookData.rounds[matchHookData.roundValue]
                      )
                      .map((datum, index) => {
                        if (datum.status !== "fin" && datum.status !== "live") {
                          return (
                            <MatchStatEntity
                              index={index}
                              testData={datum}
                              handleOpen={matchHookData.handleOpen}
                              matchHookData={matchHookData}
                            />
                          );
                        }
                      })}
                  </GridStyled>
                );

              default:
                break;
            }
          })(matchHookData.tabs, matchHookData.value)}
          <div className="h-[100px]" />
        </>
      )}
    </>
  );
  // }
};

export default Matches;
