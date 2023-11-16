const yellowCardTabValues = (rightSideHook, tabIndex) => {
  return {
    label: "player awarded a yellow card",
    value: tabIndex === 0 ? rightSideHook.homeYellowCard : rightSideHook.awayYellowCard,
    onChange: (event) => {
      rightSideHook.handleChange(event,  tabIndex === 0 ? rightSideHook.setHomeYellowCard : rightSideHook.setAwayYellowCard);
      rightSideHook.setMatchStatsValues((prev) => {
        return {
          ...prev,
          home: tabIndex === 0 ? { ...prev.home, yellowCard: event.target.value } : {...prev.home},
          away: tabIndex === 1 ? { ...prev.away, yellowCard: event.target.value } : {...prev.away},
        };
      });
    },
    options: tabIndex === 0 ? rightSideHook.homeTeamLineup : rightSideHook.awayTeamLineup,
    minuteValues: {
      label: "Minute",
      value: tabIndex === 0 ? rightSideHook.homeYellowCardMinute : rightSideHook.awayYellowCardMinute,
      onChange: (event) => {
        rightSideHook.handleChange(event, tabIndex === 0 ? rightSideHook.setHomeYellowCardMinute : rightSideHook.setAwayYellowCardMinute);
        rightSideHook.setMatchStatsValues((prev) => {
          return {
            ...prev,
            home: tabIndex === 0 ? {...prev.home, yellowCardMinute: event.target.value} : {...prev.home},
            away: tabIndex === 1 ? {...prev.away, yellowCardMinute: event.target.value} : {...prev.away},
          };
        });
      },
    }
  }
};

export default yellowCardTabValues;
