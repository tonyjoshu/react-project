const { atom } = require("jotai");

export const defaultValues = {
  goalScorer: "",
  goalAssistedBy: "",
  goalMinute: 0,
  shots: "",
  shots_on_target: "",
  passes: "",
  playerGoingOut: "",
  playerComingIn: "",
  substitutionMinute: 0,
  redCard: "",
  redCardMinute: 0,
  yellowCard: "",
  yellowCardMinute: 0,
};

const matchStataValuesAtom = atom({
  home: { ...defaultValues },
  away: { ...defaultValues },
  halfTimeMinute: 45,
});

export default matchStataValuesAtom;
