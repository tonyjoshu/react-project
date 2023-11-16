import TextField from "@mui/material/TextField";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { BsPlus, BsUpload } from "react-icons/bs";
import { ImYoutube2 } from "react-icons/im";
import ButtonStyled from "src/application/shared/components/ButtonStyled";
import Column from "src/application/shared/components/Column";
import InputFieldCustom from "src/application/shared/components/input-field-cutom";
import Label from "src/application/shared/components/Label";
import ModalPopUp from "src/application/shared/components/ModalPopUp";
import Row from "src/application/shared/components/Row";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import KickOffTime from "../KickOffTime";
import MatchDetails from "../MarchDetails";
import StatRow from "../StatRow";
import TeamLogo from "../team-logo";
import LeftSide from "./components/left-side/LeftSide";
import MatchFacts from "./components/match-facts/match-facts";
import RightSide from "./components/right-side/RightSide";
import statRows from "./data/stat-rows";
import matchFactsContainer from "./styles/match-facts-container";
import matchStatEntityContainer from "./styles/match-stat-entity-container";
import matchStatsContainer from "./styles/match-stats-container";
import useMatchStatEntity from "./use-match-stat-entity";

function MatchStatEntity({
  testData: matchData,
  open,
  handleOpen,
  handleClose,
  index,
  matchHookData,
}) {
  const matchStatEntityHook = useMatchStatEntity(matchData._id)
  const getMatchFactsHook = useGetMatchFacts(matchData, matchHookData)
  const { homeTeamState, awayTeamState, matchStats, matchDetails } = useGetMatchFacts(matchData, matchHookData)
  return (
    <Column
      gap={20}
      style={{ ...matchStatEntityContainer, border: "1px solid #85F4FF" }}
      className="relative">
      <div className="flex flex-col items-center w-full gap-1">
        { matchData?.status === "fin" && (
          <>
            { matchData?.highlights_url && (
              <ImYoutube2
                onClick={() => {
                  window.open(matchData?.highlights_url);
                }}
                className="text-5xl cursor-pointer"
              />
            )}
          </>
        )}
        <Label small bold text={matchData?.date} />
      </div>

      <Row a_center j_center gap={10}>
        <Row a_center j_end gap={10}>
          <Label small text={homeTeamState === null ? '' : homeTeamState.name } />
          { /*<Label small text={matchData?.home_team?.name} /> */}
          <TeamLogo url={ homeTeamState === null ? '' : homeTeamState.logo } />
        </Row>
        <Row
          a_center
          gap={10}
          style={{ width: "fit-content", alignItems: "center" }}
        >
          <Label bold text={
            matchStats.length <= 0 || homeTeamState === null  ? "": 
            matchStats[0].team === homeTeamState._id ? matchStats[0].goals:
            matchStats[1].goals
            } />
          <Label text={"-"} />
          <Label bold text=
            {
              matchStats.length <= 0 || homeTeamState === null  ? "": 
              matchStats[0].team === awayTeamState._id ? matchStats[0].goals:
              matchStats[1].goals
              }
             />
        </Row>
        <Row a_center gap={10} style={{}}>
          <TeamLogo url={ awayTeamState === null ? '' :awayTeamState.logo} />
          <Label small text={ awayTeamState === null ? '' : awayTeamState.name } />
        </Row>
      </Row>

      <Row j_between>
        <KickOffTime time={matchData?.playing_time} />
        { matchDetails === null ?  null :  <MatchDetails testData={matchDetails} />}
      </Row>

      <div className="flex flex-col rounded-lg overflow-clip items-center w-full gap-4 max-h-[400px] overflow-y-scroll">
        {matchData?.home_team?.stats ? (
          <Column
            a_center
            gap={20}
            style={matchStatsContainer}
            className="px-2 bg-white"
          >
            <Label xBold color={"grey"} text={"Statistics"} />
            {statRows(matchData).map((data, index) => (
              <StatRow
                key={index}
                label={data.label}
                home_stat={data.home_stat}
                away_stat={data.away_stat}
              />
            ))}
          </Column>
        ) : (
          ""
        )}

        {matchData?.status !== "nor" && (
          <div className="flex flex-col items-center w-full px-2">
            <MatchFacts facts={getMatchFactsHook.facts} />
          </div>
        )}
      </div>
    </Column>
  );
}

