const goalScorerTabValues = (rightSideHook, tabIndex) => {
  if (tabIndex === 0) {
    return [
      {
        label: "Pick goal scorer",
        value: rightSideHook.homeGoalScorer,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setHomeGoalScorer);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, goalScorer: event.target.value },
            };
          });
        },
        options: rightSideHook.homeTeamLineup, // home team lineup
      },
      {
        label: "Goal assisted by",
        value: rightSideHook.homeGoalAssister,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setHomeGoalAssister);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, goalAssistedBy: event.target.value },
            };
          });
        },
        options: rightSideHook.homeTeamLineup, // home team lineup
      },
      {
        label: "Minute",
        value: rightSideHook.homeGoalMinute,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setHomeMinute);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, goalMinute: event.target.value },
            };
          });
        },
      },
    ];
  }

  if (tabIndex === 1) {
    return [
      {
        label: "Pick goal scorer",
        value: rightSideHook.awayGoalScorer,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setAwayGoalScorer);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.away, goalScorer: event.target.value },
            };
          });
        },
        options: rightSideHook.awayTeamLineup, // away team lineup
      },
      {
        label: "Goal assisted by",
        value: rightSideHook.awayGoalAssister,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setAwayGoalAssister);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.away, goalAssistedBy: event.target.value },
            };
          });
        },
        options: rightSideHook.awayTeamLineup, // away team lineup
      },
      {
        label: "Minute",
        value: rightSideHook.awayGoalMinute,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setAwayMinute);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.away, goalMinute: event.target.value },
            };
          });
        },
      },
    ];
  }
};

export default goalScorerTabValues;
