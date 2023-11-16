const LINEUP_ENUM = {
  GOAL_KEEPER: "goal keeper",
  DEFENDER: "defender",
  MIDFIELDER: "mid-fielder",
  ATTACKER: "attacker",
};

const dummyFirstTeam = [
  { name: "Ally Salim", position: LINEUP_ENUM.GOAL_KEEPER },

  { name: "Patrick Mwenda", position: LINEUP_ENUM.DEFENDER },
  { name: "Shaman Kapombe", position: LINEUP_ENUM.DEFENDER },
  { name: "Mohamed Hussein", position: LINEUP_ENUM.DEFENDER },
  { name: "Kennedy Juma", position: LINEUP_ENUM.DEFENDER },

  { name: "Taddeo Lwanga", position: LINEUP_ENUM.MIDFIELDER },
  { name: "Pape Ousmane", position: LINEUP_ENUM.MIDFIELDER },
  { name: "Peter Banda", position: LINEUP_ENUM.MIDFIELDER },

  { name: "Meddie Kagere", position: LINEUP_ENUM.ATTACKER },
  { name: "Clatous Chama", position: LINEUP_ENUM.ATTACKER },
  { name: "John Bocco", position: LINEUP_ENUM.ATTACKER },
];

export default dummyFirstTeam;
