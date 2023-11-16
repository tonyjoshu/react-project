import { useAtomValue } from "jotai";
import { useState } from "react";
import { adminTokenConfig } from "src/config/jotai/atoms";
import URLS from "src/config/urls/urls";
import apiCall from "src/helper_functions/api_call";
import matchStataValuesAtom from "../../state/match-stats-values-atom";

const useLeftSide = (
  match_id,
  home_team,
  away_team,
  matchHookData,
  handleClose
) => {
  const adminConfig = useAtomValue(adminTokenConfig);
  const matchStatsValues = useAtomValue(matchStataValuesAtom);

  const [loading, setLoading] = useState(false);

  const handleSetHalfTime = () => {
    setLoading(true);

    let _body = {
      match: match_id,
      event: "ht",
      time: matchStatsValues.halfTimeMinute,
    };

    apiCall({
      url: URLS.addMatchFact,
      method: "post",
      tokenRequired: true,
      config: adminConfig["config"],
      body: _body,
    })
      .then((resp) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmStatsEdit = async () => {
    setLoading(true);

    const homeGoalUpdate = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      tokenRequired: true,
      config: adminConfig["config"],
      body: matchStatsValues["home"].goalAssistedBy
        ? {
            match: match_id,
            team: home_team.team_id,
            player: matchStatsValues["home"].goalScorer,
            assisted_by: matchStatsValues["home"].goalAssistedBy,
            goalScorer: matchStatsValues["home"].goalScorer,
            event: "goal",
            time: matchStatsValues["home"].goalMinute,
          }
        : {
            match: match_id,
            team: home_team.team_id,
            player: matchStatsValues["home"].goalScorer,
            goalScorer: matchStatsValues["home"].goalScorer,
            event: "goal",
            time: matchStatsValues["home"].goalMinute,
          },
    });

    const awayGoalUpdate = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      tokenRequired: true,
      config: adminConfig["config"],
      body: matchStatsValues["away"].goalAssistedBy
        ? {
            match: match_id,
            team: away_team.team_id,
            player: matchStatsValues["away"].goalScorer,
            assisted_by: matchStatsValues["away"].goalAssistedBy,
            event: "goal",
            time: matchStatsValues["away"].goalMinute,
          }
        : {
            match: match_id,
            team: away_team.team_id,
            player: matchStatsValues["away"].goalScorer,
            event: "goal",
            time: matchStatsValues["away"].goalMinute,
          },
    });

    const homeSubstitution = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: home_team.team_id,
        in: matchStatsValues["home"].playerComingIn,
        out: matchStatsValues["home"].playerGoingOut,
        event: "sub",
        time: matchStatsValues["home"].substitutionMinute,
      },
    });

    const awaySubstitution = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: away_team.team_id,
        in: matchStatsValues["away"].playerComingIn,
        out: matchStatsValues["away"].playerGoingOut,
        event: "sub",
        time: matchStatsValues["away"].substitutionMinute,
      },
    });

    const homeRedCard = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: home_team.team_id,
        player: matchStatsValues["home"].redCard,
        card_type: "red",
        time: matchStatsValues["home"].redCardMinute,
      },
    });

    const awayRedCard = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: away_team.team_id,
        player: matchStatsValues["away"].redCard,
        card_type: "red",
        time: matchStatsValues["away"].redCardMinute,
      },
    });
    const homeYellowCard = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: home_team.team_id,
        player: matchStatsValues["home"].yellowCard,
        card_type: "yellow",
        time: matchStatsValues["home"].yellowCardMinute,
      },
    });

    const awayYellowCard = apiCall({
      url: URLS.addMatchFact,
      method: "post",
      config: adminConfig["config"],
      tokenRequired: true,
      body: {
        match: match_id,
        team: away_team.team_id,
        player: matchStatsValues["away"].yellowCard,
        card_type: "yellow",
        time: matchStatsValues["away"].yellowCardMinute,
      },
    });

    const api_requests = [
      homeGoalUpdate,
      awayGoalUpdate,
      homeSubstitution,
      awaySubstitution,
      homeRedCard,
      awayRedCard,
      homeYellowCard,
      awayYellowCard,
    ];

    Promise.allSettled(api_requests).then((result) => {
      let homeGoals =
        result[0].status === "fulfilled"
          ? parseInt(home_team.goals) + 1
          : home_team.goals;
      let awayGoals =
        result[1].status === "fulfilled"
          ? parseInt(away_team.goals) + 1
          : away_team.goals;

      apiCall({
        url: `${URLS.stats}/${match_id}`,
        config: adminConfig["config"],
        tokenRequired: true,
      }).then((res) => {
        let homeTeamStatId = res.data[0]._id;
        let awayTeamStatId = res.data[1]._id;

        let _body = {
          home: {
            shots: matchHookData.home_shots,
            shots_on_target: matchHookData.home_shots_on_target,
            passes: matchHookData.home_passes,
          },
          away: {
            shots: matchHookData.away_shots,
            shots_on_target: matchHookData.away_shots_on_target,
            passes: matchHookData.away_passes,
          },
        };

        const homeOtherStatUpdate = apiCall({
          url: `${URLS.editStats}/${homeTeamStatId}`,
          config: adminConfig["config"],
          tokenRequired: true,
          method: "put",
          body: { ..._body.home, goals: homeGoals },
        });
        const awayOtherStatUpdate = apiCall({
          url: `${URLS.editStats}/${awayTeamStatId}`,
          config: adminConfig["config"],
          tokenRequired: true,
          method: "put",
          body: { ..._body.away, goals: awayGoals },
        });

        let _stats_promises = [homeOtherStatUpdate, awayOtherStatUpdate];

        Promise.allSettled(_stats_promises)
          .then((results) => {})
          .finally(() => {
            setLoading(false);
            handleClose();
            matchHookData.setUpdateIndex((prev) => prev + 1);
          });
      });
    });
  };

  return { handleConfirmStatsEdit, loading, handleSetHalfTime };
};

export default useLeftSide;
