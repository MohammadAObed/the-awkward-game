export const PersonMood = {
  HAPPY: { name: "Happy", value: 1 },
  NORMAL: { name: "Normal", value: 2 },
  ANGRY: { name: "Angry", value: 3 },
  SIGNATURE: { name: "Signature", value: 4 },
};

export const PersonMoodSoundCount = {
  //no loop, we need performance
  [PersonMood.HAPPY.name]: { timesPlayed: 0, hasJustPlayed: false },
  [PersonMood.NORMAL.name]: { timesPlayed: 0, hasJustPlayed: false },
  [PersonMood.ANGRY.name]: { timesPlayed: 0, hasJustPlayed: false },
  [PersonMood.SIGNATURE.name]: { timesPlayed: 0, hasJustPlayed: false },
};
