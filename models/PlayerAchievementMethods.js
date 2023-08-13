import { MaxTimesPlayed, MaxTimesSoundPlayed } from "../constants/GameScreen";
import { PersonMood } from "../constants/Person";
import { globalState } from "../global/GameScreen";
import { PlayerAchievement } from "./PlayerAchievement";

//this class and its method, is used for the gameScreen component, it uses and modifies the state (globalstate), never use in another screen, dont use hooks in it (useSelector, etc...)
class PlayerAchievementMethods {
  static Param = {
    playerPersonAchievement: new PlayerAchievement(),
    meterAddedValue: 0,
    newMood: null, //{ name: "Normal", value: 2, imageIndex: 0, audioIndex: 0 },
  };
  static Result = {
    msg: "",
    showAchievement: false,
    requireImage: null,
    methodName: "",
    extraValue: null,
  };

  //#region Methods
  //#region Signature Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "Sus Levels Rising  🤨",
    requireImage: () => require("../assets/awkwardstickers/Rock/TheEyebrow.webp"),
    execute: signatureExecute,
  };
  static TrumpNo = {
    Name: "TrumpNo",
    DisplayedMsg: "No",
    requireImage: () => require("../assets/awkwardstickers/Trump/TrumpNo.webp"),
    execute: signatureExecute,
  };
  static CatSad = {
    Name: "CatSad",
    DisplayedMsg: "No problem  👍",
    requireImage: () => require("../assets/images/persons/CatAngry.png"),
    execute: signatureExecute,
  };
  static RonaldoSiu = {
    Name: "RonaldoSiu",
    DisplayedMsg: "Siuuuuu",
    requireImage: () => require("../assets/images/persons/RonaldoSign.png"),
    execute: signatureExecute,
  };
  static DiCaprioPointing = {
    Name: "DiCaprioPointing",
    DisplayedMsg: "Look!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioPointing.webp"),
    execute: signatureExecute,
  };
  static ElonThumbsUp = {
    Name: "ElonThumbsUp",
    DisplayedMsg: "Nicely ok  👍👍",
    requireImage: () => require("../assets/images/persons/ElonMuskSign.png"),
    execute: signatureExecute,
  };
  static CenaYouCantSeeMe = {
    Name: "CenaYouCantSeeMe",
    DisplayedMsg: "You cant see me!",
    requireImage: () => require("../assets/awkwardstickers/Cena/CenaYouCantSeeMe.webp"),
    execute: signatureExecute,
  };
  static KhabyHowItsDone = {
    Name: "KhabyHowItsDone",
    DisplayedMsg: "🤲",
    requireImage: () => require("../assets/images/persons/KhabyAngry.png"),
    execute: signatureExecute,
  };
  static MarkOk = {
    Name: "MarkOk",
    DisplayedMsg: "🙂",
    requireImage: () => require("../assets/images/persons/MarkHappy.png"),
    execute: signatureExecute,
  };
  static SpeedGibberish = {
    Name: "SpeedGibberish",
    DisplayedMsg: "fgdmjhsrgezwer",
    requireImage: () => require("../assets/images/persons/SpeedNormal.png"),
    execute: signatureExecute,
  };
  static SpongeLonely = {
    Name: "SpongeLonely",
    DisplayedMsg: "I'm not quite sure...",
    requireImage: () => require("../assets/images/persons/SpongeBobSign.png"),
    execute: signatureExecute,
  };
  //#endregion
  //#region 100 & 0 Methods
  static Rock100 = {
    Name: "Rock100",
    DisplayedMsg: "100% \n True Legend!",
    requireImage: () => require("../assets/awkwardstickers/Rock/Rock100.webp"),
    execute: hundredPercentExecute,
  };

  static Rock0 = {
    Name: "Rock0",
    DisplayedMsg: "0% \n Kev! Help me with this dude!",
    requireImage: () => require("../assets/awkwardstickers/Rock/Rock0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Trump100 = {
    Name: "Trump100",
    DisplayedMsg: "100% \n Massive Win, Money in your bag!",
    requireImage: () => require("../assets/awkwardstickers/Trump/Trump100.webp"),
    execute: hundredPercentExecute,
  };

  static Trump0 = {
    Name: "Trump0",
    DisplayedMsg: "0% \n You're Fired!!!",
    requireImage: () => require("../assets/awkwardstickers/Trump/Trump0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Cat100 = {
    Name: "Cat100",
    DisplayedMsg: "100% \n MeMeMeMeow!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat100.webp"),
    execute: hundredPercentExecute,
  };

  static Cat0 = {
    Name: "Cat0",
    DisplayedMsg: "0% \n Purrrrr!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat0.png"),
    execute: ZeroPercentExecute,
  };

  static Ronaldo100 = {
    Name: "Ronaldo100",
    DisplayedMsg: "100% \n Aim for better! always!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/Ronaldo100.webp"),
    execute: hundredPercentExecute,
  };

  static Ronaldo0 = {
    Name: "Ronaldo0",
    DisplayedMsg: "0% \n Done playing! Done!",
    requireImage: () => require("../assets/awkwardstickers/Ronaldo/Ronaldo0.webp"),
    execute: ZeroPercentExecute,
  };

  static DiCaprio100 = {
    Name: "DiCaprio100",
    DisplayedMsg: "100% \n Brilliant!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprio100.webp"),
    execute: hundredPercentExecute,
  };

  static DiCaprio0 = {
    Name: "DiCaprio0",
    DisplayedMsg: "0% \n Don't worry, I know you're acting!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprio0.webp"),
    execute: ZeroPercentExecute,
  };

  static Elon100 = {
    Name: "Elon100",
    DisplayedMsg: "100% \n Come work for me!",
    requireImage: () => require("../assets/awkwardstickers/Elon/Elon100.webp"),
    execute: hundredPercentExecute,
  };

  static Elon0 = {
    Name: "Elon0",
    DisplayedMsg: "0% \n You challenged me, I ain't mad",
    requireImage: () => require("../assets/awkwardstickers/Elon/Elon0.webp"),
    execute: ZeroPercentExecute,
  };

  static Cena100 = {
    Name: "Cena100",
    DisplayedMsg: "100% \n Whatca tryna do?",
    requireImage: () => require("../assets/awkwardstickers/Cena/Cena100.jpg"),
    execute: hundredPercentExecute,
  };

  static Cena0 = {
    Name: "Cena0",
    DisplayedMsg: "0% \n Cena Approves!",
    requireImage: () => require("../assets/awkwardstickers/Cena/Cena0.webp"),
    execute: ZeroPercentExecute,
  };

  static Khaby100 = {
    Name: "Khaby100",
    DisplayedMsg: "100% \n We finally there!",
    requireImage: () => require("../assets/awkwardstickers/Khaby/Khaby100.webp"),
    execute: hundredPercentExecute,
  };

  static Khaby0 = {
    Name: "Khaby0",
    DisplayedMsg: "0% \n C'moooooooon!",
    requireImage: () => require("../assets/awkwardstickers/Khaby/Khaby0.jpg"),
    execute: ZeroPercentExecute,
  };

  static Mark100 = {
    Name: "Mark100",
    DisplayedMsg: "100% \n 🙂",
    requireImage: () => require("../assets/awkwardstickers/Mark/Mark100.webp"),
    execute: hundredPercentExecute,
  };

  static Mark0 = {
    Name: "Mark0",
    DisplayedMsg: "0% \n Don't do it again!",
    requireImage: () => require("../assets/awkwardstickers/Mark/Mark0.gif"),
    execute: ZeroPercentExecute,
  };

  static Speed100 = {
    Name: "Speed100",
    DisplayedMsg: "100% \n Maaaaaaaasive Dub",
    requireImage: () => require("../assets/awkwardstickers/Speed/Speed100.webp"),
    execute: hundredPercentExecute,
  };

  static Speed0 = {
    Name: "Speed0",
    DisplayedMsg: "0% \n I'm over, We are over!",
    requireImage: () => require("../assets/awkwardstickers/Speed/Speed0.jpg"),
    execute: ZeroPercentExecute,
  };

  static SpongeBob100 = {
    Name: "SpongeBob100",
    DisplayedMsg: "100% \n Mmmmooooaah",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/Sponge100.webp"),
    execute: hundredPercentExecute,
  };

  static SpongeBob0 = {
    Name: "SpongeBob0",
    DisplayedMsg: "0% \n Hurrrrrrrrrr!",
    requireImage: () => require("../assets/awkwardstickers/SpongeBob/Sponge0.jpg"),
    execute: ZeroPercentExecute,
  };

  //#endregion
  static RockStop = {
    Name: "RockStop",
    DisplayedMsg: "Stop! enough shaking!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockStop.webp"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let increaseTimesPlayedNum = globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id ? 2 : 1;
      if (globalState.timesPlayed + increaseTimesPlayedNum >= MaxTimesPlayed) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static RockSeeYouSoon = {
    Name: "RockSeeYouSoon",
    DisplayedMsg: "I hope your audio was up!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockSeeYouSoon.webp"),
    execute: (param) => MoodAudioExecute(this.RockSeeYouSoon, param, PersonMood.NORMAL.value, 0),
  };

  static RockWink = {
    Name: "RockWink",
    DisplayedMsg: "See ya!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockWink.webp"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let meterValue = globalState.meter.meterValue;
      if (globalState.selectedPersonHandshake.id == 28 && param.meterAddedValue + meterValue >= globalState.person.moodBreakpoints.NORMAL) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static RockSurprised = {
    Name: "RockSurprised",
    DisplayedMsg: "12 reps minimum of flexing!",
    requireImage: () => require("../assets/awkwardstickers/Rock/RockSurprised.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let bicepFlexStreak = param.playerPersonAchievement.extraValue;
      if (globalState.selectedPlayerHandshake.id === 26) {
        bicepFlexStreak += 1;
        if (bicepFlexStreak >= 12) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: bicepFlexStreak,
          };
        }
      } else {
        bicepFlexStreak = 0;
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: bicepFlexStreak };
    },
  };

  static CatSunglasses = {
    Name: "CatSunglasses",
    DisplayedMsg: "Cool dude!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatSunglasses.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 27) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatSurprised = {
    Name: "CatSurprised",
    DisplayedMsg: "Whaaaat! you puched me!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatSurprised.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatProcessing = {
    Name: "CatProcessing",
    DisplayedMsg: "Whaaaat! you did it again!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatProcessing.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static CatTasleekSmile = {
    Name: "CatTasleekSmile",
    DisplayedMsg: "It's enough!",
    requireImage: () => require("../assets/awkwardstickers/Cat/CatTasleekSmile.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 25 && globalState.selectedPlayerHandshake.id == 3) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static Cat7BadInARow = {
    Name: "Cat7BadInARow",
    DisplayedMsg: "Whaaaat!",
    requireImage: () => require("../assets/awkwardstickers/Cat/Cat7BadInARow.png"),
    execute: function (param = PlayerAchievementMethods.Param) {
      let noMatchStreak = param.playerPersonAchievement.extraValue;
      if (globalState.selectedPersonHandshake.id !== globalState.selectedPlayerHandshake.id) {
        noMatchStreak += 1;
        if (noMatchStreak >= 7) {
          return {
            msg: this.DisplayedMsg,
            showAchievement: true,
            requireImage: this.requireImage,
            methodName: this.Name,
            extraValue: noMatchStreak,
          };
        }
      } else {
        noMatchStreak = 0;
      }
      return { ...PlayerAchievementMethods.Result, methodName: this.Name, extraValue: noMatchStreak };
    },
  };

  static DiCaprioDjangoLaugh = {
    Name: "DiCaprioDjangoLaugh",
    DisplayedMsg: "Hilarious!",
    requireImage: () => require("../assets/images/persons/DiCaprioHappy.png"),
    execute: (param) => MoodExecute(this.DiCaprioDjangoLaugh, param, PersonMood.HAPPY.value, 0),
  };

  static DiCaprioFiftyFifty = {
    Name: "DiCaprioFiftyFifty",
    DisplayedMsg: "👋 👋 \n Fifty fifty!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioFifty.webp"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === 6 && globalState.selectedPlayerHandshake.id === 6) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static DiCaprioYouSlick = {
    Name: "DiCaprioYouSlick",
    DisplayedMsg: "Oh You!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioYouSlick.webp"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id && globalState.selectedPlayerHandshake.id === 7) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };

  static DiCaprioShady = {
    Name: "DiCaprioShady",
    DisplayedMsg: "You didnt shake hands, you are acting shady!",
    requireImage: () => require("../assets/awkwardstickers/DiCaprio/DiCaprioShady.jpg"),
    execute: function (param = PlayerAchievementMethods.Param) {
      if (globalState.hasPressedShake === false) {
        return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
      }
      return PlayerAchievementMethods.Result;
    },
  };
  //#endregion
}

