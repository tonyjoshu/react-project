export default function teamFormTextInputValues(teamsHookValues) {
  return [
    {
      label: "Name",
      placeHolder: "team name",
      value: teamsHookValues.teamName,
      handleOnChange: teamsHookValues.handleTeamNameChange,
    },
    {
      label: "Nickname",
      placeHolder: "team nickname",
      value: teamsHookValues.teamNockName,
      handleOnChange: teamsHookValues.handleTeamNockNameChange,
    },
    {
      type: "number",
      label: "Year established",
      placeHolder: "from 1900 onward",
      value: teamsHookValues.yearEstablished,
      handleOnChange: teamsHookValues.handleyearEstablishedChange,
    },
    {
      type: "number",
      label: "Trophies won",
      placeHolder: "total trophies won by team",
      value: teamsHookValues.trophiesWon,
      handleOnChange: teamsHookValues.handleTrophiesWonChange,
    },
  ];
}
