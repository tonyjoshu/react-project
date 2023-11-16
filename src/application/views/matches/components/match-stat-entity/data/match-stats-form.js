export const COMPONENT_TYPE = {
  SELECT: "select",
  INPUT: "input",
  BUTTON: "button",
};
const INPUT_VALUE_TYPE = { NUMBER: "number", TEXT: "text" };

const editMatchStatsPopUpForm = (matchHookData) => [
  {
    type: COMPONENT_TYPE.SELECT,
    value: matchHookData.select_value,
    onChange: matchHookData.handleSelectChange,
    options: [
      matchHookData?.popUpHomeData?.team?.name,
      matchHookData?.popUpAawayData?.team?.name,
    ],
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "Goals",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_goals
        : matchHookData.away_goals,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_goals(e.target.value)
        : matchHookData.set_away_goals(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "Shots",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_shots
        : matchHookData.away_shots,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_shots(e.target.value)
        : matchHookData.set_away_shots(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "shots_on_target",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_shots_on_target
        : matchHookData.away_shots_on_target,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_shots_on_target(e.target.value)
        : matchHookData.set_away_shots_on_target(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "passes",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_passes
        : matchHookData.away_passes,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_passes(e.target.value)
        : matchHookData.set_away_passes(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "fouls",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_fouls
        : matchHookData.away_fouls,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_fouls(e.target.value)
        : matchHookData.set_away_fouls(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "offsides",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_offsides
        : matchHookData.away_offsides,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_offsides(e.target.value)
        : matchHookData.set_away_offsides(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "corner",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_corner
        : matchHookData.away_corner,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_corner(e.target.value)
        : matchHookData.set_away_corner(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "accurate_pass",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_accurate_pass
        : matchHookData.away_accurate_pass,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_accurate_pass(e.target.value)
        : matchHookData.set_away_accurate_pass(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "yellow_cards",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_yellow_cards
        : matchHookData.away_yellow_cards,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_yellow_cards(e.target.value)
        : matchHookData.set_away_yellow_cards(e.target.value),
  },
  {
    type: COMPONENT_TYPE.INPUT,
    valueType: INPUT_VALUE_TYPE.NUMBER,
    label: "red_cards",
    value:
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.home_red_cards
        : matchHookData.away_red_cards,
    onChange: (e) =>
      matchHookData.select_value === matchHookData.popUpHomeData.team?.name
        ? matchHookData.set_home_red_cards(e.target.value)
        : matchHookData.set_away_red_cards(e.target.value),
  },
  {
    type: COMPONENT_TYPE.BUTTON,
    onClick: matchHookData.handleConfirmEditStats,
    disabled: matchHookData.editStatsLoading,
    label: matchHookData.editStatsLoading
      ? "loading ..."
      : "confirm editing match statistics",
  },
];

export default editMatchStatsPopUpForm;
