const substitutionTabValues = (rightSideHook, tabIndex) => {
  if (tabIndex === 0) {
    return [
      {
        label: "Player going out",
        value: rightSideHook.homePlayerGoingOut,
        onChange: (event) => {
          rightSideHook.handleChange(
            event,
            rightSideHook.setHomePlayerGoingOut
          );
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, playerGoingOut: event.target.value },
            };
          });
        },
        options: rightSideHook.homeTeamLineup, // home team lineup
      },
      {
        label: "Player coming in",
        value: rightSideHook.homePlayerComingIn,
        onChange: (event) => {
          rightSideHook.handleChange(
            event,
            rightSideHook.setHomePlayerComingIn
          );
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, playerComingIn: event.target.value },
            };
          });
        },
        options: rightSideHook.homeTeamLineup, // home team lineup
      },
      {
        label: "Minute",
        value: rightSideHook.homeSubstitutionMinute,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setHomeSubstitutionMinute);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              home: { ...prev.home, substitutionMinute: event.target.value },
            };
          });
        },
      },
    ];
  }

  if (tabIndex === 1) {
    return [
      {
        label: "Player going out",
        value: rightSideHook.awayPlayerGoingOut,
        onChange: (event) => {
          rightSideHook.handleChange(
            event,
            rightSideHook.setAwayPlayerGoingOut
          );
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.away, playerGoingOut: event.target.value },
            };
          });
        },
        options: rightSideHook.awayTeamLineup, // away team lineup
      },
      {
        label: "Player coming in",
        value: rightSideHook.awayPlayerComingIn,
        onChange: (event) => {
          rightSideHook.handleChange(
            event,
            rightSideHook.setAwayPlayerComingIn
          );
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.away, playerComingIn: event.target.value },
            };
          });
        },
        options: rightSideHook.awayTeamLineup, // away team lineup
      },
      {
        label: "Minute",
        value: rightSideHook.awaySubstitutionMinute,
        onChange: (event) => {
          rightSideHook.handleChange(event, rightSideHook.setAwaySubstitutionMinute);
          rightSideHook.setMatchStatsValues((prev) => {
            return {
              ...prev,
              away: { ...prev.home, substitutionMinute: event.target.value },
            };
          });
        },
      },
    ];
  }
};

export default substitutionTabValues;
