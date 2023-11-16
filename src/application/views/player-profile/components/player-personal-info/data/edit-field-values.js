const playerEditPopUpFieldValues = (playerProfileHook) => [
  {
    label: "Name",
    value: playerProfileHook.playerName ?? "",
    placeholder: "player's name",
    disabled: true,
  },
  {
    label: "Country",
    value: playerProfileHook.playerName ?? "",
    placeholder: "country",
    disabled: true,
  },
  {
    label: "Club",
    value: playerProfileHook.playerDetails?.current_club?.name ?? "",
    placeholder: "Club",
    disabled: true,
  },
  {
    label: "Date of birth",
    value: playerProfileHook.playerDetails?.dob ?? "",
    placeholder: "Date of birth",
    disabled: true,
  },
];

export default playerEditPopUpFieldValues;
