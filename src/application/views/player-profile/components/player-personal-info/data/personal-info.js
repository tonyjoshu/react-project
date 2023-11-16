import CountryList from "country-list-with-dial-code-and-flag";

const playerPersonalInfo = (playerProfileHook) => {
  const dateOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    weekday: "long",
  };
  return [
    {
      label: "Country",
      // value: CountryList.find(cty => cty.code === playerProfileHook.playerDetails?.country).name.split("," || " ")[0] ?? "",
      value: ((country) => {
        try {
          const _country = CountryList.find(cty => cty.code === country).name
          return _country
        } catch (error) {
          console.log("error", error)
          return "n/a"
        }
      })(playerProfileHook.playerDetails?.country),
    },
    {
      label: "Date of birth",
      value: `${ new Date(
        playerProfileHook.playerDetails?.dob
      ).toLocaleDateString("en-US", dateOptions) }`,
    },
    {
      label: "Age",
      value: `${ new Date().getFullYear() -
        new Date(playerProfileHook.playerDetails?.dob).getFullYear()
        }`,
    },
  ];
};

export default playerPersonalInfo;
