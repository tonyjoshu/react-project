import { useAtom, useAtomValue } from "jotai";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import matchStataValuesAtom from "../../state/match-stats-values-atom";

const { useState, useEffect } = require("react");

const useRightSide = (match_id, home_team, away_team) => {
  const adminConfig = useAtomValue(adminTokenConfig);
  const [matchStatsValues, setMatchStatsValues] = useAtom(matchStataValuesAtom);

  const [age, setAge] = useState("");
  const [goalScorer, setGoalScorer] = useState("");
  const [goalAssister, setGoalAssister] = useState("");

  const [homeGoalScorer, setHomeGoalScorer] = useState("");
  const [homeGoalAssister, setHomeGoalAssister] = useState("");
  const [awayGoalScorer, setAwayGoalScorer] = useState("");
  const [awayGoalAssister, setAwayGoalAssister] = useState("");

  const [homeGoalMinute, setHomeMinute] = useState(0);
  const [awayGoalMinute, setAwayMinute] = useState(0);

  const [homePlayerGoingOut, setHomePlayerGoingOut] = useState("");
  const [homePlayerComingIn, setHomePlayerComingIn] = useState("");
  const [awayPlayerGoingOut, setAwayPlayerGoingOut] = useState("");
  const [awayPlayerComingIn, setAwayPlayerComingIn] = useState("");

  const [homeSubstitutionMinute, setHomeSubstitutionMinute] = useState(0);
  const [awaySubstitutionMinute, setAwaySubstitutionMinute] = useState(0);

  const [homeRedCard, setHomeRedCard] = useState("");
  const [awayRedCard, setAwayRedCard] = useState("");

  const [homeRedCardMinute, setHomeRedCardMinute] = useState(0);
  const [awayRedCardMinute, setAwayRedCardMinute] = useState(0);

  const [homeYellowCard, setHomeYellowCard] = useState("");
  const [awayYellowCard, setAwayYellowCard] = useState("");

  const [homeYellowCardMinute, setHomeYellowCardMinute] = useState(0);
  const [awayYellowCardMinute, setAwayYellowCardMinute] = useState(0);

  const [homeTeamLineup, setHomeTeamLineup] = useState();
  const [awayTeamLineup, setAwayTeamLineup] = useState();

  const [halfTimeMinute, setHalfTimeMinute] = useState(45);

  useEffect(() => {
    apiCall({
      url: `${URLS.players}`,
      tokenRequired: true,
      config: adminConfig.config,
    }).then((res) => {
      let _homeTeamLineup = getTeamLineup(res.data, home_team.team_id);
      let _awayTeamLineup = getTeamLineup(res.data, away_team.team_id);
      setHomeTeamLineup(_homeTeamLineup);
      setAwayTeamLineup(_awayTeamLineup);
    });
  }, []);

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  return {
    age,
    handleChange,

    goalScorer,
    setGoalScorer,

    goalAssister,
    setGoalAssister,

    homeGoalScorer,
    setHomeGoalScorer,
    homeGoalAssister,
    setHomeGoalAssister,

    awayGoalScorer,
    setAwayGoalScorer,
    awayGoalAssister,
    setAwayGoalAssister,

    homeTeamLineup,
    awayTeamLineup,

    matchStatsValues,
    setMatchStatsValues,

    homePlayerGoingOut,
    setHomePlayerGoingOut,
    awayPlayerGoingOut,
    setAwayPlayerGoingOut,

    homePlayerComingIn,
    setHomePlayerComingIn,
    awayPlayerComingIn,
    setAwayPlayerComingIn,

    homeRedCard,
    setHomeRedCard,

    awayRedCard,
    setAwayRedCard,

    homeYellowCard,
    setHomeYellowCard,

    awayYellowCard,
    setAwayYellowCard,

    homeGoalMinute,
    setHomeMinute,
    awayGoalMinute,
    setAwayMinute,

    homeRedCardMinute,
    setHomeRedCardMinute,
    awayRedCardMinute,
    setAwayRedCardMinute,

    homeYellowCardMinute,
    setHomeYellowCardMinute,
    awayYellowCardMinute,
    setAwayYellowCardMinute,

    homeSubstitutionMinute,
    setHomeSubstitutionMinute,
    awaySubstitutionMinute,
    setAwaySubstitutionMinute,

    halfTimeMinute,
    setHalfTimeMinute,
  };
};

export default useRightSide;

function getTeamLineup(players, team_id) {
  let lineup = players.filter((player) => player.current_club._id === team_id);
  return lineup;
}