export default MatchStatEntity;

const useGetMatchFacts = (matchData, matchHookData) => {
  const { config: _config } = useAtomValue(adminTokenConfig)
  const [loading, setLoading] = useState(false)
  const [facts, setFacts] = useState()
  const [halfTimeAlready, setHalfTimeAlready] = useState(false)
  const [secondHalfTimeAlready, setSecondHalfTimeAlready] = useState(false)

  const [halfTimeMinute, setHalfTimeMinute] = useState(45)
  const [openMinutePopUp, setOpenMinutePopUp] = useState(false)
  const [ homeTeamState, setHomeTeamState] = useState(null)
  const [ awayTeamState, setAwayTeamState] = useState(null)
  const [ matchStats, setMatchStats] = useState([])
  const [ matchDetails, setMatchDetails] = useState(null)


  useEffect(() => {
    setLoading(true);
    getMatchFact()
    apiCall({ url: `${URLS.getMatchFacts}/${matchData._id}` })
      .then((res) => {
        let homeTeam;
        let awayTeam;

        let apiCalls = [
          apiCall({ url: `${URLS.teams}/${matchData.home_team}` }),
          apiCall({ url: `${URLS.teams}/${matchData.away_team}` }),
        ];
        Promise.allSettled(apiCalls)
          .then((results) => {
            homeTeam = results[0].value.data;
            awayTeam = results[1].value.data;
            setHomeTeamState(homeTeam)
            setAwayTeamState(awayTeam)
          })
          .finally(() => {
            let newData = [];
            let sortedData = res.data.sort((a, b) => a.time - b.time); // match event

            // is it half time already
            let halTimeFact = sortedData.find((datum) => {
              if (datum.event && datum.event === "ht") return datum;
            });
            setHalfTimeAlready((prev) => {
              prev = halTimeFact ? true : false;
              return prev;
            });

            // did the second half begin
            let secondHalfFact = sortedData.find((datum) => {
              if (datum.event && datum.event === "sh") return datum;
            });
            setSecondHalfTimeAlready((prev) => {
              prev = secondHalfFact ? true : false;
              return prev;
            });

            // is home or not
            sortedData.forEach((datum) => {
              datum = {
                ...datum,
                isHome: datum.team === homeTeam._id,
              };
              newData.push(datum)
            });
            setFacts(newData)
            setLoading(false)
          })
      })
      .catch((error) => setLoading(false))
  }, []);

  const getMatchFact = async() => {
    try {
    apiCall({ url: `${URLS.stats}/${matchData._id}` }).then((response) => {
        setMatchStats(response.data)
    })
    apiCall({ url: `${URLS.matches}/${matchData._id}` }).then((response) => {
      setMatchDetails(response.data)
  })

     } catch(error){
        console.log(error)
    }
  }


  const handleConfirmSetHalfTime = () => {
    setLoading(true);
    apiCall({
      url: URLS.addMatchFact,
      method: "post",
      tokenRequired: true,
      config: _config,
      body: {
        match: matchData._id,
        event: "ht",
        time: halfTimeMinute,
      },
    })
      .then((resp) => console.log("resp", resp.data))
      .finally(() => {
        setLoading(false);
        setOpenMinutePopUp(false);
        matchHookData.setUpdateIndex((prev) => prev + 1);
      });
  };

  const handleBeginSecondHalf = () => {
    setLoading(true);
    apiCall({
      url: URLS.addMatchFact,
      method: "post",
      tokenRequired: true,
      config: _config,
      body: {
        match: matchData._id,
        event: "sh",
      },
    })
      .then((resp) => {})
      .finally(() => {
        setLoading(false);
        matchHookData.setUpdateIndex((prev) => prev + 1);
      });
  };

  return {
    loading,
    facts,
    halfTimeAlready,
    secondHalfTimeAlready,
    halfTimeMinute,
    setHalfTimeMinute,
    openMinutePopUp,
    setOpenMinutePopUp,
    matchId: matchData._id,
    handleConfirmSetHalfTime,
    handleBeginSecondHalf,
    homeTeamState,
    awayTeamState,
    matchStats,
    matchDetails
  };
};
