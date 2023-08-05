import { PersonMood } from "../constants/Person";
import { globalState } from "../global/GameScreen";
import { PlayerAchievement } from "./PlayerAchievement";

class PlayerAchievementMethods {
  static Param = {
    playerPersonAchievement: new PlayerAchievement(),
  };
  static Result = {
    msg: "",
    showAchievement: false,
    requireImage: null,
    methodName: "",
  };

  //#region Methods
  //#region Signature Methods
  static TheEyebrow = {
    Name: "TheEyebrow",
    DisplayedMsg: "Sus Levels Rising  🤨",
    requireImage: () => require("../assets/awkwardstickers/TheEyebrow.webp"),
    execute: signatureExecute,
  };
  static TrumpNo = {
    Name: "TrumpNo",
    DisplayedMsg: "No",
    requireImage: () => require("../assets/awkwardstickers/TrumpNo.webp"),
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
    requireImage: () => require("../assets/awkwardstickers/DiCaprioPointing.webp"),
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
    requireImage: () => require("../assets/awkwardstickers/CenaYouCantSeeMe.webp"),
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

export { PlayerAchievementMethods };