function signatureExecute(param = PlayerAchievementMethods.Param) {
  if (globalState.selectedPersonHandshake.id === globalState.person.signatureHandshake.id) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function hundredPercentExecute(param = PlayerAchievementMethods.Param) {
  let meterValue = globalState.meter.meterValue;
  if (param.meterAddedValue + meterValue >= globalState.person.moodBreakpoints.HAPPY) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function ZeroPercentExecute(param = PlayerAchievementMethods.Param) {
  let meterValue = globalState.meter.meterValue;
  if (
    param.meterAddedValue + meterValue <= globalState.person.moodBreakpoints.DEFAULT + 1 &&
    globalState.meter.meterValue !== globalState.person.moodBreakpoints.DEFAULT
  ) {
    return { msg: this.DisplayedMsg, showAchievement: true, requireImage: this.requireImage, methodName: this.Name };
  }
  return PlayerAchievementMethods.Result;
}
function MoodAudioExecute(achievement, param = PlayerAchievementMethods.Param, value = -1, audioIndex = -1) {
  if (!param.newMood) return PlayerAchievementMethods.Result;
  const soundTimesPlayed = globalState.personMoodSoundCount[param.newMood.name].timesPlayed;
  const hasJustPlayed = globalState.personMoodSoundCount[param.newMood.name].hasJustPlayed;
  //if ((soundTimesPlayed < MaxTimesSoundPlayed && !hasJustPlayed) || globalState.timesPlayed >= MaxTimesPlayed) {
  if (!((soundTimesPlayed >= MaxTimesSoundPlayed || hasJustPlayed) && globalState.timesPlayed < MaxTimesPlayed)) {
    if (param.newMood.value === value && param.newMood.audioIndex === audioIndex) {
      return { msg: achievement.DisplayedMsg, showAchievement: true, requireImage: achievement.requireImage, methodName: achievement.Name };
    }
  }
  return PlayerAchievementMethods.Result;
}
function MoodExecute(achievement, param = PlayerAchievementMethods.Param, value = -1, imageIndex = -1) {
  if (!param.newMood) return PlayerAchievementMethods.Result;
  if (param.newMood.value === value && (imageIndex === param.newMood.imageIndex || imageIndex === -1)) {
    return { msg: achievement.DisplayedMsg, showAchievement: true, requireImage: achievement.requireImage, methodName: achievement.Name };
  }
  return PlayerAchievementMethods.Result;
}

export { PlayerAchievementMethods };
