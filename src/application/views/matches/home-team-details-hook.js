import axios from "axios";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";

function useHomeTeamDetailsHook({ _id }) {
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
  const [posession, setposession] = useState(0);
  const [yellow_cards, setyellow_cards] = useState(0);
  const [red_cards, setred_cards] = useState(0);
  const [goals, setgoals] = useState(0);
  const [homeTeamReferenceId, sethomeTeamReferenceId] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getMatchStats(_id).then((res) => {
      sethomeTeamReferenceId(res.data[0]._id);
      setteamId(res.data[0].team ?? 0);
      setshots(res.data[0].shots ?? 0);
      setchances(res.data[0].chances ?? 0);
      setshots_on_target(res.data[0].shots_on_target ?? 0);
      setpasses(res.data[0].passes ?? 0);
      setfouls(res.data[0].fouls ?? 0);
      setoffsides(res.data[0].offsides ?? 0);
      setcorner(res.data[0].corner ?? 0);
      setaccurate_pass(res.data[0].accurate_pass ?? 0);
      setposession(res.data[0].posession ?? 0);
      setyellow_cards(res.data[0].yellow_cards ?? 0);
      setred_cards(res.data[0].red_cards ?? 0);
      setgoals(res.data[0].goals ?? 0);
    });
  }, []);

  const handleSubmitHomeStats = async () => {
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
      posession,
      yellow_cards,
      red_cards,
      goals,
    };
    updateTeamStats(homeTeamReferenceId, body, config)
      .then((res) => console.log({ res: res.data }))
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
    posession,
    setposession,
    yellow_cards,
    setyellow_cards,
    red_cards,
    setred_cards,
    goals,
    setgoals,
    loading,
    handleSubmitHomeStats,
  };
}

export default useHomeTeamDetailsHook;

const getMatchStats = (_id) => axios.get(`${URLS.stats}/${_id}`);
const updateTeamStats = (homeTeamReferenceId, body, config) => {
  return axios.put(`${URLS.editStats}/${homeTeamReferenceId}`, body, config);
};
