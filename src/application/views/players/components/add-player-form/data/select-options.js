const selectOptions = (playersHookData) => [
  {
    label: "Nationality",
    value: playersHookData.country,
    onChange: playersHookData.handleCountrySelectChange,
    options: playersHookData.countries,
  },
  {
    label: "Club",
    value: playersHookData.currentClub,
    onChange: playersHookData.handleSelectClubChange,
    options: playersHookData.clubs,
  },
];

export default selectOptions;
