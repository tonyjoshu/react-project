const shotsTabValues = (matchHookData, tabIndex, rightSideHook) => {
  return {
    value: tabIndex === 0 ? matchHookData.home_shots : matchHookData.away_shots,
    onChange: (e) => {
      tabIndex === 0
        ? matchHookData.set_home_shots(e.target.value)
        : matchHookData.set_away_shots(e.target.value);
    },
  };
};

export default shotsTabValues;
