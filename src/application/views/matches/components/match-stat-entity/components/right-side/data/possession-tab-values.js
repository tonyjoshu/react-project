const passes = (matchHookData, tabIndex) => {
  return {
    value:
      tabIndex === 0 ? matchHookData.home_passes : matchHookData.away_passes,
    onChange: (e) => {
      tabIndex === 0
        ? matchHookData.set_home_passes(e.target.value)
        : matchHookData.set_away_passes(e.target.value);
    },
  };
};

export default passes;
