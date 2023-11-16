const shotsOnTarget = (matchHookData, tabIndex) => {
  return {
    value:
      tabIndex === 0
        ? matchHookData.home_shots_on_target
        : matchHookData.away_shots_on_target,
    onChange: (e) => {
      tabIndex === 0
        ? matchHookData.set_home_shots_on_target(e.target.value)
        : matchHookData.set_away_shots_on_target(e.target.value);
    },
  };
};

export default shotsOnTarget;
