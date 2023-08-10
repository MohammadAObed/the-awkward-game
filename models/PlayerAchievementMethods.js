import { PersonMood } from "../constants/Person";
import { globalState } from "../global/GameScreen";
import { PlayerAchievement } from "./PlayerAchievement";

//this class and its method, is used for the gameScreen component, it uses and modifies the state (globalstate), never use in another screen, dont use hooks in it (useSelector, etc...)
class PlayerAchievementMethods {
  static Param = {
    playerPersonAchievement: new PlayerAchievement(),
    meterAddedValue: 0,
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
    execute: function (param = PlayerAchievementMethods.Param) {
      if (
        (globalState.personMood.value === PersonMood.NORMAL.value ||
          globalState.personMood.value === PersonMood.HAPPY.value ||
          globalState.personMood.value === PersonMood.SIGNATURE.value) &&
        globalState.selectedPersonHandshake.id === globalState.selectedPlayerHandshake.id &&
        globalState.selectedPersonHandshake.id !== globalState.person.signatureHandshake.id
      ) {
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

export { PlayerAchievementMethods };
