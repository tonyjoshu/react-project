import axios from "axios";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";

function useAwayTeamDetailsHook({ _id }) {
  const { config } = useAtomValue(adminTokenConfig);

  const [teamId, setteamId] = useState("");
  const [matchId, setmatchId] = useState("");
  const [shots, setshots] = useState(0);
  const [chances, setchances] = useState(0);
  const [shots_on_target, setshots_on_target] = useState(0);
  const [passes, setpasses] = useState(0);
  const [fouls, setfouls] = useState(0);
  const [offsides, setoffsides] = useState(0);
  const [corner, setcorner] = useState(0);
  const [accurate_pass, setaccurate_pass] = useState(0);
  const [yellow_cards, setyellow_cards] = useState(0);
  const [red_cards, setred_cards] = useState(0);
  const [goals, setgoals] = useState(0);
  const [awayTeamReferenceId, setawayTeamReferenceId] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getMatchStats(_id).then((res) => {
      setawayTeamReferenceId(res.data[1]._id);
      setteamId(res.data[1].team);
      setshots(res.data[1].shots);
      setchances(res.data[1].chances);
      setshots_on_target(res.data[1].shots_on_target);
      setpasses(res.data[1].passes);
      setfouls(res.data[1].fouls);
      setoffsides(res.data[1].offsides);
      setcorner(res.data[1].corner);
      setaccurate_pass(res.data[1].accurate_pass);
      setposession(res.data[1].posession);
      setyellow_cards(res.data[1].yellow_cards);
      setred_cards(res.data[1].red_cards);
      setgoals(res.data[1].goals);
    });
  }, []);

  const handleSubmitAwayStats = async () => {
    setloading(true);
    let body = {
      shots,
      chances,
      shots_on_target,
      passes,
      fouls,
      offsides,
      corner,
      accurate_pass,
      yellow_cards,
      red_cards,
      goals,
    };
    updateTeamStats(awayTeamReferenceId, body, config)
      .then((res) => {})
      .finally(() => {
        setloading(false);
        window.location.reload();
      });
  };

  return {
    teamId,
    setteamId,
    matchId,
    setmatchId,
    shots,
    setshots,
    chances,
    setchances,
    shots_on_target,
    setshots_on_target,
    passes,
    setpasses,
    fouls,
    setfouls,
    offsides,
    setoffsides,
    corner,
    setcorner,
    accurate_pass,
    setaccurate_pass,
    yellow_cards,
    setyellow_cards,
    red_cards,
    setred_cards,
    goals,
    setgoals,
    loading,
    handleSubmitAwayStats,
  };
}

export default useAwayTeamDetailsHook;

const getMatchStats = (_id) => axios.get(`${URLS.stats}/${_id}`);
const updateTeamStats = (awayTeamReferenceId, body, config) => {
  return axios.put(`${URLS.editStats}/${awayTeamReferenceId}`, body, config);
};
