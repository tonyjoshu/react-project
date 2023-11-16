const statRows = (testData) => [
  {
    label: "goals",
    home_stat: testData?.home_team.stats?.goals ?? "",
    away_stat: testData?.away_team?.stats?.goals ?? "",
  },
  {
    label: "shots",
    home_stat: testData?.home_team.stats?.shots ?? "",
    away_stat: testData?.away_team?.stats?.shots ?? "",
  },
  {
    label: "shots on target",
    home_stat: testData?.home_team.stats?.shots_on_target ?? "",
    away_stat: testData?.away_team?.stats?.shots_on_target ?? "",
  },
  {
    label: "possession",
    home_stat: getPossession(testData, true),
    away_stat: getPossession(testData),
  },
  {
    label: "passes",
    home_stat: testData?.home_team.stats?.passes ?? "",
    away_stat: testData?.away_team?.stats?.passes ?? "",
  },
  // {
  //   label: "fouls",
  //   home_stat: testData?.home_team.stats?.fouls ?? "",
  //   away_stat: testData?.away_team?.stats?.fouls ?? "",
  // },
  // {
  //   label: "yellow cards",
  //   home_stat: testData?.home_team.stats?.yellow_cards ?? "",
  //   away_stat: testData?.away_team?.stats?.yellow_cards ?? "",
  // },
  // {
  //   label: "red cards",
  //   home_stat: testData?.home_team.stats?.red_cards ?? "",
  //   away_stat: testData?.away_team?.stats?.red_cards ?? "",
  // },
  // {
  //   label: "offsides",
  //   home_stat: testData?.home_team.stats?.offsides ?? "",
  //   away_stat: testData?.away_team?.stats?.offsides ?? "",
  // },
  // {
  //   label: "corner",
  //   home_stat: testData?.home_team.stats?.corner ?? "",
  //   away_stat: testData?.away_team?.stats?.corner ?? "",
  // },
];

export default statRows;

const getPossession = (testData, isHome) => {
  let homePasses = parseInt(testData?.home_team.stats?.passes);
  let awayPasses = parseInt(testData?.away_team.stats?.passes);
  let sum = homePasses + awayPasses;
  let possession = isHome ? homePasses / sum : awayPasses / sum;
  let possessionPercentage = `${Math.round(possession * 100)}%`;

  return possessionPercentage ?? "";
};
