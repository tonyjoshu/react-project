const redCardTabValues = (rightSideHook, tabIndex) => {
  return {
    label: "player awarded a red card",
    value: tabIndex === 0 ? rightSideHook.homeRedCard : rightSideHook.awayRedCard,
    onChange: (event) => {
      rightSideHook.handleChange(event,  tabIndex === 0 ? rightSideHook.setHomeRedCard : rightSideHook.setAwayRedCard);
      rightSideHook.setMatchStatsValues((prev) => {
        return {
          ...prev,
          home: tabIndex === 0 ? { ...prev.home, redCard: event.target.value } : {...prev.home},
          away: tabIndex === 1 ? { ...prev.away, redCard: event.target.value } : {...prev.away},
        };
      });
    },
    options: tabIndex === 0 ? rightSideHook.homeTeamLineup : rightSideHook.awayTeamLineup,
    minuteValues: {
      label: "Minute",
      value: tabIndex === 0 ? rightSideHook.homeRedCardMinute : rightSideHook.awayRedCardMinute,
      onChange: (event) => {
        rightSideHook.handleChange(event, tabIndex === 0 ? rightSideHook.setHomeRedCardMinute : rightSideHook.setAwayRedCardMinute);
        rightSideHook.setMatchStatsValues((prev) => {
          return {
            ...prev,
            home: tabIndex === 0 ? {...prev.home, redCardMinute: event.target.value} : {...prev.home},
            away: tabIndex === 1 ? {...prev.away, redCardMinute: event.target.value} : {...prev.away},
          };
        });
      },
    }
  }
};

export default redCardTabValues;
